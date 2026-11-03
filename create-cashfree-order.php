<?php
/**
 * CallingHills — Cashfree Payment Gateway Order Handler
 * Environment: PRODUCTION
 * Handles order creation & payment session ID generation
 */

// Allow CORS & specify JSON response
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, x-api-version');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Cashfree Production Credentials
$appId      = '15014198a4b456d2365759038da9141051';
$secretKey  = getenv('CF_SECRET_KEY') ?: base64_decode('Y2Zza19tYV9wcm9kX2MyNDQ4M2MzMjU0M2NmYjA3ZTNkNzEwNDAxYjlmYzA3XzA5M2NiMThj');
$apiVersion = '2023-08-01';
$baseUrl    = 'https://api.cashfree.com/pg';

// --------------------------------------------------------------------------
// 1. ORDER STATUS CHECK (GET ?check_order=CH_xxxxxxxxx)
// --------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['check_order']) && !empty($_GET['check_order'])) {
    $orderId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $_GET['check_order']);

    $ch = curl_init("$baseUrl/orders/$orderId");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'x-api-version: ' . $apiVersion,
        'x-client-id: ' . $appId,
        'x-client-secret: ' . $secretKey
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($curlError) {
        http_response_code(500);
        echo json_encode(['error' => 'cURL error checking order: ' . $curlError]);
        exit;
    }

    http_response_code($httpCode ?: 200);
    echo $response;
    exit;
}

// --------------------------------------------------------------------------
// 2. CREATE ORDER (POST)
// --------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST to create orders or GET ?check_order=ID to verify.']);
    exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!$body) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing JSON payload in request body']);
    exit;
}

$amount = isset($body['amount']) ? floatval($body['amount']) : 0;
$name   = isset($body['name']) && trim($body['name']) !== '' ? trim($body['name']) : 'Guest';
$phone  = isset($body['phone']) ? preg_replace('/[^0-9]/', '', $body['phone']) : '';
$email  = isset($body['email']) ? trim($body['email']) : 'hello@callinghills.com';
$ref    = isset($body['bookingRef']) ? trim($body['bookingRef']) : 'Himalayan Tour Package';
$notes  = isset($body['notes']) ? trim($body['notes']) : '';

// Validation
if ($amount < 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Advance amount must be at least ₹1']);
    exit;
}

if (strlen($phone) < 10) {
    http_response_code(400);
    echo json_encode(['error' => 'Valid 10-digit mobile number required']);
    exit;
}
$cleanPhone = substr($phone, -10);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $email = 'guest@callinghills.com';
}

// Generate unique order ID: CH_<timestamp>_<random>
$orderId = 'CH_' . date('YmdHis') . '_' . rand(1000, 9999);
$customerId = 'CUST_' . $cleanPhone;

// Cashfree payload
$payload = [
    'order_id'       => $orderId,
    'order_amount'   => round($amount, 2),
    'order_currency' => 'INR',
    'customer_details' => [
        'customer_id'    => $customerId,
        'customer_name'  => substr($name, 0, 99),
        'customer_email' => $email,
        'customer_phone' => $cleanPhone
    ],
    'order_meta' => [
        'return_url' => 'https://callinghills.com/contact.html?order_id={order_id}',
        'notify_url' => 'https://callinghills.com/create-cashfree-order.php?webhook=1'
    ],
    'order_note' => substr("Ref: $ref | $notes", 0, 200)
];

$ch = curl_init("$baseUrl/orders");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-version: ' . $apiVersion,
    'x-client-id: ' . $appId,
    'x-client-secret: ' . $secretKey
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'Network error connecting to Cashfree: ' . $curlError]);
    exit;
}

$data = json_decode($response, true);

if ($httpCode >= 200 && $httpCode < 300 && !empty($data['payment_session_id'])) {
    http_response_code(200);
    echo json_encode([
        'success'            => true,
        'payment_session_id' => $data['payment_session_id'],
        'order_id'           => $data['order_id'],
        'cf_order_id'        => $data['cf_order_id'] ?? null,
        'order_amount'       => $data['order_amount'] ?? $amount
    ]);
} else {
    http_response_code($httpCode ?: 500);
    echo json_encode([
        'success' => false,
        'error'   => $data['message'] ?? 'Failed to initialize Cashfree payment session',
        'details' => $data
    ]);
}

