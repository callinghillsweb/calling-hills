const destinationsData = {
    "darjeeling": {
        "title": "Darjeeling & Sandakphu Region",
        "description": "Explore the Queen of the Hills and the legendary Sandakphu trekking routes.",
        "places": [
            {
                "name": "Darjeeling",
                "tagline": "Queen of the Hills | Tea Capital of India",
                "altitude": "2,042 m (6,700 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Darjeeling Tea, Toy Train, Kanchenjunga Views, Colonial Heritage",
                "description": "Darjeeling is globally renowned for its world-famous tea, breathtaking views of Mount Kanchenjunga, and the UNESCO World Heritage Darjeeling Himalayan Railway. It serves as the tourism capital of North Bengal.",
                "attractions": ["Tiger Hill", "Batasia Loop", "Chowrasta & Mall Road", "Happy Valley Tea Estate"]
            },
            {
                "name": "Kurseong",
                "tagline": "The Land of White Orchids",
                "altitude": "1,458 m (4,783 ft)",
                "bestTime": "March–May & September–December",
                "famousFor": "Tea Gardens, Toy Train, Colonial Heritage, Orchids",
                "description": "Kurseong offers a calm alternative to crowded hill stations, known for its pleasant climate, rolling tea gardens, mist-covered valleys, and peaceful mountain lifestyle.",
                "attractions": ["Eagle's Crag Viewpoint", "Dow Hill & Forest Area", "Deer Park", "Tea Estates"]
            },
            {
                "name": "Sittong",
                "tagline": "The Orange Village of Darjeeling",
                "altitude": "1,200–1,500 m (3,937–4,921 ft)",
                "bestTime": "October–February & March–May",
                "famousFor": "Orange Orchards, Waterfalls, Birdwatching, Eco Tourism",
                "description": "Sittong is famous for its vast orange orchards, scenic mountain landscapes, waterfalls, and peaceful village atmosphere, forming a key part of the Darjeeling Orange Belt.",
                "attractions": ["Sittong Orange Orchards", "Ahaldara Viewpoint", "Jogighat", "Riyang River Valley"]
            },
            {
                "name": "Dawaipani",
                "tagline": "Village of Medicinal Springs",
                "altitude": "2,000 m (6,562 ft)",
                "bestTime": "October–May",
                "famousFor": "Kanchenjunga Views, Sunrise, Forest Trails",
                "description": "Dawaipani offers breathtaking views of Mount Kanchenjunga, peaceful village surroundings, and authentic Himalayan hospitality, away from commercial tourism.",
                "attractions": ["Kanchenjunga Viewpoints", "Sunrise Points", "Pine Forest Trails"]
            },
            {
                "name": "Tinchuley",
                "tagline": "Eco Village of Three Hilltops",
                "altitude": "1,700 m (5,577 ft)",
                "bestTime": "October–May",
                "famousFor": "Kanchenjunga Sunrise, Orange Orchards, Organic Farming",
                "description": "Tinchuley is a beautiful eco-tourism village renowned for its spectacular sunrise views over the snow-clad Kangchenjunga range and community-based eco-tourism.",
                "attractions": ["Tinchuley Viewpoint", "Orange Orchards", "Tea Gardens", "Organic Farms"]
            },
            {
                "name": "Tukdah",
                "tagline": "Colonial Cantonment & Tea Valley",
                "altitude": "1,500 m (4,921 ft)",
                "bestTime": "October–May",
                "famousFor": "British Cantonment, Tea Gardens, Orchid Centre",
                "description": "Takdah combines the colonial charm of a historic British cantonment with the natural beauty of a traditional Darjeeling tea garden region.",
                "attractions": ["Takdah Orchid Centre", "Heritage British Bungalows", "Takdah Tea Garden"]
            },
            {
                "name": "Lamahatta",
                "tagline": "Sacred Forest Eco Village",
                "altitude": "1,700 m (5,577 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Eco Park, Sacred Forest, Kanchenjunga Views",
                "description": "Lamahatta is a picturesque eco-tourism village surrounded by pine forests, prayer flags, and panoramic views of Mount Kanchenjunga.",
                "attractions": ["Lamahatta Eco Park", "Sacred Grove Forest", "Pine Forest Trails"]
            },
            {
                "name": "Lepchajagat",
                "tagline": "World of the Lepchas",
                "altitude": "2,134 m (7,001 ft)",
                "bestTime": "October–May",
                "famousFor": "Kanchenjunga Views, Forest Tourism, Birdwatching",
                "description": "Lepchajagat is a peaceful forest village located within the Senchal Forest region, offering spectacular views of Mount Kanchenjunga and rich biodiversity.",
                "attractions": ["Kanchenjunga Viewpoints", "Lepchajagat Forest", "Jorepokhri Lake"]
            },
            {
                "name": "Mirik",
                "tagline": "The Valley of Orange Orchards | Lake Town",
                "altitude": "1,768 m (5,773 ft)",
                "bestTime": "March–May & September–December",
                "famousFor": "Mirik Lake, Tea Gardens, Orange Orchards",
                "description": "Mirik is a scenic hill town famous for its peaceful Sumendu Lake (Mirik Lake), tea gardens, pine forests, and Himalayan mountain views.",
                "attractions": ["Sumendu Lake", "Bokar Monastery", "Tingling Viewpoint", "Orange Orchards"]
            },
            {
                "name": "Rongaroong",
                "tagline": "Hidden Tea Garden Valley",
                "altitude": "1,500 m (4,921 ft)",
                "bestTime": "October–May",
                "famousFor": "Tea Gardens, Forests, Waterfalls, Village Tourism",
                "description": "Rangaroon is a scenic offbeat destination surrounded by lush tea gardens, dense forests, and traditional Himalayan villages, known for its historic tea estates.",
                "attractions": ["Rangaroon Tea Estate", "Tea Garden Viewpoints", "Waterfalls"]
            },
            {
                "name": "Manebhanjan",
                "tagline": "Gateway to Sandakphu | Historic Land Rover Route",
                "altitude": "1,928 m (6,325 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Sandakphu Trek, Land Rover Safari, Mountain Culture",
                "description": "Manebhanjan is the principal gateway to Sandakphu, serving as the starting point of the legendary trek and the historic vintage Land Rover route.",
                "attractions": ["Singalila National Park Entry Gate", "Historic Land Rover Stand", "Buddhist Prayer Wheels"]
            },
            {
                "name": "Tonglu",
                "tagline": "Panoramic Himalayan Viewpoint",
                "altitude": "3,070 m (10,072 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Sunrise, Himalayan Views, Trekking, Rhododendrons",
                "description": "Tonglu is one of the highest and most scenic settlements on the Singalila Ridge, renowned for spectacular sunrise views and Kangchenjunga panorama.",
                "attractions": ["Tonglu Viewpoint", "Kangchenjunga Sunrise View", "Rhododendron Forests"]
            },
            {
                "name": "Tumling",
                "tagline": "Border Village of the Himalayas",
                "altitude": "2,970 m (9,744 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Homestays, Sunrise Views, Mountain Landscapes",
                "description": "Tumling is a picturesque village on the India-Nepal border, offering panoramic mountain views and traditional homestays.",
                "attractions": ["Tumling Viewpoint", "India-Nepal Border Landscape", "Traditional Homestays"]
            },
            {
                "name": "Kalipokhri",
                "tagline": "Sacred Black Lake of the Singalila Himalayas",
                "altitude": "3,186 m (10,453 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Sacred Lake, Trekking, Prayer Flags",
                "description": "Kalipokhri is iconic for its sacred black lake, colourful prayer flags, and spiritual significance among local Himalayan communities.",
                "attractions": ["Kalipokhri Sacred Lake", "Prayer Flag Zone", "Alpine Landscapes"]
            },
            {
                "name": "Sandakphu",
                "tagline": "Highest Peak of West Bengal",
                "altitude": "3,636 m (11,930 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Trekking, Everest View, Kangchenjunga View",
                "description": "Sandakphu is the highest mountain peak in West Bengal, offering an extraordinary panorama of four of the world's five highest peaks, including Everest and Kangchenjunga.",
                "attractions": ["Sandakphu Summit", "Sleeping Buddha View", "Everest Viewpoint"]
            },
            {
                "name": "Meghma",
                "tagline": "Cloud Village of the Singalila Ridge",
                "altitude": "2,900 m (9,514 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Clouds, Monastery, Trekking",
                "description": "Meghma literally means 'Place of Clouds'. It is known for its misty landscapes, spiritual atmosphere, and beautiful monastery.",
                "attractions": ["Meghma Monastery", "Cloud-Covered Landscapes", "Prayer Flag Viewpoints"]
            },
            {
                "name": "Chitrey",
                "tagline": "Historic Monastery Village on the Sandakphu Route",
                "altitude": "2,530 m (8,301 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Monastery, Trekking, Prayer Flags",
                "description": "Chitrey is the first major settlement on the Sandakphu trekking route, famous for its historic monastery and colourful prayer flags.",
                "attractions": ["Chitrey Monastery", "Prayer Flag Ridge", "Himalayan Viewpoints"]
            },
            {
                "name": "Gairibas",
                "tagline": "Forest Heart of Singalila National Park",
                "altitude": "2,620 m (8,596 ft)",
                "bestTime": "March–May & October–December",
                "famousFor": "Red Panda Habitat, Forests, Trekking",
                "description": "Gairibas sits amidst lush forested valleys and serves as one of the most biodiverse locations in the Singalila region, offering a unique forest experience.",
                "attractions": ["Singalila National Park Forests", "Red Panda Habitat", "Rhododendron Forests"]
            }
        ]
    },
    "kalimpong": {
        "title": "Kalimpong Hills",
        "description": "Cultural Gateway of the Eastern Himalayas.",
        "places": [
            {
                "name": "Kalimpong",
                "tagline": "Cultural Gateway of the Eastern Himalayas",
                "altitude": "1,250 m (4,101 ft)",
                "bestTime": "Throughout the Year",
                "famousFor": "Monasteries, Colonial Heritage, Orchids",
                "description": "Kalimpong is a vibrant cultural crossroads where Himalayan, Tibetan, Lepcha, Nepali, and Bhutanese influences coexist, known for panoramic mountain views.",
                "attractions": ["Deolo Hill", "Durpin Dara Hill", "Zang Dhok Palri Phodang Monastery", "Mangal Dham"]
            },
            {
                "name": "Lava",
                "tagline": "Gateway to Neora Valley National Park",
                "altitude": "2,350 m (7,710 ft)",
                "bestTime": "October–May",
                "famousFor": "Neora Valley National Park, Birdwatching, Forests",
                "description": "Surrounded by dense pine forests and misty valleys, Lava offers a peaceful travel experience where forests dominate the landscape.",
                "attractions": ["Lava Monastery", "Neora Valley National Park", "Pine Forest Trails"]
            },
            {
                "name": "Rishop",
                "tagline": "Himalayan Viewpoint of Kalimpong",
                "altitude": "2,590 m (8,497 ft)",
                "bestTime": "October–May",
                "famousFor": "Kangchenjunga Views, Sunrise, Forests",
                "description": "Rishop is renowned for its breathtaking panoramic views of Mount Kangchenjunga, spectacular sunrises, and peaceful mountain atmosphere.",
                "attractions": ["Kangchenjunga Viewpoint", "Sunrise Point", "Orange Orchards"]
            },
            {
                "name": "Kolakham",
                "tagline": "Hidden Village Above Neora Valley",
                "altitude": "1,980 m (6,496 ft)",
                "bestTime": "October–May",
                "famousFor": "Changey Falls, Kangchenjunga Views, Red Panda Habitat",
                "description": "Nestled on the edge of Neora Valley National Park, Kolakham is a pristine eco-tourism destination with dense forests and waterfalls.",
                "attractions": ["Changey Falls", "Kangchenjunga Viewpoint", "Neora Valley National Park"]
            },
            {
                "name": "Ramdhura",
                "tagline": "Hidden Himalayan Village",
                "altitude": "1,650 m (5,413 ft)",
                "bestTime": "October–May",
                "famousFor": "Kangchenjunga Views, Orange Orchards, Sunrise",
                "description": "Nestled amidst rolling hills, dense pine forests, and orange orchards, Ramdhura offers breathtaking views of the surrounding Eastern Himalayan landscape.",
                "attractions": ["Ramdhura Viewpoint", "Orange Orchards", "Pine Forest Trails"]
            },
            {
                "name": "Burmaik",
                "tagline": "Scenic Himalayan Retreat",
                "altitude": "1,500 m (4,921 ft)",
                "bestTime": "October–May",
                "famousFor": "Village Tourism, Nature Walks, Himalayan Views",
                "description": "Burmaik is a tranquil offbeat destination in Kalimpong district known for its authentic rural hospitality, peaceful environment, and mountain scenery.",
                "attractions": ["Village Walks", "Nature Photography", "Mountain Viewpoints"]
            },
            {
                "name": "Kaffergaon",
                "tagline": "Hidden Himalayan Hamlet",
                "altitude": "1,850 m (6,070 ft)",
                "bestTime": "October–May",
                "famousFor": "Kangchenjunga Views, Orange Orchards, Pine Forests",
                "description": "Kaffergaon represents the true essence of Himalayan village tourism, offering spectacular mountain scenery, rich biodiversity, and authentic local culture.",
                "attractions": ["Kangchenjunga Viewpoint", "Sunrise Point", "Orange Orchards"]
            },
            {
                "name": "Mairong Gaon",
                "tagline": "Hidden Forest Village",
                "altitude": "1,500–1,600 m (5,000–5,250 ft)",
                "bestTime": "October–May",
                "famousFor": "Forest Tourism, Birdwatching, Village Life",
                "description": "Mairung Gaon offers a rare opportunity to experience untouched Himalayan nature away from commercial tourism, nestled near the Neora Valley landscape.",
                "attractions": ["Tendrabong Forests", "Himalayan Viewpoints", "Duka Valley Views"]
            },
            {
                "name": "Ichhe Gaon",
                "tagline": "Hidden Himalayan Village",
                "altitude": "1,800 m (5,905 ft)",
                "bestTime": "October–May",
                "famousFor": "Kangchenjunga Views, Orange Orchards, Sunrise",
                "description": "Icchegaon offers visitors a peaceful and authentic Himalayan experience where nature, culture, and traditional village life coexist harmoniously.",
                "attractions": ["Kangchenjunga Viewpoint", "Sunrise Point", "Forest Trails"]
            },
            {
                "name": "Sillery Gaon",
                "tagline": "New Darjeeling of the Eastern Himalayas",
                "altitude": "1,800 m (5,905 ft)",
                "bestTime": "October–May",
                "famousFor": "Ramitey View Point, Damsang Fort, Kangchenjunga Views",
                "description": "Popularly known as the 'New Darjeeling', this picturesque village is renowned for breathtaking views of Mount Kangchenjunga and rich Lepcha heritage.",
                "attractions": ["Ramitey View Point", "Damsang Fort", "Tinchuley View Point"]
            }
        ]
    },
    "dooars": {
        "title": "Dooars Region",
        "description": "The doorway to the Eastern Himalayas, known for its rich wildlife, dense forests, and pristine rivers.",
        "places": [
            {
                "name": "Jaldapara",
                "tagline": "Wildlife Paradise of Dooars",
                "altitude": "61–175 m (200–574 ft)",
                "bestTime": "October–May",
                "famousFor": "One-Horned Rhinoceros, Elephant Safari, Biodiversity",
                "description": "Jaldapara National Park is one of the most celebrated wildlife destinations in West Bengal, renowned for its population of the Indian One-Horned Rhinoceros and rich grassland ecosystem.",
                "attractions": ["Elephant Safari", "Jeep Safari", "Hollong Tourist Lodge", "Wildlife Watchtowers"]
            },
            {
                "name": "Gorumara",
                "tagline": "Wildlife Jewel of Dooars",
                "altitude": "80–200 m (262–656 ft)",
                "bestTime": "October–May",
                "famousFor": "Indian Bison (Gaur), Elephant Safari, Forest Adventure",
                "description": "Gorumara National Park is internationally renowned for its thriving population of Indian Gaur, Asian Elephants, and Indian Rhinoceros across scenic floodplains.",
                "attractions": ["Jatraprasad Watchtower", "Medla Watchtower", "Rhino Point", "Murti River"]
            },
            {
                "name": "Boxa",
                "tagline": "Wilderness of Dooars",
                "altitude": "60–1,750 m (197–5,741 ft)",
                "bestTime": "October–April",
                "famousFor": "Tiger Reserve, Forests, Fort, Trekking",
                "description": "Buxa Tiger Reserve is one of the most ecologically diverse landscapes in Eastern India, featuring dense tropical forests, historic Buxa Fort, and exceptional wildlife.",
                "attractions": ["Buxa Fort", "Jayanti River", "Mahakal Cave", "Lepchakha Viewpoint"]
            },
            {
                "name": "Jhalong",
                "tagline": "Riverside Gem of Dooars",
                "altitude": "650 m (2,133 ft)",
                "bestTime": "October–May",
                "famousFor": "Jaldhaka River, Hydel Project, Birdwatching",
                "description": "Jhalong is a picturesque riverside destination renowned for the emerald-green Jaldhaka River, historic hydroelectric project, and peaceful Himalayan landscapes.",
                "attractions": ["Jaldhaka River", "Jhalong Hydroelectric Project", "Riverside Viewpoints"]
            },
            {
                "name": "Bindu",
                "tagline": "Gateway to the India–Bhutan Border",
                "altitude": "600 m (1,969 ft)",
                "bestTime": "October–May",
                "famousFor": "Bindu Barrage, Jaldhaka River, Border Views",
                "description": "Bindu is a charming Himalayan village renowned for the Bindu Barrage, the crystal-clear Jaldhaka River, and panoramic border landscapes.",
                "attractions": ["Bindu Barrage", "India-Bhutan Border Viewpoint", "Cardamom Plantations"]
            },
            {
                "name": "Chilapata",
                "tagline": "Ancient Wilderness of Dooars",
                "altitude": "120 m (394 ft)",
                "bestTime": "October–May",
                "famousFor": "Wildlife Safari, Nalraja Fort, Elephant Corridor",
                "description": "Chilapata Forest is a pristine tropical forest renowned for its dense Sal forests, rich biodiversity, and the historic ruins of Nalraja Fort.",
                "attractions": ["Nalraja Fort", "Elephant Corridor", "Dense Sal Forests"]
            }
        ]
    },
    "sikkim": {
        "title": "Sikkim Region",
        "description": "Four directions, four kinds of wonder - from high-altitude lakes to sacred monasteries.",
        "places": [
            {
                "name": "Pelling (West Sikkim)",
                "tagline": "Gateway to Kanchenjunga",
                "altitude": "2,150 m (7,200 ft)",
                "bestTime": "September–May",
                "famousFor": "Kanchenjunga Views, Monasteries, Waterfalls",
                "description": "Pelling is a popular hill station offering breathtaking, up-close views of Mount Kanchenjunga. It is home to ancient monasteries like Pemayangtse and the stunning Khecheopalri Lake.",
                "attractions": ["Pemayangtse Monastery", "Khecheopalri Lake", "Pelling Skywalk", "Kanchenjunga Falls"]
            },
            {
                "name": "Yuksom (West Sikkim)",
                "tagline": "The First Capital of Sikkim",
                "altitude": "1,780 m (5,840 ft)",
                "bestTime": "March–May & September–November",
                "famousFor": "Historical Significance, Trekking Base, Monasteries",
                "description": "Yuksom is a historical town and the first capital of Sikkim. It serves as the base camp for the famous Dzongri and Goecha La treks in the Khangchendzonga National Park.",
                "attractions": ["Dubdi Monastery", "Coronation Throne of Norbugang", "Khangchendzonga National Park"]
            },
            {
                "name": "Barsey Rhododendron Sanctuary (West Sikkim)",
                "tagline": "Valley of Flowers",
                "altitude": "3,048 m (10,000 ft)",
                "bestTime": "March–May",
                "famousFor": "Rhododendron Blooms, Trekking, Wildlife",
                "description": "Located in the Singalila Range, Barsey is renowned for its vibrant rhododendron forests that bloom in spring, offering a colorful paradise for trekkers and nature lovers.",
                "attractions": ["Rhododendron Trails", "Singalila Range Views", "Himalayan Birdwatching"]
            },
            {
                "name": "Rinchenpong (West Sikkim)",
                "tagline": "Serene Mountain Village",
                "altitude": "1,700 m (5,576 ft)",
                "bestTime": "September–May",
                "famousFor": "Kanchenjunga Views, Heritage, Tranquility",
                "description": "Rinchenpong is a tranquil village known for its spectacular views of the Kanchenjunga range, historical significance, and the peaceful Rinchenpong Monastery.",
                "attractions": ["Rinchenpong Monastery", "Poison Lake (Bikh Pokhri)", "Heritage Houses"]
            },
            {
                "name": "Kaluk (West Sikkim)",
                "tagline": "Eco-Tourism Haven",
                "altitude": "1,620 m (5,300 ft)",
                "bestTime": "September–May",
                "famousFor": "Eco-Tourism, Nature Walks, Village Life",
                "description": "Kaluk is a scenic eco-tourism village offering undisturbed views of Mount Kanchenjunga, surrounded by lush forests and traditional Lepcha and Bhutia settlements.",
                "attractions": ["Singshore Bridge", "Eco-Tourism Resorts", "Village Trails"]
            },
            {
                "name": "Namchi (South Sikkim)",
                "tagline": "Cultural and Religious Hub",
                "altitude": "1,675 m (5,500 ft)",
                "bestTime": "March–May & September–November",
                "famousFor": "Char Dham, Samdruptse, Temples",
                "description": "Namchi, the headquarters of South Sikkim, has emerged as a major religious and cultural tourism destination, featuring colossal statues and beautiful gardens.",
                "attractions": ["Siddhesvara Dham (Char Dham)", "Samdruptse Statue", "Namchi Rock Garden"]
            },
            {
                "name": "Ravangla (South Sikkim)",
                "tagline": "Peaceful Hill Station",
                "altitude": "2,438 m (8,000 ft)",
                "bestTime": "September–May",
                "famousFor": "Buddha Park, Mountain Views, Monasteries",
                "description": "Ravangla is a charming tourist town known for its breathtaking mountain views, peaceful monasteries, and the magnificent Buddha Park featuring a towering statue of Lord Buddha.",
                "attractions": ["Buddha Park (Tathagata Tsal)", "Ralong Monastery", "Rayong Sunrise Viewpoint"]
            },
            {
                "name": "Jorethang (South Sikkim)",
                "tagline": "Riverside Town",
                "altitude": "300 m (984 ft)",
                "bestTime": "Winter & Spring",
                "famousFor": "Rangeet River, Maghe Mela, Transit Hub",
                "description": "Located on the banks of the Rangeet River, Jorethang is a major commercial hub and transit town in South Sikkim, famous for the annual Maghe Sankranti Mela.",
                "attractions": ["Rangeet River", "Jorethang Maghe Mela", "River Rafting"]
            },
            {
                "name": "Temi Tea Garden (South Sikkim)",
                "tagline": "Sikkim's Only Tea Estate",
                "altitude": "1,200–2,000 m (3,900–6,500 ft)",
                "bestTime": "October–May",
                "famousFor": "Organic Tea, Scenic Slopes, Cherry Blossoms",
                "description": "Temi Tea Garden is the only tea estate in Sikkim, famous for producing top-quality organic tea. The terraced slopes with blooming cherry trees in winter are a photographer's delight.",
                "attractions": ["Tea Factory Tours", "Cherry Blossom Viewing", "Tea Garden Walks"]
            },
            {
                "name": "Kitam Bird Sanctuary (South Sikkim)",
                "tagline": "Avian Paradise",
                "altitude": "300–800 m (984–2,624 ft)",
                "bestTime": "October–April",
                "famousFor": "Birdwatching, Sal Forests, Butterflies",
                "description": "Kitam Bird Sanctuary is a unique protected area in South Sikkim, characterized by thick Sal forests and a rich variety of bird and butterfly species.",
                "attractions": ["Birdwatching Trails", "River Rangeet Views", "Nature Photography"]
            },
            {
                "name": "Lachen (North Sikkim)",
                "tagline": "Gateway to Gurudongmar",
                "altitude": "2,750 m (9,000 ft)",
                "bestTime": "March–May & October–November",
                "famousFor": "High Altitude Base, Lachen Monastery, Scenic Valleys",
                "description": "Lachen is a remote high-altitude village that serves as the base for visiting the sacred Gurudongmar Lake and exploring the rugged beauty of North Sikkim.",
                "attractions": ["Lachen Monastery", "Chopta Valley", "Thangu Valley"]
            },
            {
                "name": "Lachung (North Sikkim)",
                "tagline": "The Flower Valley Village",
                "altitude": "2,600 m (8,600 ft)",
                "bestTime": "March–May & October–November",
                "famousFor": "Yumthang Valley Base, Snowfalls, Waterfalls",
                "description": "Lachung is a picturesque mountain village surrounded by snow-capped peaks and waterfalls, serving as the gateway to the famous Yumthang Valley of Flowers.",
                "attractions": ["Lachung Monastery", "Bhim Nala Falls", "Apple Orchards"]
            },
            {
                "name": "Zero Point (North Sikkim)",
                "tagline": "Yumesamdong Edge",
                "altitude": "4,663 m (15,300 ft)",
                "bestTime": "March–May & October–November",
                "famousFor": "Snow, High Altitude Desert, Hot Springs",
                "description": "Zero Point, or Yumesamdong, is where the civilian road ends. It offers spectacular views of the snow-clad Himalayas and a true high-altitude terrain experience.",
                "attractions": ["Snow Activities", "Yumesamdong Hot Springs", "Mountain Panoramas"]
            },
            {
                "name": "Gurudongmar Lake (North Sikkim)",
                "tagline": "Sacred Alpine Lake",
                "altitude": "5,430 m (17,800 ft)",
                "bestTime": "April–May & October–November",
                "famousFor": "High Altitude Lake, Sacred Site, Stunning Vistas",
                "description": "One of the highest lakes in the world, Gurudongmar Lake is considered sacred by Buddhists, Sikhs, and Hindus. Its crystal-clear waters and surrounding snowy peaks are awe-inspiring.",
                "attractions": ["Sacred Lake", "High Altitude Views", "Sarva Dharma Sthal"]
            },
            {
                "name": "Yumthang Valley (North Sikkim)",
                "tagline": "Valley of Flowers",
                "altitude": "3,564 m (11,693 ft)",
                "bestTime": "March–May",
                "famousFor": "Rhododendrons, Hot Springs, River Views",
                "description": "Yumthang Valley is famous for its stunning display of blooming rhododendrons in spring, the meandering Lachung River, and natural hot springs.",
                "attractions": ["Rhododendron Sanctuary", "Yumthang Hot Spring", "Meadow Walks"]
            },
            {
                "name": "Gangtok (East Sikkim)",
                "tagline": "The Capital City",
                "altitude": "1,650 m (5,410 ft)",
                "bestTime": "September–May",
                "famousFor": "Monasteries, Cable Car, Urban Hub",
                "description": "Gangtok, the vibrant capital of Sikkim, beautifully blends modern urban life with traditional Himalayan culture, offering monasteries, viewpoints, and bustling markets.",
                "attractions": ["MG Marg", "Rumtek Monastery", "Tsomgo Lake", "Gangtok Ropeway"]
            },
            {
                "name": "Baba Mandir (East Sikkim)",
                "tagline": "Shrine of a Soldier",
                "altitude": "4,000 m (13,123 ft)",
                "bestTime": "April–June & October–November",
                "famousFor": "Military Shrine, Spiritual Significance, Scenery",
                "description": "Baba Harbhajan Singh Temple is a unique shrine built in honor of an Indian Army soldier who is revered by locals and soldiers as a protecting spirit of the border.",
                "attractions": ["Baba Temple", "High Altitude Landscapes", "Army Heritage"]
            },
            {
                "name": "Nathula Pass (East Sikkim)",
                "tagline": "Historic Silk Route Border",
                "altitude": "4,310 m (14,140 ft)",
                "bestTime": "May–October",
                "famousFor": "Indo-China Border, Snow, Historic Trade Route",
                "description": "Nathula Pass is a mountain pass in the Himalayas that connects the Indian state of Sikkim with China's Tibet Autonomous Region. It was part of the ancient Silk Route.",
                "attractions": ["Indo-China Border Gates", "Exhibition Centre", "Tsomgo Lake en route"]
            },
            {
                "name": "Aritar (East Sikkim)",
                "tagline": "Tranquil Heritage Village",
                "altitude": "1,498 m (4,915 ft)",
                "bestTime": "October–May",
                "famousFor": "Lampokhari Lake, Monasteries, Silk Route",
                "description": "Aritar is known for its natural and landscaped beauty, rich history, and the beautiful boot-shaped Lampokhari Lake, one of the oldest natural lakes in Sikkim.",
                "attractions": ["Lampokhari Lake", "Aritar Gumpa", "Mankhim Viewpoint"]
            },
            {
                "name": "Rolep (East Sikkim)",
                "tagline": "Riverside Retreat",
                "altitude": "1,200 m (4,000 ft)",
                "bestTime": "October–May",
                "famousFor": "Rolep River, Hanging Bridge, Birdwatching",
                "description": "Rolep is an emerging eco-tourism village on the banks of the Rolep Khola. It offers peaceful riverside stays, trout fishing, and nature trails.",
                "attractions": ["Buddha Waterfall", "Rolep Hanging Bridge", "Riverside Camping"]
            },
            {
                "name": "Padamchen (East Sikkim)",
                "tagline": "Silk Route Forest Village",
                "altitude": "2,438 m (8,000 ft)",
                "bestTime": "October–May",
                "famousFor": "Old Silk Route, Forest Landscapes, Birdwatching",
                "description": "Padamchen is a small, picturesque village on the Old Silk Route, surrounded by dense forests. It is an ideal stopover for acclimatization and birdwatching.",
                "attractions": ["Pangolakha Wildlife Sanctuary", "Old Silk Route Trails", "Birdwatching"]
            }
        ]
    }
};

window.destinationsData = destinationsData;
