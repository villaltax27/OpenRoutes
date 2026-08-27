const params = new URLSearchParams(window.location.search);
const place = params.get("place") || "santa ana";

const sharedGallery = [
  {
    type: "image",
    src: "https://cdn-pro.elsalvador.com/wp-content/uploads/2019/06/Lago-Coatepeque_03.jpg",
    alt: "Lake Coatepeque surrounded by green mountains",
    title: "Open Routes destination photo",
    description: "Accessible travel inspiration in El Salvador"
  },
  {
    type: "image",
    src: "https://bonvoyageguatemala.com/en/wp-content/uploads/2018/09/shutterstock-372639865-1600x1000.jpg",
    alt: "El Tunco beach at sunset",
    title: "Open Routes destination photo",
    description: "Accessible travel inspiration in El Salvador"
  },
  {
    type: "image",
    src: "https://svelsalvador.com/wp-content/uploads/2023/10/Suchitoto-Como-llegar-Donde-queda-Que-hacer-Videos.jpg",
    alt: "Suchitoto historic town architecture",
    title: "Open Routes destination photo",
    description: "Accessible travel inspiration in El Salvador"
  }
];

const destinations = {
  "santa-ana": {
    name: "Santa Ana Volcano",
    location: "Santa Ana, El Salvador",
    summary: "One of the most iconic volcanoes in El Salvador with breathtaking views.",
    overview: "Santa Ana Volcano is the highest volcano in El Salvador and offers one of the best hiking experiences in the country. The route rewards travelers with crater views, fresh mountain air and a memorable look at the western landscape.",
    locationText: "Located inside Los Volcanes National Park, this destination is best reached from Santa Ana or nearby towns with planned transportation.",
        map: {
      lat: 13.85142,
      lng: -89.62902,
      query: "Santa Ana Volcano, El Salvador",
      facts: [
        { title: "Nearest City", text: "Santa Ana is the main city travelers usually use as a starting point.", icon: "fa-city" },
        { title: "Main Access", text: "Plan the route through Los Volcanes or Cerro Verde with arranged transport.", icon: "fa-road" },
        { title: "Parking", text: "Parking is available near the access area, but walking is required for the trail.", icon: "fa-square-parking" },
        { title: "Arrival Tip", text: "Arrive early because guided hiking departures and weather windows are limited.", icon: "fa-clock" }
      ]
    },
    route: {
      origin: "San Salvador or Santa Ana",
      destination: "Los Volcanes National Park access",
      estimate: "1 hr 30 min from San Salvador / 45 min from Santa Ana",
      transport: "Private car, tour van or guide transport",
      accessNote: "The summit trail is demanding, so confirm guide times and choose visitor areas if you need lower walking support.",
      stops: ["San Salvador", "Santa Ana", "Cerro Verde access", "Volcano viewpoint"]
    },
    heroImage: "https://www.paradisecatchers.com/wp-content/uploads/2023/04/Santa-Ana-Volcano-Crater3.jpg",
    gallery: [
      {
        type: "image",
        src: "https://www.paradisecatchers.com/wp-content/uploads/2023/04/Santa-Ana-Volcano-Crater3.jpg",
        alt: "Santa Ana Volcano crater lagoon",
        title: "Santa Ana Volcano",
        description: "Crater lagoon view at the summit"
      },
      {
        type: "video",
        src: "videos/destinations/Gustavo - Santa ana volcano.mp4",
        title: "Santa Ana Volcano Sign Language Guide",
        alt: "Sign language video guide for Santa Ana Volcano",
        poster: "https://www.paradisecatchers.com/wp-content/uploads/2023/04/Santa-Ana-Volcano-Crater3.jpg",
        description: "Video explanation in sign language about Santa Ana Volcano"
      },
      {
        type: "image",
        src: "https://theworldtravelguy.com/wp-content/uploads/2023/07/DSCF3609-2.jpg",
        alt: "Hikers on the Santa Ana Volcano trail",
        title: "Hiking Trail",
        description: "Guided route through volcanic landscapes"
      },
      {
        type: "image",
        src: "https://flyflapper.com/_next/image?q=75&url=https%3A%2F%2Fflappermedia.s3.us-east-1.amazonaws.com%2Fcms-strapi%2Ftrekking_volcan_santa_ana_589x392_099469d80e.avif&w=3840",
        alt: "Turquoise crater lake at Santa Ana Volcano",
        title: "Crater Viewpoint",
        description: "Panoramic volcanic scenery"
      },
      {
        type: "image",
        src: "https://thf.bing.com/th/id/R.16a9d0ceaafc7d36fe72237465acccdb?rik=HUFWnO8PTnlkBg&pid=ImgRaw&r=0",
        alt: "Santa Ana Volcano landscape view",
        title: "Volcano Landscape",
        description: "Mountain views around Los Volcanes National Park"
      }
    ],
        practicalInfo: [
      { title: "Opening Hours", text: "MARN lists entry from 7:30 AM to 11:00 AM on weekdays and from 4:00 AM on weekends. Confirm conditions before traveling.", icon: "fa-clock" },
      { title: "Entry Fee", text: "Reference fees: Salvadorans $2, foreigners $3, students $0.50-$1; children under 12 and seniors enter free.", icon: "fa-ticket" },
      { title: "Best Time", text: "Clear mornings in the dry season are best for crater views; weather can change quickly near the summit.", icon: "fa-sun" },
      { title: "Visit Duration", text: "Plan a half-day trip, including registration, guided hiking time and rest stops.", icon: "fa-hourglass-half" },
      { title: "Difficulty", text: "Moderate hike with volcanic gravel, sun exposure and cool windy sections near the crater.", icon: "fa-person-hiking" },
      { title: "How to Get There", text: "Travel to the Los Volcanes or Cerro Verde access area from Santa Ana, or arrange tourist transport with a guide.", icon: "fa-car" },
      { title: "Accessibility Note", text: "The summit trail is not wheelchair accessible; support is mainly available around parking and visitor areas.", icon: "fa-wheelchair" },
      { title: "Safety Tip", text: "Bring water, sunscreen, suitable hiking shoes and follow ranger or guide instructions.", icon: "fa-shield-heart" }
    ],    highlights: [
      { title: "Crater Views", text: "A colorful volcanic lagoon at the summit.", icon: "fa-mountain-sun" },
      { title: "Fresh Climate", text: "Cool mountain weather during most mornings.", icon: "fa-cloud-sun" },
      { title: "Guided Routes", text: "Local guides can support safer visits.", icon: "fa-person-hiking" },
      { title: "Photography", text: "Wide views of Izalco and Coatepeque.", icon: "fa-camera" }
    ],
    todo: ["Hike with a local guide", "Take landscape photos", "Visit nearby viewpoints", "Plan a picnic stop after the hike"],
    localExperience: {
      food: "Try Santa Ana classics after the hike: pupusas, elotes locos, minutas and the traditional panes chucos around the historic center.",
      culture: "Pair the volcano route with Santa Ana's historic center, especially the cathedral, theater area and local plazas.",
      localTip: "Start early, then leave space for a relaxed food stop in Santa Ana after the trail.",
      routes: [
        { title: "1 Day", text: "Morning volcano hike, lunch in Santa Ana, quick photo stop near the cathedral." },
        { title: "2 Days", text: "Add Lake Coatepeque or Cerro Verde viewpoints with a slower recovery day." },
        { title: "Weekend", text: "Combine the volcano, Santa Ana historic center and a lakefront meal at Coatepeque." }
      ]
    },
    tips: ["Wear comfortable hiking shoes", "Bring water and sunscreen", "Go early in the morning", "Check weather conditions before leaving"],
    accessDetails: [
      { category: "Mobility", title: "Wheelchair Route", text: "The summit trail is a natural volcanic path and is not wheelchair accessible.", status: "Not Available", icon: "fa-wheelchair", evidence: "Natural trail with steep sections and loose volcanic ground." },
      { category: "Mobility", title: "Walking Distance", text: "Expect a long uphill walk from the access area to the crater viewpoint.", status: "Limited", icon: "fa-person-hiking", evidence: "Best for travelers comfortable with moderate hiking." },
      { category: "Arrival", title: "Parking", text: "Parking is available near the park access area.", status: "Available", icon: "fa-square-parking", evidence: "Visitors still need to continue on foot after parking." },
      { category: "Facilities", title: "Restrooms", text: "Basic restrooms are available near access points, not along the trail.", status: "Limited", icon: "fa-restroom", evidence: "Use facilities before beginning the hike." },
      { category: "Communication", title: "Sign Language Video", text: "A sign language video guide is available in the destination gallery.", status: "Available", icon: "fa-hands", evidence: "The Santa Ana Volcano carousel includes an uploaded sign language video." },
      { category: "Communication", title: "Voice Assistant", text: "The voice assistant can read page content and help users navigate with spoken commands.", status: "Available", icon: "fa-microphone-lines", evidence: "Enable the assistant prompt or say read page." },
      { category: "Support", title: "Guided Assistance", text: "Guides are recommended for safer hiking and orientation.", status: "Available", icon: "fa-hands-helping", evidence: "Guided entry helps manage route timing and safety." },
      { category: "Sensory", title: "Crowds and Noise", text: "Crowds can increase on weekends and holidays.", status: "Ask First", icon: "fa-users", evidence: "Visit early and confirm expected visitor flow." }
    ]
  },
  "coatepeque": {
    name: "Lake Coatepeque",
    location: "Santa Ana, El Salvador",
    summary: "Enjoy the breathtaking beauty of Lake Coatepeque, one of the most stunning lakes in El Salvador. Perfect for relaxation, nature and accessible experiences for everyone.",
    overview: "Lake Coatepeque is a volcanic crater lake known for its deep blue waters and beautiful views. It is an ideal destination for travelers looking for a peaceful and accessible place to enjoy nature.",
    locationText: "Lake Coatepeque is located in Santa Ana, surrounded by panoramic roads, restaurants, viewpoints and lakefront activities.",
        map: {
      lat: 13.86361,
      lng: -89.54639,
      query: "Lake Coatepeque, El Salvador",
      facts: [
        { title: "Nearest City", text: "Santa Ana is the closest major city for transport, food and services.", icon: "fa-city" },
        { title: "Main Access", text: "The lake is best reached by car, tour van or arranged guide from Santa Ana.", icon: "fa-road" },
        { title: "Parking", text: "Parking depends on the viewpoint, restaurant or lakefront venue you choose.", icon: "fa-square-parking" },
        { title: "Arrival Tip", text: "Choose the exact viewpoint or restaurant before leaving so navigation is easier.", icon: "fa-location-crosshairs" }
      ]
    },
    route: {
      origin: "San Salvador or Santa Ana",
      destination: "Lake Coatepeque viewpoint",
      estimate: "1 hr 20 min from San Salvador / 35 min from Santa Ana",
      transport: "Private car, tour van or arranged guide",
      accessNote: "Choose a restaurant or viewpoint with close parking, ramps and restroom access before leaving.",
      stops: ["San Salvador", "Santa Ana", "Lake viewpoint", "Restaurant or dock"]
    },
    heroImage: "https://cdn-pro.elsalvador.com/wp-content/uploads/2019/06/Lago-Coatepeque_03.jpg",
    gallery: [
      {
        type: "image",
        src: "https://cdn-pro.elsalvador.com/wp-content/uploads/2019/06/Lago-Coatepeque_03.jpg",
        alt: "Lake Coatepeque surrounded by green mountains",
        title: "Lake Coatepeque",
        description: "Blue crater lake surrounded by volcanic hills"
      },
      {
        type: "video",
        src: "videos/destinations/Hazel (Lake coatepeque).mp4",
        poster: "https://cdn-pro.elsalvador.com/wp-content/uploads/2019/06/Lago-Coatepeque_03.jpg",
        alt: "Sign language video guide for Lake Coatepeque",
        title: "Sign Language Guide",
        description: "Video explanation in sign language about Lake Coatepeque"
      },
      {
        type: "image",
        src: "https://images.trvl-media.com/place/53/f552d646-78fa-4ba5-b304-98c376d4de33.jpg",
        alt: "Aerial view of Lake Coatepeque",
        title: "Aerial View",
        description: "Wide view of the lake and shoreline"
      },
      {
        type: "image",
        src: "https://www.latinroutes.co.uk/media/aobp4yjn/coatepeque-lake-in-el-salvador-central-america.jpeg",
        alt: "Lake Coatepeque volcanic panorama",
        title: "Volcanic Panorama",
        description: "Clear water and green volcanic slopes"
      },
      {
        type: "image",
        src: "https://mediaim.expedia.com/localexpert/1344277/0e2be726-588a-4d49-9a8b-545327b5399c.jpg",
        alt: "Coatepeque lake viewpoint",
        title: "Lake Viewpoint",
        description: "Scenic overlook for visitors"
      }
    ],
        practicalInfo: [
      { title: "Opening Hours", text: "Open viewpoints and lake roads can be visited during the day; restaurants, boat tours and private access points set their own schedules.", icon: "fa-clock" },
      { title: "Entry Fee", text: "Public viewpoints may be free, but lake access is often through restaurants, hotels or activity providers with separate costs.", icon: "fa-ticket" },
      { title: "Best Time", text: "Morning and sunset offer calmer weather, softer light and better views across the crater lake.", icon: "fa-sun" },
      { title: "Visit Duration", text: "Plan a half day for viewpoints and lunch, or a full day if adding a boat ride, kayak or swimming.", icon: "fa-hourglass-half" },
      { title: "Difficulty", text: "Easy for viewpoints and restaurants; water access depends on the specific venue.", icon: "fa-person-walking" },
      { title: "How to Get There", text: "Best reached by car, tourist transport or arranged guide from Santa Ana.", icon: "fa-car" },
      { title: "Accessibility Note", text: "Accessible access depends on the restaurant, hotel or viewpoint; confirm ramps and restrooms before going.", icon: "fa-wheelchair" },
      { title: "Safety Tip", text: "If the lake changes color, avoid water activities and enjoy the view from outside the water.", icon: "fa-shield-heart" }
    ],    highlights: [
      { title: "Stunning Views", text: "Panoramic landscapes that make the visit unforgettable.", icon: "fa-mountain" },
      { title: "Perfect Climate", text: "Warm and pleasant weather through most of the year.", icon: "fa-cloud-sun" },
      { title: "Local Culture", text: "Friendly lake communities and Salvadoran cuisine.", icon: "fa-people-group" },
      { title: "Water Activities", text: "Kayaking, swimming and boat tours available.", icon: "fa-water" }
    ],
    todo: ["Take a boat ride around the lake", "Try local seafood", "Visit a panoramic viewpoint", "Enjoy kayaking or swimming in safe areas"],
    localExperience: {
      food: "Choose a lakefront restaurant for seafood, pupusas, coffee or a relaxed lunch with a crater-lake view.",
      culture: "Coatepeque is a weekend favorite for Salvadoran families, with boat rides, viewpoints and water activities around the lake.",
      localTip: "Pick your exact restaurant or viewpoint before leaving because access, parking and ramps vary by venue.",
      routes: [
        { title: "1 Day", text: "Viewpoint stop, lunch by the water, boat ride or kayak, sunset before returning." },
        { title: "2 Days", text: "Add Santa Ana city, local food and a slower morning by the lake." },
        { title: "Weekend", text: "Combine Coatepeque, Santa Ana Volcano viewpoints and nearby coffee or town stops." }
      ]
    },
    tips: ["Visit during sunset", "Bring cash for small restaurants", "Ask about accessible entrances before booking", "Use sunscreen during midday"],
    accessDetails: [
      { category: "Mobility", title: "Wheelchair Route", text: "Some viewpoints, restaurants and lakefront venues may have ramps or flatter access.", status: "Limited", icon: "fa-wheelchair", evidence: "Accessibility depends on the exact place selected around the lake." },
      { category: "Mobility", title: "Flat Paths", text: "Main venue areas may be easier to move through than direct shore access.", status: "Limited", icon: "fa-route", evidence: "Lakefront slopes, docks and stairs vary by provider." },
      { category: "Arrival", title: "Parking", text: "Parking is available in selected restaurants, viewpoints and private access points.", status: "Available", icon: "fa-square-parking", evidence: "Confirm accessible parking with the venue before arrival." },
      { category: "Facilities", title: "Restrooms", text: "Accessible restrooms may be available in some restaurants or hotels.", status: "Ask First", icon: "fa-restroom", evidence: "Public information varies by venue." },
      { category: "Communication", title: "Sign Language Video", text: "A sign language video guide is available in the destination gallery.", status: "Available", icon: "fa-hands", evidence: "The Coatepeque carousel includes an uploaded sign language video." },
      { category: "Communication", title: "Voice Assistant", text: "The voice assistant can read page content and help users navigate with spoken commands.", status: "Available", icon: "fa-microphone-lines", evidence: "Enable the assistant prompt or say read page." },
      { category: "Support", title: "Guided Assistance", text: "Local support depends on the activity provider or restaurant staff.", status: "Limited", icon: "fa-hands-helping", evidence: "Ask before booking boat rides or lake activities." },
      { category: "Safety", title: "Water Activity Conditions", text: "Water activities should be confirmed before entering the lake.", status: "Ask First", icon: "fa-water", evidence: "Lake conditions can change and some activities may pause." }
    ]
  },
  "el-tunco": {
    name: "El Tunco Beach",
    location: "La Libertad, El Salvador",
    summary: "A famous surf beach with restaurants, nightlife and beautiful sunsets by the Pacific coast.",
    overview: "El Tunco is a popular beach destination known for surfing, sunsets and a lively coastal atmosphere. Travelers can enjoy food, music and ocean views in a compact walkable town.",
    locationText: "El Tunco is located in La Libertad, close to the coastal highway and other beaches along Surf City.",
        map: {
      lat: 13.49222,
      lng: -89.38139,
      query: "Playa El Tunco, La Libertad, El Salvador",
      facts: [
        { title: "Nearest City", text: "Puerto de La Libertad is the closest city for extra services and transport.", icon: "fa-city" },
        { title: "Main Access", text: "Drive along the coastal highway to kilometer 43 in La Libertad.", icon: "fa-road" },
        { title: "Parking", text: "Parking is available in town, especially near restaurants and surf schools.", icon: "fa-square-parking" },
        { title: "Arrival Tip", text: "Arrive before sunset on busy weekends to find parking and move around calmly.", icon: "fa-clock" }
      ]
    },
    route: {
      origin: "San Salvador or La Libertad",
      destination: "Playa El Tunco",
      estimate: "45 min to 1 hr from San Salvador / 20 min from La Libertad",
      transport: "Private car, ride-share or coastal shuttle",
      accessNote: "Town streets are easier than the beach; confirm restaurant entrances and parking before sunset hours.",
      stops: ["San Salvador", "La Libertad", "El Tunco entrance", "Beach restaurants"]
    },
    heroImage: "https://bonvoyageguatemala.com/en/wp-content/uploads/2018/09/shutterstock-372639865-1600x1000.jpg",
    gallery: [
      {
        type: "image",
        src: "https://bonvoyageguatemala.com/en/wp-content/uploads/2018/09/shutterstock-372639865-1600x1000.jpg",
        alt: "El Tunco beach at sunset",
        title: "El Tunco Beach",
        description: "Pacific coast sunset and surf atmosphere"
      },
      {
        type: "video",
        src: "videos/destinations/Xavier- El tunco.mp4",
        poster: "https://bonvoyageguatemala.com/en/wp-content/uploads/2018/09/shutterstock-372639865-1600x1000.jpg",
        alt: "Sign language video guide for El Tunco Beach",
        title: "Sign Language Guide",
        description: "Video explanation in sign language about El Tunco Beach"
      },
      {
        type: "image",
        src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/8a/19/69/surf.jpg?w=1200&h=900&s=1",
        alt: "Surfing at El Tunco beach",
        title: "Surf Experience",
        description: "Waves and surf lessons by the coast"
      },
      {
        type: "image",
        src: "https://onewaytickettoparadise.com/wp-content/uploads/2018/01/DSC_6125-600x400.jpg",
        alt: "El Tunco shoreline and beach bars",
        title: "Beach Walk",
        description: "Rocky shoreline and ocean views"
      },
      {
        type: "image",
        src: "https://traveledearth.com/wp-content/gallery/playa-el-tunco/_MG_2232_01.jpg",
        alt: "Rock formations at Playa El Tunco",
        title: "Rock Formations",
        description: "Iconic coastal scenery in La Libertad"
      }
    ],
        practicalInfo: [
      { title: "Opening Hours", text: "The beach area is open access; restaurants, surf schools and nightlife operate on their own schedules.", icon: "fa-clock" },
      { title: "Entry Fee", text: "There is no general beach entry fee; parking, lessons, rentals and venues have separate costs.", icon: "fa-ticket" },
      { title: "Best Time", text: "Morning is best for surfing, while sunset is ideal for photos and a calmer visit.", icon: "fa-sun" },
      { title: "Visit Duration", text: "Plan a half day to a full day, especially if taking surf lessons or staying for nightlife.", icon: "fa-hourglass-half" },
      { title: "Difficulty", text: "Easy to moderate; streets are compact, but beach access can be rocky and sandy.", icon: "fa-person-walking" },
      { title: "How to Get There", text: "Located about 7 km west of Puerto de La Libertad, around kilometer 43 on the coastal highway.", icon: "fa-car" },
      { title: "Accessibility Note", text: "Town areas are easier than the sand and rock beach; confirm accessible parking and restaurant entrances.", icon: "fa-wheelchair" },
      { title: "Safety Tip", text: "Advanced waves like La Bocana are for experienced surfers; beginners should use instructors and calmer areas.", icon: "fa-shield-heart" }
    ],    highlights: [
      { title: "Surf Culture", text: "Popular waves and surf schools for visitors.", icon: "fa-water" },
      { title: "Sunsets", text: "Golden evening views over the Pacific.", icon: "fa-sun" },
      { title: "Restaurants", text: "Compact food spots and beachfront cafes.", icon: "fa-utensils" },
      { title: "Nightlife", text: "Music and social spaces during weekends.", icon: "fa-music" }
    ],
    todo: ["Take a surf lesson", "Walk near the beach caves", "Watch the sunset", "Try seafood and local snacks"],
    localExperience: {
      food: "Try seafood, pupusas, pastelitos, cold drinks or casual international food in town; nearby La Libertad is known for fish and the sea market.",
      culture: "El Tunco is one of El Salvador's most iconic surf communities, with murals, board rentals, surf schools and a bohemian beach atmosphere.",
      localTip: "Visit earlier if you need calmer movement; sunset and weekends are busier and parking fills faster.",
      routes: [
        { title: "1 Day", text: "Arrive before lunch, eat seafood, take a beginner surf class or beach walk, stay for sunset." },
        { title: "2 Days", text: "Add Puerto de La Libertad, the boardwalk and a slower morning for coffee or surf." },
        { title: "Weekend", text: "Base yourself in El Tunco and explore Surf City beaches, seafood stops and local shops." }
      ]
    },
    tips: ["Best waves are usually in the morning", "Bring sandals for rocky areas", "Weekends can be crowded", "Keep personal items close"],
    accessDetails: [
      { category: "Mobility", title: "Wheelchair Route", text: "Town streets are easier than the beach, but sand and rocks limit direct shore access.", status: "Limited", icon: "fa-wheelchair", evidence: "Beach terrain is uneven and changes with tide." },
      { category: "Mobility", title: "Walking Surface", text: "Expect compact streets, sand, stones and uneven beach areas.", status: "Limited", icon: "fa-shoe-prints", evidence: "Wear appropriate shoes and plan shorter routes." },
      { category: "Arrival", title: "Parking", text: "Public and private parking options are available near town.", status: "Available", icon: "fa-square-parking", evidence: "Parking can fill quickly during weekends." },
      { category: "Facilities", title: "Restrooms", text: "Restrooms are available through restaurants, hotels and surf businesses.", status: "Available", icon: "fa-restroom", evidence: "Accessible restroom quality depends on the venue." },
      { category: "Communication", title: "Sign Language Video", text: "A sign language video guide is available in the destination gallery.", status: "Available", icon: "fa-hands", evidence: "The El Tunco carousel includes an uploaded sign language video." },
      { category: "Communication", title: "Voice Assistant", text: "The voice assistant can read page content and help users navigate with spoken commands.", status: "Available", icon: "fa-microphone-lines", evidence: "Enable the assistant prompt or say read page." },
      { category: "Support", title: "Surf or Local Assistance", text: "Surf instructors and local guides may support beginners and visitors needing help.", status: "Limited", icon: "fa-person-swimming", evidence: "Book support before arriving when possible." },
      { category: "Sensory", title: "Crowds and Nightlife", text: "Noise and crowds can be high at sunset, weekends and nightlife hours.", status: "Ask First", icon: "fa-users", evidence: "Choose morning visits for a calmer experience." }
    ]
  },
  "suchitoto": {
    name: "Suchitoto",
    location: "Cuscatlan, El Salvador",
    summary: "A charming colonial town full of culture, art, history and lake views.",
    overview: "Suchitoto is one of El Salvador's most beautiful colonial towns, known for cobblestone streets, galleries, cultural spaces and views toward Lake Suchitlan.",
    locationText: "Suchitoto is located in Cuscatlan and is commonly visited as a day trip from San Salvador.",
        map: {
      lat: 13.93672,
      lng: -89.02593,
      query: "Suchitoto, Cuscatlan, El Salvador",
      facts: [
        { title: "Nearest City", text: "San Salvador is the most common starting point for day trips to Suchitoto.", icon: "fa-city" },
        { title: "Main Access", text: "Travel by car, tour van or guided route toward Cuscatlan Norte.", icon: "fa-road" },
        { title: "Parking", text: "Parking is usually found near the central area, but streets can be narrow.", icon: "fa-square-parking" },
        { title: "Arrival Tip", text: "Use the central plaza as a practical starting point for walking tours.", icon: "fa-location-crosshairs" }
      ]
    },
    route: {
      origin: "San Salvador",
      destination: "Suchitoto central plaza",
      estimate: "1 hr 15 min from San Salvador",
      transport: "Private car, tour van or guided day trip",
      accessNote: "Start at the central plaza and choose shorter walking sections because several streets are cobblestone.",
      stops: ["San Salvador", "Cuscatlan route", "Suchitoto plaza", "Lake Suchitlan viewpoint"]
    },
    heroImage: "https://svelsalvador.com/wp-content/uploads/2023/10/Suchitoto-Como-llegar-Donde-queda-Que-hacer-Videos.jpg",
    gallery: [
      {
        type: "image",
        src: "https://svelsalvador.com/wp-content/uploads/2023/10/Suchitoto-Como-llegar-Donde-queda-Que-hacer-Videos.jpg",
        alt: "Suchitoto church and historic town",
        title: "Suchitoto",
        description: "Colonial streets and cultural landmarks"
      },
      {
        type: "video",
        src: "videos/destinations/Abner  - Suchitoto.mp4",
        poster: "https://svelsalvador.com/wp-content/uploads/2023/10/Suchitoto-Como-llegar-Donde-queda-Que-hacer-Videos.jpg",
        alt: "Sign language video guide for Suchitoto",
        title: "Sign Language Guide",
        description: "Video explanation in sign language about Suchitoto"
      },
      {
        type: "image",
        src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0f/6f/7a/f0.jpg",
        alt: "Suchitoto colonial architecture",
        title: "Colonial Town",
        description: "Historic architecture and local culture"
      },
      {
        type: "image",
        src: "https://www.gotravelly.com/blog/wp-content/uploads/2021/08/Suchitoto.jpg",
        alt: "Suchitoto town square and white church",
        title: "Central Plaza",
        description: "Town square and church facade"
      },
      {
        type: "image",
        src: "https://tuncolife.com/wp-content/uploads/2021/11/suchitoto-lake-day-tour-to-suchitoto-trip-cascadas-las-tercios-colonial-town-1.jpg",
        alt: "Lake Suchitlan near Suchitoto",
        title: "Lake Suchitlan",
        description: "Peaceful lake views near town"
      }
    ],
        practicalInfo: [
      { title: "Opening Hours", text: "Town areas are open during the day; the tourist information center operates Monday to Sunday, 9:00 AM to 5:00 PM.", icon: "fa-clock" },
      { title: "Entry Fee", text: "Walking around town is free; museums, tours, boat rides or cultural activities may have separate prices.", icon: "fa-ticket" },
      { title: "Best Time", text: "Morning or late afternoon is best for cooler walking, photography and plaza visits.", icon: "fa-sun" },
      { title: "Visit Duration", text: "Plan a half day for the historic center, or a full day if adding Lake Suchitlan or workshops.", icon: "fa-hourglass-half" },
      { title: "Difficulty", text: "Easy to moderate because of cobblestone streets, slopes and uneven sidewalks.", icon: "fa-person-walking" },
      { title: "How to Get There", text: "Commonly visited by car, tourist transport or guided day trip from San Salvador.", icon: "fa-car" },
      { title: "Accessibility Note", text: "Main plaza areas are easier, but cobblestone streets can be challenging for wheelchair users.", icon: "fa-wheelchair" },
      { title: "Safety Tip", text: "Wear comfortable shoes, bring water and ask locally about the easiest walking route.", icon: "fa-shield-heart" }
    ],    highlights: [
      { title: "Colonial Streets", text: "Colorful architecture and historic corners.", icon: "fa-landmark" },
      { title: "Art Spaces", text: "Galleries, workshops and cultural houses.", icon: "fa-palette" },
      { title: "Lake Views", text: "Peaceful viewpoints toward Lake Suchitlan.", icon: "fa-water" },
      { title: "Local Food", text: "Traditional flavors in town restaurants.", icon: "fa-utensils" }
    ],
    todo: ["Take a walking tour", "Visit local art shops", "Explore the central plaza", "Take a boat ride on Lake Suchitlan"],
    localExperience: {
      food: "Look for traditional Salvadoran plates, coffee, sweets and corn-based food during local festivals or plaza visits.",
      culture: "Suchitoto is known for colonial architecture, art spaces, indigo workshops, Lake Suchitlan and festivals such as art, film, indigo and corn events.",
      localTip: "Plan walking in shorter sections because the cobblestone streets are beautiful but can be tiring.",
      routes: [
        { title: "1 Day", text: "Central plaza, Santa Lucia Church, local lunch, artisan stop and lake viewpoint." },
        { title: "2 Days", text: "Add Casa Museo Alejandro Cotto, Centro Arte para la Paz, boat ride and Los Tercios." },
        { title: "Weekend", text: "Visit during a cultural or food festival, then add Lake Suchitlan and indigo or art workshops." }
      ]
    },
    tips: ["Wear comfortable walking shoes", "Some streets are cobblestone", "Visit during cultural festivals", "Bring a light jacket for evenings"],
    accessDetails: [
      { category: "Mobility", title: "Wheelchair Route", text: "Main plaza areas are easier, but many streets are cobblestone or sloped.", status: "Limited", icon: "fa-wheelchair", evidence: "Route comfort depends on the street selected." },
      { category: "Mobility", title: "Rest Stops", text: "Benches, cafes and plaza areas offer places to rest during walking routes.", status: "Available", icon: "fa-chair", evidence: "Useful for pacing the visit in warm weather." },
      { category: "Arrival", title: "Parking", text: "Parking is available near central areas, though streets may be narrow.", status: "Available", icon: "fa-square-parking", evidence: "Arrive early for easier parking near the plaza." },
      { category: "Facilities", title: "Restrooms", text: "Restrooms are available in restaurants and public/tourist areas.", status: "Available", icon: "fa-restroom", evidence: "Confirm accessible restroom availability before long visits." },
      { category: "Communication", title: "Sign Language Video", text: "A sign language video guide is available in the destination gallery.", status: "Available", icon: "fa-hands", evidence: "The Suchitoto carousel includes an uploaded sign language video." },
      { category: "Communication", title: "Voice Assistant", text: "The voice assistant can read page content and help users navigate with spoken commands.", status: "Available", icon: "fa-microphone-lines", evidence: "Enable the assistant prompt or say read page." },
      { category: "Support", title: "Guided Route Planning", text: "Local guides can help choose easier walking routes and cultural stops.", status: "Available", icon: "fa-hands-helping", evidence: "Helpful because street slope and surface vary." },
      { category: "Sensory", title: "Quiet Areas", text: "The town has calmer areas away from festivals or main plaza activity.", status: "Limited", icon: "fa-ear-listen", evidence: "Avoid festival days if a quieter visit is needed." }
    ]
  },
  "historic-center": {
    name: "Historic Center",
    location: "San Salvador, El Salvador",
    summary: "The cultural and political heart of the capital city, filled with landmarks and public squares.",
    overview: "The Historic Center of San Salvador features iconic landmarks such as the Metropolitan Cathedral, National Palace, National Theater and vibrant plazas.",
    locationText: "Located in downtown San Salvador, the Historic Center is connected to public transportation and city services.",
        map: {
      lat: 13.6975,
      lng: -89.19031,
      query: "Centro Historico de San Salvador, El Salvador",
      facts: [
        { title: "Nearest City", text: "The destination is in downtown San Salvador, close to major cultural landmarks.", icon: "fa-city" },
        { title: "Main Access", text: "Arrive by ride-share, tourist transport or public transportation to the central area.", icon: "fa-road" },
        { title: "Parking", text: "Plan parking before arriving because downtown streets can be busy.", icon: "fa-square-parking" },
        { title: "Arrival Tip", text: "Start around the main plazas to visit the Cathedral, National Palace and nearby sites.", icon: "fa-location-crosshairs" }
      ]
    },
    route: {
      origin: "San Salvador",
      destination: "Historic Center main plazas",
      estimate: "10 to 25 min from central San Salvador",
      transport: "Ride-share, tourist transport or public transportation",
      accessNote: "Use renovated plazas as the main route and plan breaks because older sidewalks and crowds can vary.",
      stops: ["Hotel or meeting point", "Plaza Barrios", "National Palace", "Metropolitan Cathedral"]
    },
    heroImage: "https://centrohistorico.gob.sv/wp-content/uploads/2025/08/Centro-Historico-San-Salvador-29072022-Alcaldia-de-san-salvador-5.jpg",
    gallery: [
      {
        type: "image",
        src: "https://centrohistorico.gob.sv/wp-content/uploads/2025/08/Centro-Historico-San-Salvador-29072022-Alcaldia-de-san-salvador-5.jpg",
        alt: "Aerial night view of San Salvador Historic Center",
        title: "Historic Center",
        description: "Cathedral, plazas and civic landmarks"
      },
      {
        type: "video",
        src: "videos/destinations/Krissia - Centro historico.mp4",
        poster: "https://centrohistorico.gob.sv/wp-content/uploads/2025/08/Centro-Historico-San-Salvador-29072022-Alcaldia-de-san-salvador-5.jpg",
        alt: "Sign language video guide for the Historic Center",
        title: "Sign Language Guide",
        description: "Video explanation in sign language about the Historic Center"
      },
      {
        type: "image",
        src: "https://panukraine.ua/catalog/city/san-salvador/san-salvador_4.jpg",
        alt: "Downtown San Salvador with theater and cathedral",
        title: "Downtown San Salvador",
        description: "Historic buildings around the main plaza"
      },
      {
        type: "image",
        src: "https://www.latinroutes.co.uk/media/gyhjut3o/san-salvador-cathedral-el-salvador.jpeg",
        alt: "Metropolitan Cathedral of San Salvador",
        title: "Metropolitan Cathedral",
        description: "One of the main landmarks in the capital"
      },
      {
        type: "image",
        src: "https://3.bp.blogspot.com/-RUhU3wUDuK8/VxhHCOd0oPI/AAAAAAAAAgU/-2dB3U3zLJA3wjL3NGQ57AipaFrm7b96QCLcB/s1600/palacio%2Bnacional.jpg",
        alt: "National Palace in San Salvador",
        title: "National Palace",
        description: "Historic civic architecture in the city center"
      }
    ],
        practicalInfo: [
      { title: "Opening Hours", text: "Public plazas are generally visited during the day; some landmarks such as the National Palace have set schedules.", icon: "fa-clock" },
      { title: "Entry Fee", text: "Public areas are free; National Palace reference fees are $1 Salvadorans, $3 Central Americans or residents and $5 non-resident foreigners.", icon: "fa-ticket" },
      { title: "Best Time", text: "Morning or afternoon is best for walking tours; check events for extended activity in the area.", icon: "fa-sun" },
      { title: "Visit Duration", text: "Plan 2 to 4 hours for main landmarks, or more if visiting museums, cafes or events.", icon: "fa-hourglass-half" },
      { title: "Difficulty", text: "Easy urban route with sidewalks, plazas and short walking distances.", icon: "fa-person-walking" },
      { title: "How to Get There", text: "Use arranged transport, ride-share or public transport to downtown San Salvador; plan parking before arriving.", icon: "fa-car" },
      { title: "Accessibility Note", text: "Plazas and renovated areas are easier to move through, but older sidewalks and busy streets may vary.", icon: "fa-wheelchair" },
      { title: "Safety Tip", text: "Visit during active hours, keep belongings secure and follow local guidance around crowds or events.", icon: "fa-shield-heart" }
    ],    highlights: [
      { title: "Landmarks", text: "Cathedral, theater and historic buildings.", icon: "fa-landmark" },
      { title: "Public Plazas", text: "Open spaces for walking and photos.", icon: "fa-city" },
      { title: "Street Food", text: "Traditional snacks near central areas.", icon: "fa-utensils" },
      { title: "Culture", text: "Museums, events and guided city stories.", icon: "fa-book-open" }
    ],
    todo: ["Visit the National Palace", "Walk around Plaza Barrios", "Explore the National Theater", "Try local street food"],
    localExperience: {
      food: "Try typical dishes in downtown restaurants and coffee shops around the renovated plazas.",
      culture: "The route centers on the Metropolitan Cathedral, National Palace, National Theater, Liberty Park and the National Library cultural area.",
      localTip: "Go during active daytime or event hours, keep the route compact and plan parking or drop-off before arriving.",
      routes: [
        { title: "1 Day", text: "Plaza Barrios, Cathedral, National Palace, coffee stop and National Theater photos." },
        { title: "2 Days", text: "Add BINAES, nearby museums or a guided city walk with a food stop." },
        { title: "Weekend", text: "Combine the Historic Center with San Benito, museums or a route toward Surf City." }
      ]
    },
    tips: ["Visit during daytime", "Stay aware of crowds", "Use comfortable shoes", "Plan parking before arriving"],
    accessDetails: [
      { category: "Mobility", title: "Wheelchair Route", text: "Many renovated plazas and central sidewalks are easier to access.", status: "Available", icon: "fa-wheelchair", evidence: "Older sidewalks and crowded streets may still vary." },
      { category: "Mobility", title: "Walking Distance", text: "Main landmarks are close together, but visitors should plan breaks between stops.", status: "Available", icon: "fa-person-walking", evidence: "Useful for short cultural walking routes." },
      { category: "Arrival", title: "Parking", text: "Parking varies by zone and should be planned before arriving.", status: "Limited", icon: "fa-square-parking", evidence: "Downtown traffic and events can affect access." },
      { category: "Facilities", title: "Restrooms", text: "Restrooms are available in museums, cafes and restaurants.", status: "Available", icon: "fa-restroom", evidence: "Accessible restroom details depend on each building." },
      { category: "Communication", title: "Sign Language Video", text: "A sign language video guide is available in the destination gallery.", status: "Available", icon: "fa-hands", evidence: "The Historic Center carousel includes an uploaded sign language video." },
      { category: "Communication", title: "Voice Assistant", text: "The voice assistant can read page content and help users navigate with spoken commands.", status: "Available", icon: "fa-microphone-lines", evidence: "Enable the assistant prompt or say read page." },
      { category: "Support", title: "City Guides", text: "City guides can support planned routes through main landmarks.", status: "Available", icon: "fa-hands-helping", evidence: "Recommended for first-time visitors." },
      { category: "Sensory", title: "Crowds and Events", text: "Crowds can be high during events, weekends and busy downtown hours.", status: "Ask First", icon: "fa-users", evidence: "Check local event schedules before visiting." }
    ]
  },
  "imposible": {
    name: "El Imposible National Park",
    location: "Ahuachapan, El Salvador",
    summary: "One of the most important natural reserves in El Salvador, ideal for wildlife and hiking.",
    overview: "El Imposible National Park is a protected rainforest area known for biodiversity, trails, viewpoints and nature experiences for adventurous travelers.",
    locationText: "Located in Ahuachapan, the park requires planned transportation and guide coordination for the best experience.",
        map: {
      lat: 13.8309,
      lng: -89.9589,
      query: "Parque Nacional El Imposible, El Salvador",
      facts: [
        { title: "Nearest City", text: "Ahuachapan is the main nearby city for planning supplies and transport.", icon: "fa-city" },
        { title: "Main Access", text: "Coordinate the route with park information, guides or MARN contacts before traveling.", icon: "fa-road" },
        { title: "Parking", text: "Parking and access points depend on the trail or sector selected for the visit.", icon: "fa-square-parking" },
        { title: "Arrival Tip", text: "Confirm permits, trail conditions and guide support before starting the trip.", icon: "fa-clock" }
      ]
    },
    route: {
      origin: "San Salvador or Ahuachapan",
      destination: "El Imposible National Park access",
      estimate: "2 hr 30 min to 3 hr from San Salvador / 1 hr from Ahuachapan",
      transport: "Private car, guide transport or arranged nature tour",
      accessNote: "Confirm permits, trail conditions and guide support before traveling because routes can be demanding.",
      stops: ["San Salvador", "Ahuachapan", "Park access point", "Selected trail"]
    },
    heroImage: "https://guanacos.com/wp-content/uploads/2024/01/GUANACOS-PARQUE-NACIONAL-EL-IMPOSIBLE-2-1024x555.jpg",
    gallery: [
      {
        type: "image",
        src: "https://guanacos.com/wp-content/uploads/2024/01/GUANACOS-PARQUE-NACIONAL-EL-IMPOSIBLE-2-1024x555.jpg",
        alt: "El Imposible National Park mountain landscape",
        title: "El Imposible National Park",
        description: "Protected forest and mountain scenery"
      },
      {
        type: "video",
        src: "videos/destinations/Rachael - Impossible park.mp4",
        title: "El Imposible Sign Language Guide",
        alt: "Sign language video guide for El Imposible National Park",
        poster: "https://guanacos.com/wp-content/uploads/2024/01/GUANACOS-PARQUE-NACIONAL-EL-IMPOSIBLE-2-1024x555.jpg",
        description: "Video explanation in sign language about El Imposible National Park"
      },
      {
        type: "image",
        src: "https://i0.wp.com/www.explorelsalvador.com/wp-content/uploads/2017/11/El-Imposible-%C2%A9-Explore-El-Salvador.jpg?fit=5075%2C3397&ssl=1",
        alt: "Hikers in El Imposible National Park forest",
        title: "Forest Trail",
        description: "Guided trail through dense tropical forest"
      },
      {
        type: "image",
        src: "https://online.salvadoreantours.com/wp-content/uploads/2016/05/El-Imposible-e1463584161769.jpeg",
        alt: "Trail inside El Imposible National Park",
        title: "Nature Path",
        description: "Green route for nature visitors"
      },
      {
        type: "image",
        src: "https://photos.smugmug.com/El-Sal/El-Salvador/i-W5xtR7m/0/L/DSC_6327-L.jpg",
        alt: "Mountain view in El Imposible National Park",
        title: "Mountain Viewpoint",
        description: "Rugged forested mountains in Ahuachapan"
      }
    ],
        practicalInfo: [
      { title: "Opening Hours", text: "Official tourism information lists the park as open 24 hours/day, but visits and permits should be coordinated before traveling.", icon: "fa-clock" },
      { title: "Entry Fee", text: "Reference fees are $3 for nationals and $6 for foreigners; camping fees are also listed separately.", icon: "fa-ticket" },
      { title: "Best Time", text: "Dry season mornings are best for trails, viewpoints and river areas.", icon: "fa-sun" },
      { title: "Visit Duration", text: "Plan a full day for trails, or overnight only with prior camping or cabin arrangements.", icon: "fa-hourglass-half" },
      { title: "Difficulty", text: "Moderate to difficult, depending on trail length, weather and river conditions.", icon: "fa-person-hiking" },
      { title: "How to Get There", text: "Travel to Ahuachapan and coordinate access through park information, guides or MARN contacts.", icon: "fa-car" },
      { title: "Accessibility Note", text: "Trails are natural, uneven and generally not wheelchair accessible.", icon: "fa-wheelchair" },
      { title: "Safety Tip", text: "Go with a guide, carry water and insect repellent, and confirm permits or reservations in advance.", icon: "fa-shield-heart" }
    ],    highlights: [
      { title: "Biodiversity", text: "Birds, forest life and native plants.", icon: "fa-leaf" },
      { title: "Trails", text: "Nature routes with different difficulty levels.", icon: "fa-person-hiking" },
      { title: "Waterfalls", text: "Natural scenery during guided visits.", icon: "fa-water" },
      { title: "Viewpoints", text: "Forest and mountain landscapes.", icon: "fa-mountain-sun" }
    ],
    todo: ["Hike with a certified guide", "Observe wildlife", "Take nature photos", "Visit scenic viewpoints"],
    localExperience: {
      food: "Plan meals before entering the park and add nearby Ahuachapan or Ruta de Las Flores for coffee, yucca dishes and local food after the hike.",
      culture: "El Imposible connects nature and history through biodiversity, rivers and archaeological traces such as Piedra Sellada.",
      localTip: "This is not a casual stop: confirm guide support, permits, trail conditions and water needs before traveling.",
      routes: [
        { title: "1 Day", text: "Early guided trail, viewpoint or river stop, return before dark." },
        { title: "2 Days", text: "Add a slower nature route, Ahuachapan food stop and rest after hiking." },
        { title: "Weekend", text: "Combine El Imposible with Ruta de Las Flores towns, coffee, crafts and local gastronomy." }
      ]
    },
    tips: ["Go with a guide", "Wear hiking boots", "Bring insect repellent", "Carry enough water"],
    accessDetails: [
      { category: "Mobility", title: "Wheelchair Route", text: "Natural trails are steep, uneven and generally not wheelchair accessible.", status: "Not Available", icon: "fa-wheelchair", evidence: "Protected forest terrain includes slopes, dirt paths and river areas." },
      { category: "Mobility", title: "Trail Difficulty", text: "Hiking difficulty can be moderate to difficult depending on the selected trail.", status: "Limited", icon: "fa-person-hiking", evidence: "Choose routes according to stamina, weather and guide advice." },
      { category: "Arrival", title: "Parking", text: "Parking is available near access areas, depending on the selected sector.", status: "Available", icon: "fa-square-parking", evidence: "Confirm the exact access point before traveling." },
      { category: "Facilities", title: "Restrooms", text: "Basic facilities are limited and may not be close to all trails.", status: "Limited", icon: "fa-restroom", evidence: "Prepare before entering longer routes." },
      { category: "Communication", title: "Sign Language Video", text: "A sign language video guide is available in the destination gallery.", status: "Available", icon: "fa-hands", evidence: "The El Imposible carousel includes an uploaded sign language video." },
      { category: "Communication", title: "Voice Assistant", text: "The voice assistant can read page content and help users navigate with spoken commands.", status: "Available", icon: "fa-microphone-lines", evidence: "Enable the assistant prompt or say read page." },
      { category: "Support", title: "Guided Assistance", text: "Guides are strongly recommended for route safety and orientation.", status: "Available", icon: "fa-hands-helping", evidence: "Natural protected areas require careful route planning." },
      { category: "Safety", title: "Emergency Planning", text: "Visitors should confirm permits, trail conditions and emergency support before arrival.", status: "Ask First", icon: "fa-kit-medical", evidence: "Signal, weather and route conditions can vary." }
    ]
  }
};

const destinationReviews = {
  "santa-ana": [
    {
      name: "Daniel Martinez",
      initials: "DM",
      destination: "Santa Ana Volcano",
      rating: 4.8,
      date: "June 2026",
      comment: "The early route advice was accurate, and the guide recommendation made the hike feel safer."
    },
    {
      name: "Sofia Hernandez",
      initials: "SH",
      destination: "Santa Ana Volcano",
      rating: 4.6,
      date: "May 2026",
      comment: "Beautiful crater views. The accessibility checklist helped us understand the walking difficulty before going."
    }
  ],
  coatepeque: [
    {
      name: "Maria Lopez",
      initials: "ML",
      destination: "Lake Coatepeque",
      rating: 5.0,
      date: "June 2026",
      comment: "The route details and accessibility notes helped us plan a calm family day by the lake."
    },
    {
      name: "Carlos Mejia",
      initials: "CM",
      destination: "Lake Coatepeque",
      rating: 4.9,
      date: "May 2026",
      comment: "Knowing to choose the restaurant and parking before leaving made the visit much easier."
    }
  ],
  "el-tunco": [
    {
      name: "Ana Perez",
      initials: "AP",
      destination: "El Tunco Beach",
      rating: 4.7,
      date: "April 2026",
      comment: "I liked knowing the parking and restroom details before arriving, especially near sunset."
    },
    {
      name: "Kevin Morales",
      initials: "KM",
      destination: "El Tunco Beach",
      rating: 4.8,
      date: "June 2026",
      comment: "The beach was lively, and the notes about rocky access were helpful for planning shoes and timing."
    }
  ],
  suchitoto: [
    {
      name: "Jose Rivera",
      initials: "JR",
      destination: "Suchitoto",
      rating: 4.8,
      date: "May 2026",
      comment: "The guide suggestions made the colonial walk easier and more enjoyable."
    },
    {
      name: "Lucia Gomez",
      initials: "LG",
      destination: "Suchitoto",
      rating: 4.9,
      date: "June 2026",
      comment: "The route notes about cobblestone streets helped us keep the visit comfortable."
    }
  ],
  "historic-center": [
    {
      name: "Andrea Castillo",
      initials: "AC",
      destination: "Historic Center",
      rating: 4.7,
      date: "May 2026",
      comment: "The main plazas were easy to follow, and the safety notes helped us choose the right time to visit."
    },
    {
      name: "Miguel Torres",
      initials: "MT",
      destination: "Historic Center",
      rating: 4.6,
      date: "April 2026",
      comment: "Good cultural route for a short city visit. The parking warning was useful."
    }
  ],
  imposible: [
    {
      name: "Paola Rivas",
      initials: "PR",
      destination: "El Imposible National Park",
      rating: 4.8,
      date: "June 2026",
      comment: "The guide and permit reminders were important. This is a destination that needs planning."
    },
    {
      name: "Ernesto Diaz",
      initials: "ED",
      destination: "El Imposible National Park",
      rating: 4.7,
      date: "May 2026",
      comment: "Amazing nature route. The accessibility information helped set realistic expectations."
    }
  ]
};

const data = destinations[place] || destinations.coatepeque;

const nameEl = document.getElementById("placeName");
const locationEl = document.getElementById("placeLocation");
const summaryEl = document.getElementById("summary");
const overviewEl = document.getElementById("overviewText");
const highlightsEl = document.getElementById("highlights");
const localExperienceEl = document.getElementById("localExperience");
const tipsEl = document.getElementById("tipsList");
const accessEl = document.getElementById("accessText");
const accessSummaryEl = document.getElementById("accessibilitySummary");
const galleryEl = document.getElementById("placeGallery");
const locationTextEl = document.getElementById("locationText");
const locationMapEl = document.getElementById("locationMap");
const locationQuickFactsEl = document.getElementById("locationQuickFacts");
const locationMapsLinkEl = document.getElementById("locationMapsLink");
const routeVisualEl = document.getElementById("routeVisual");
const practicalInfoEl = document.getElementById("practicalInfo");
const destinationReviewsEl = document.getElementById("destinationReviews");
const crumbEl = document.getElementById("crumb");

function renderStackList(container, items, iconClass) {
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "stack-item";
    div.innerHTML = `<i class="fa-solid ${iconClass}"></i><span>${item}</span>`;
    container.appendChild(div);
  });
}

function renderHighlights(items) {
  if (!highlightsEl) return;
  highlightsEl.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("article");
    div.className = "feature-item";
    div.innerHTML = `
      <span class="feature-icon"><i class="fa-solid ${item.icon}"></i></span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `;
    highlightsEl.appendChild(div);
  });
}

let galleryIndex = 0;
let galleryImages = [];

function updateGalleryCarousel() {
  if (!galleryEl) return;
  const track = galleryEl.querySelector(".gallery-track");
  const dots = galleryEl.querySelectorAll(".gallery-dot");
  const slides = galleryEl.querySelectorAll(".gallery-slide");

  if (track) {
    track.style.transform = `translateX(-${galleryIndex * 100}%)`;
  }

  dots.forEach((dot, index) => {
    const isActive = index === galleryIndex;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });

  slides.forEach((slide, index) => {
    const isActive = index === galleryIndex;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", isActive ? "false" : "true");

    const video = slide.querySelector("video");
    if (!video) return;

    if (isActive) {
      video.muted = true;
      video.setAttribute("muted", "");
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
      return;
    }

    video.pause();
  });
}

function setupGalleryCarousel() {
  if (!galleryEl || galleryImages.length === 0) return;

  const goToSlide = (index) => {
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    updateGalleryCarousel();
  };

  galleryEl.querySelector(".carousel-btn.prev")?.addEventListener("click", () => goToSlide(galleryIndex - 1));
  galleryEl.querySelector(".carousel-btn.next")?.addEventListener("click", () => goToSlide(galleryIndex + 1));

  galleryEl.querySelectorAll(".gallery-dot").forEach((dot) => {
    dot.addEventListener("click", () => goToSlide(Number(dot.dataset.slide)));
  });

  galleryEl.querySelector(".gallery-carousel")?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goToSlide(galleryIndex - 1);
    if (event.key === "ArrowRight") goToSlide(galleryIndex + 1);
  });

  updateGalleryCarousel();
}

function getYouTubeEmbedUrl(src) {
  try {
    const url = new URL(src, window.location.href);
    if (url.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}`;
    }
    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (error) {
    return src;
  }
  return src;
}

function normalizeGalleryMedia(media, index) {
  const item = typeof media === "string" ? { src: media } : { ...media };
  const src = item.src || "";
  const cleanSrc = src.split("?")[0].toLowerCase();
  const isLocalVideo = /\.(mp4|webm|ogg)$/.test(cleanSrc);
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isVimeo = src.includes("vimeo.com");

  if (!item.type) {
    item.type = isLocalVideo ? "video" : isYouTube || isVimeo ? "embed" : "image";
  }

  if (item.type === "embed" && isYouTube) {
    item.src = getYouTubeEmbedUrl(src);
  }

  item.title = item.title || data.name;
  item.description = item.description || `${item.type === "image" ? "Photo" : "Video"} ${index + 1} of ${data.name}`;
  item.alt = item.alt || `${data.name} ${item.type === "image" ? "photo" : "video"} ${index + 1}`;

  return item;
}

function renderGallery(images) {
  if (!galleryEl) return;

  const sourceMedia = images && images.length ? images : sharedGallery;
  galleryImages = sourceMedia.map((media, index) => normalizeGalleryMedia(media, index));
  galleryIndex = 0;

  galleryEl.innerHTML = `
    <div class="gallery-carousel" tabindex="0" aria-roledescription="carousel" aria-label="Photos and videos of ${data.name}">
      <button class="carousel-btn prev" type="button" aria-label="Previous media">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div class="gallery-track">
        ${galleryImages.map((media, index) => {
          if (media.type === "embed") {
            return `
              <article class="gallery-slide video-slide" aria-label="Video ${index + 1} of ${galleryImages.length}: ${media.title}">
                <iframe src="${media.src}"
                        title="${media.title}"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                <div class="gallery-caption">
                  <div>
                    <strong>${media.title}</strong>
                    <span>${media.description}</span>
                  </div>
                </div>
              </article>
            `;
          }

          if (media.type === "video") {
            return `
              <article class="gallery-slide video-slide" aria-label="Sign language video ${index + 1} of ${galleryImages.length}: ${media.title}">
                <video controls muted preload="metadata" playsinline ${media.poster ? `poster="${media.poster}"` : ""} aria-label="${media.alt}">
                  <source src="${media.src}" type="${media.mime || "video/mp4"}">
                  Your browser does not support the video tag.
                </video>
                <div class="gallery-caption">
                  <div>
                    <strong>${media.title}</strong>
                    <span>${media.description}</span>
                  </div>
                </div>
              </article>
            `;
          }

          return `
            <article class="gallery-slide" aria-label="Photo ${index + 1} of ${galleryImages.length}: ${media.title}">
              <img src="${media.src}" alt="${media.alt}" loading="lazy">
              <div class="gallery-caption">
                <div>
                  <strong>${media.title}</strong>
                  <span>${media.description}</span>
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
      <button class="carousel-btn next" type="button" aria-label="Next media">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="gallery-dots" aria-label="Choose a photo or video">
      ${galleryImages.map((media, index) => `
        <button class="gallery-dot" type="button" data-slide="${index}" aria-label="Show ${media.type === "image" ? "photo" : "video"} ${index + 1}: ${media.title}"></button>
      `).join("")}
    </div>
  `;

  setupGalleryCarousel();
}
function createOsmEmbedUrl(lat, lng) {
  const latSpan = 0.045;
  const lngSpan = 0.065;
  const bbox = [lng - lngSpan, lat - latSpan, lng + lngSpan, lat + latSpan]
    .map((value) => value.toFixed(5))
    .join("%2C");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(5)}%2C${lng.toFixed(5)}`;
}

function renderLocationInfo(map) {
  if (!map) return;

  if (locationMapEl) {
    locationMapEl.src = createOsmEmbedUrl(map.lat, map.lng);
    locationMapEl.title = `Map showing ${data.name}`;
  }

  if (locationQuickFactsEl) {
    locationQuickFactsEl.innerHTML = "";
    map.facts.forEach((fact) => {
      const article = document.createElement("article");
      article.className = "location-fact-card";
      article.innerHTML = `
        <span class="location-fact-icon" aria-hidden="true"><i class="fa-solid ${fact.icon}"></i></span>
        <div>
          <h3>${fact.title}</h3>
          <p>${fact.text}</p>
        </div>
      `;
      locationQuickFactsEl.appendChild(article);
    });
  }

  if (locationMapsLinkEl) {
    const query = encodeURIComponent(map.query || `${data.name}, ${data.location}`);
    locationMapsLinkEl.href = `https://www.google.com/maps/dir/?api=1&origin=San%20Salvador%2C%20El%20Salvador&destination=${query}&travelmode=driving`;
    locationMapsLinkEl.innerHTML = `<i class="fa-solid fa-route"></i> Open route in Google Maps`;
  }

  if (routeVisualEl && data.route) {
    routeVisualEl.innerHTML = `
      <div class="route-visual-header">
        <span class="route-visual-icon" aria-hidden="true"><i class="fa-solid fa-route"></i></span>
        <div>
          <p>Suggested Route</p>
          <h3>${data.route.origin} to ${data.name}</h3>
        </div>
      </div>
      <div class="route-line" aria-label="Route stops">
        ${data.route.stops.map((stop, index) => `
          <div class="route-stop">
            <span>${index + 1}</span>
            <p>${stop}</p>
          </div>
        `).join("")}
      </div>
      <div class="route-meta-grid">
        <article>
          <i class="fa-solid fa-clock" aria-hidden="true"></i>
          <div>
            <strong>Estimated Time</strong>
            <p>${data.route.estimate}</p>
          </div>
        </article>
        <article>
          <i class="fa-solid fa-car-side" aria-hidden="true"></i>
          <div>
            <strong>Best Transport</strong>
            <p>${data.route.transport}</p>
          </div>
        </article>
        <article class="route-access-note">
          <i class="fa-solid fa-universal-access" aria-hidden="true"></i>
          <div>
            <strong>Accessibility Note</strong>
            <p>${data.route.accessNote}</p>
          </div>
        </article>
      </div>
    `;
  }
}
function renderPracticalInfo(items) {
  if (!practicalInfoEl) return;

  practicalInfoEl.innerHTML = "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "practical-card";
    article.innerHTML = `
      <span class="practical-icon" aria-hidden="true"><i class="fa-solid ${item.icon}"></i></span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    `;
    practicalInfoEl.appendChild(article);
  });
}

function renderLocalExperience(experience) {
  if (!localExperienceEl || !experience) return;

  const cards = [
    { title: "Local Food Nearby", text: experience.food, icon: "fa-utensils" },
    { title: "Culture and Events", text: experience.culture, icon: "fa-masks-theater" },
    { title: "Local Recommendation", text: experience.localTip, icon: "fa-map-pin" }
  ];

  localExperienceEl.innerHTML = `
    <div class="local-context-cards">
      ${cards.map((card) => `
        <article class="local-context-card">
          <span aria-hidden="true"><i class="fa-solid ${card.icon}"></i></span>
          <div>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </div>
        </article>
      `).join("")}
    </div>
    <article class="local-route-card">
      <div class="local-route-heading">
        <span aria-hidden="true"><i class="fa-solid fa-calendar-days"></i></span>
        <div>
          <h3>Suggested Routes by Time</h3>
          <p>Choose a plan based on how much time you have.</p>
        </div>
      </div>
      <div class="local-route-options">
        ${experience.routes.map((route) => `
          <div>
            <strong>${route.title}</strong>
            <p>${route.text}</p>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderStars(rating) {
  const rounded = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return [
    ...Array(fullStars).fill('<i class="fa-solid fa-star"></i>'),
    ...(hasHalfStar ? ['<i class="fa-solid fa-star-half-stroke"></i>'] : []),
    ...Array(emptyStars).fill('<i class="fa-regular fa-star"></i>')
  ].join("");
}

function renderReviews(items) {
  if (!destinationReviewsEl) return;
  destinationReviewsEl.innerHTML = "";

  items.forEach((review) => {
    const article = document.createElement("article");
    article.className = "destination-review-card";
    article.innerHTML = `
      <div class="review-card-header">
        <span class="review-avatar" aria-hidden="true">${review.initials}</span>
        <div>
          <h3>${review.name}</h3>
          <p>${review.destination}</p>
        </div>
      </div>
      <div class="review-rating" aria-label="${review.rating} out of 5 stars">
        <span>${review.rating.toFixed(1)}</span>
        ${renderStars(review.rating)}
      </div>
      <p class="review-comment">"${review.comment}"</p>
      <time>${review.date}</time>
    `;
    destinationReviewsEl.appendChild(article);
  });
}
function getAccessibilityStatusClass(status) {
  const value = status.toLowerCase();
  if (value.includes("not") || value === "no") return "no";
  if (value.includes("limited")) return "limited";
  if (value.includes("ask")) return "ask";
  return "available";
}

function renderAccessibilitySummary(items) {
  if (!accessSummaryEl || !accessEl) return;
  accessSummaryEl.innerHTML = "";
  accessEl.innerHTML = "";

  const priorityItems = items.slice(0, 5);
  priorityItems.forEach((item) => {
    const statusClass = getAccessibilityStatusClass(item.status);
    const row = document.createElement("div");
    row.className = "access-row";
    row.innerHTML = `
      <i class="fa-solid ${item.icon}"></i>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
      <span class="badge ${statusClass}">${item.status}</span>
    `;
    accessSummaryEl.appendChild(row);
  });

  const groupedItems = items.reduce((groups, item) => {
    const category = item.category || "Accessibility";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  Object.entries(groupedItems).forEach(([category, categoryItems]) => {
    const section = document.createElement("section");
    section.className = "access-category";
    section.innerHTML = `<h3>${category}</h3>`;

    const list = document.createElement("div");
    list.className = "access-category-grid";

    categoryItems.forEach((item) => {
      const statusClass = getAccessibilityStatusClass(item.status);
      const card = document.createElement("article");
      card.className = `access-check-item ${statusClass}`;
      card.innerHTML = `
        <div class="access-check-top">
          <span class="access-check-icon" aria-hidden="true"><i class="fa-solid ${item.icon}"></i></span>
          <span class="badge ${statusClass}">${item.status}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.text}</p>
        <small><i class="fa-solid fa-clipboard-check"></i> ${item.evidence}</small>
      `;
      list.appendChild(card);
    });

    section.appendChild(list);
    accessEl.appendChild(section);
  });
}
function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-selected", item === button ? "true" : "false");
      });
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.panel === tab);
      });
    });
  });
}

function setupAccessibilityMenu() {
  const btnDropdownToggle = document.getElementById("btnDropdownToggle");
  const accessibilityMenu = document.getElementById("accessibilityMenu");
  const chkContrast = document.getElementById("chkContrast");
  const chkTextSize = document.getElementById("chkTextSize");

  if (!btnDropdownToggle || !accessibilityMenu) return;

  btnDropdownToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = accessibilityMenu.classList.toggle("show");
    btnDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    if (!accessibilityMenu.contains(event.target) && !btnDropdownToggle.contains(event.target)) {
      accessibilityMenu.classList.remove("show");
      btnDropdownToggle.setAttribute("aria-expanded", "false");
    }
  });

  chkContrast?.addEventListener("change", () => document.body.classList.toggle("high-contrast", chkContrast.checked));
  chkTextSize?.addEventListener("change", () => document.body.classList.toggle("large-text", chkTextSize.checked));
}

function setupShareButton() {
  const shareButton = document.getElementById("shareDestination");
  if (!shareButton) return;

  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: `${data.name} - Open Routes`,
      text: data.summary,
      url: window.location.href
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard?.writeText(window.location.href);
    shareButton.innerHTML = `<i class="fa-solid fa-check"></i> Link copied`;
    setTimeout(() => {
      shareButton.innerHTML = `<i class="fa-solid fa-share-nodes"></i> Share`;
    }, 1800);
  });
}

const FAVORITES_KEY = "openRoutesFavorites";
function saveFavoriteItem(item) {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  const filtered = favorites.filter((favorite) => favorite.id !== item.id);
  filtered.unshift(item);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

function getFavoriteImage() {
  const galleryImage = data.gallery?.find((item) => {
    if (typeof item === "string") return true;
    return item?.type === "image" && item.src;
  });

  return typeof galleryImage === "string" ? galleryImage : galleryImage?.src || data.heroImage;
}

function setupFavoriteButton() {
  document.getElementById("addDestinationFavorite")?.addEventListener("click", () => {
    saveFavoriteItem({
      id: `destination-${place}`,
      type: "destination",
      title: data.name,
      subtitle: data.location,
      description: data.summary,
      image: getFavoriteImage(),
      link: `destination-detail.html?place=${place}`
    });
    window.location.href = "favorites.html";
  });
}

function renderDestination() {
  document.title = `${data.name} - Open Routes`;
  document.documentElement.style.setProperty("--hero-image", `url("${data.heroImage}")`);

  nameEl.textContent = data.name;
  locationEl.textContent = data.location;
  summaryEl.textContent = data.summary;
  overviewEl.textContent = data.overview;
  locationTextEl.textContent = data.locationText;
  renderLocationInfo(data.map);
  if (crumbEl) crumbEl.textContent = data.name;

  renderHighlights(data.highlights);
  renderPracticalInfo(data.practicalInfo || []);
  renderReviews(destinationReviews[place] || destinationReviews.coatepeque);
  renderLocalExperience(data.localExperience);
  renderStackList(tipsEl, data.tips, "fa-lightbulb");
  renderAccessibilitySummary(data.accessDetails);
  renderGallery(data.gallery || sharedGallery);
}

renderDestination();
setupTabs();
setupAccessibilityMenu();
setupShareButton();
setupFavoriteButton();
// OpenRoutes detail popular tours booking protection
function getOpenRoutesUserForDetailBooking() {
  try {
    return JSON.parse(localStorage.getItem("loggedUser") || "null");
  } catch (error) {
    return null;
  }
}

function protectDetailTourBookingLinks() {
  document.querySelectorAll(".detail-popular-tours .tour-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (getOpenRoutesUserForDetailBooking()) return;
      event.preventDefault();
      localStorage.setItem("openRoutesPendingBooking", button.getAttribute("href") || "tour-detail.html");
      window.location.href = "login.html";
    });
  });
}

protectDetailTourBookingLinks();







