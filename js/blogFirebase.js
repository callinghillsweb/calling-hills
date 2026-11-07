
import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { db, isFirebaseConfigured } from "./firebase.js";

const grid = document.querySelector(".blog-grid");

if (grid && isFirebaseConfigured) {
  loadPublicBlogs();
}

// Convert titles into URL-friendly slugs
function normaliseBlogSlug(value) {
  return String(value || "")
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Generate the individual article page URL
function articleUrl(blog) {
  const slug =
    blog.slug || normaliseBlogSlug(blog.title || blog.name);

  return `./blog-post.html?slug=${encodeURIComponent(slug)}`;
}

// Connect Read Story button
function setReadStoryLink(card, blog) {
  const link = card.querySelector(".blog-read-more");

  if (link) {
    link.href = articleUrl(blog);
    link.removeAttribute("target");
  }
}

// Parse publication dates
function parseBlogDate(value) {
  if (!value) return null;

  const text = String(value).trim();

  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(text)
      ? `${text}T12:00:00`
      : text,
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

// Format dates for display
function formatBlogDate(value) {
  const date = parseBlogDate(value);

  return date
    ? date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";
}

function setText(element, value) {
  if (element && value != null) {
    element.textContent = String(value);
  }
}

// Update existing HTML blog cards using Firebase overrides
function updateExistingCard(card, blog) {
  const title = blog.title || blog.name;

  setText(card.querySelector(".blog-title"), title);
  setText(card.querySelector(".blog-category"), blog.category);
  setText(card.querySelector(".blog-excerpt"), blog.excerpt);

  const dateText = formatBlogDate(blog.publicationDate);

  if (dateText) {
    setText(card.querySelector(".blog-date"), dateText);
  }

  const image = card.querySelector(".blog-img-wrapper img");

  if (image && blog.image) {
    image.setAttribute("src", blog.image);
    image.setAttribute("alt", title || "Blog story");
  }

  const date = parseBlogDate(blog.publicationDate);

  if (date) {
    card.dataset.blogDate = date.toISOString();
  }

  card.dataset.blogSlug =
    blog.slug || normaliseBlogSlug(title);

  setReadStoryLink(card, blog);
}

// Create cards for newly published Firebase blogs
function createBlogCard(blog) {
  const card = document.createElement("article");
  card.className = "blog-card";

  card.dataset.blogSlug =
    blog.slug || normaliseBlogSlug(blog.title || blog.name);

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "blog-img-wrapper";

  if (blog.category) {
    const category = document.createElement("div");
    category.className = "blog-category";
    category.textContent = blog.category;
    imageWrapper.append(category);
  }

  const image = document.createElement("img");
  image.src = blog.image || "./dest-darjeeling.png";
  image.alt = blog.title || blog.name || "Travel story";
  image.loading = "lazy";

  imageWrapper.append(image);

  const content = document.createElement("div");
  content.className = "blog-content";

  const date = document.createElement("div");
  date.className = "blog-date";
  date.textContent = formatBlogDate(blog.publicationDate);

  const title = document.createElement("h2");
  title.className = "blog-title";
  title.textContent = blog.title || blog.name || "Untitled story";

  const excerpt = document.createElement("p");
  excerpt.className = "blog-excerpt";
  excerpt.textContent = blog.excerpt || "";

  const link = document.createElement("a");
  link.className = "blog-read-more";
  link.href = articleUrl(blog);
  link.textContent = "READ STORY →";

  content.append(date, title, excerpt, link);
  card.append(imageWrapper, content);

  const parsedDate = parseBlogDate(blog.publicationDate);

  if (parsedDate) {
    card.dataset.blogDate = parsedDate.toISOString();
  }

  return card;
}

// Load published blogs from Firestore
async function loadPublicBlogs() {
  try {
    const publishedQuery = query(
      collection(db, "blog"),
      where("published", "==", true),
    );

    const snapshot = await getDocs(publishedQuery);

    const firebaseBlogs = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    // Existing HTML blog overrides
    const overrides = new Map(
      firebaseBlogs
        .filter((blog) => blog.source === "html")
        .map((blog) => [
          blog.slug || normaliseBlogSlug(blog.title || blog.name),
          blog,
        ]),
    );

    const handledSlugs = new Set();

    // Update existing static HTML cards
    Array.from(grid.querySelectorAll(".blog-card")).forEach((card) => {
      const originalTitle =
        card.querySelector(".blog-title")?.textContent.trim() || "";

      const slug = normaliseBlogSlug(originalTitle);
      const override = overrides.get(slug);

      if (!override) {
        const date = parseBlogDate(
          card.querySelector(".blog-date")?.textContent,
        );

        if (date) {
          card.dataset.blogDate = date.toISOString();
        }

        card.dataset.blogSlug = slug;
        setReadStoryLink(card, { slug });

        return;
      }

      handledSlugs.add(slug);

      if (override.isPublished === false) {
        card.remove();
        return;
      }

      updateExistingCard(card, override);
    });

    // Add newly created Firebase blog cards
    const newBlogs = firebaseBlogs
      .filter((blog) => blog.source !== "html")
      .filter((blog) => blog.isPublished !== false)
      .filter((blog) => {
        const slug =
          blog.slug || normaliseBlogSlug(blog.title || blog.name);

        return !handledSlugs.has(slug);
      })
      .sort((a, b) => {
        const dateA =
          parseBlogDate(a.publicationDate)?.getTime() || 0;

        const dateB =
          parseBlogDate(b.publicationDate)?.getTime() || 0;

        return dateB - dateA;
      });

    newBlogs.forEach((blog) => {
      grid.append(createBlogCard(blog));
    });

    // Sort all cards by publication date
    const cards = Array.from(
      grid.querySelectorAll(".blog-card"),
    );

    cards.sort((a, b) => {
      const dateA = Date.parse(a.dataset.blogDate || "") || 0;
      const dateB = Date.parse(b.dataset.blogDate || "") || 0;

      return dateB - dateA;
    });

    cards.forEach((card) => grid.append(card));

    console.info(
      "CallingHills blog content loaded from Firebase.",
    );

  } catch (error) {
    console.error(
      "Could not load CallingHills blog content from Firebase:",
      error,
    );
  }
}
