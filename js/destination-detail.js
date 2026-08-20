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
    tips: ["Wear comfortable hiking shoes", "Bring water and sunscreen", "Go early in the morning", "Check weather conditions before leaving"],
    accessDetails: [
      { title: "Wheelchair Access", text: "The summit trail is not wheelchair accessible.", status: "Limited", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking is available near the park entrance.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Basic facilities are available near access points.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Guides are recommended for support.", status: "Yes", icon: "fa-hands-helping" }
    ]
  },
  "coatepeque": {
    name: "Lake Coatepeque",
    location: "Santa Ana, El Salvador",
    summary: "Enjoy the breathtaking beauty of Lake Coatepeque, one of the most stunning lakes in El Salvador. Perfect for relaxation, nature and accessible experiences for everyone.",
    overview: "Lake Coatepeque is a volcanic crater lake known for its deep blue waters and beautiful views. It is an ideal destination for travelers looking for a peaceful and accessible place to enjoy nature.",
    locationText: "Lake Coatepeque is located in Santa Ana, surrounded by panoramic roads, restaurants, viewpoints and lakefront activities.",
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
    tips: ["Visit during sunset", "Bring cash for small restaurants", "Ask about accessible entrances before booking", "Use sunscreen during midday"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Accessible paths and ramps available in selected areas.", status: "Yes", icon: "fa-wheelchair" },
      { title: "Parking", text: "Designated accessible parking spaces in main spots.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Accessible restrooms available in some restaurants.", status: "Yes", icon: "fa-restroom" },
      { title: "Audio Information", text: "Audio guides and descriptions can be requested.", status: "Yes", icon: "fa-volume-high" },
      { title: "Guided Assistance", text: "Staff availability depends on the place you visit.", status: "Limited", icon: "fa-hands-helping" }
    ]
  },
  "el-tunco": {
    name: "El Tunco Beach",
    location: "La Libertad, El Salvador",
    summary: "A famous surf beach with restaurants, nightlife and beautiful sunsets by the Pacific coast.",
    overview: "El Tunco is a popular beach destination known for surfing, sunsets and a lively coastal atmosphere. Travelers can enjoy food, music and ocean views in a compact walkable town.",
    locationText: "El Tunco is located in La Libertad, close to the coastal highway and other beaches along Surf City.",
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
    tips: ["Best waves are usually in the morning", "Bring sandals for rocky areas", "Weekends can be crowded", "Keep personal items close"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Town access is easier than direct sand access.", status: "Limited", icon: "fa-wheelchair" },
      { title: "Parking", text: "Public and private parking options nearby.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Available in restaurants and hotels.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Local support can be arranged ahead of time.", status: "Limited", icon: "fa-hands-helping" }
    ]
  },
  "suchitoto": {
    name: "Suchitoto",
    location: "Cuscatlan, El Salvador",
    summary: "A charming colonial town full of culture, art, history and lake views.",
    overview: "Suchitoto is one of El Salvador's most beautiful colonial towns, known for cobblestone streets, galleries, cultural spaces and views toward Lake Suchitlan.",
    locationText: "Suchitoto is located in Cuscatlan and is commonly visited as a day trip from San Salvador.",
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
    tips: ["Wear comfortable walking shoes", "Some streets are cobblestone", "Visit during cultural festivals", "Bring a light jacket for evenings"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Main plaza areas are easier to access.", status: "Limited", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking available near central areas.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Available in restaurants and public places.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Local guides can help with route planning.", status: "Yes", icon: "fa-hands-helping" }
    ]
  },
  "historic-center": {
    name: "Historic Center",
    location: "San Salvador, El Salvador",
    summary: "The cultural and political heart of the capital city, filled with landmarks and public squares.",
    overview: "The Historic Center of San Salvador features iconic landmarks such as the Metropolitan Cathedral, National Palace, National Theater and vibrant plazas.",
    locationText: "Located in downtown San Salvador, the Historic Center is connected to public transportation and city services.",
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
    tips: ["Visit during daytime", "Stay aware of crowds", "Use comfortable shoes", "Plan parking before arriving"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Many main sidewalks and plazas are accessible.", status: "Yes", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking varies by zone.", status: "Limited", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Available in museums and restaurants.", status: "Yes", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "City guides can support planned routes.", status: "Yes", icon: "fa-hands-helping" }
    ]
  },
  "imposible": {
    name: "El Imposible National Park",
    location: "Ahuachapan, El Salvador",
    summary: "One of the most important natural reserves in El Salvador, ideal for wildlife and hiking.",
    overview: "El Imposible National Park is a protected rainforest area known for biodiversity, trails, viewpoints and nature experiences for adventurous travelers.",
    locationText: "Located in Ahuachapan, the park requires planned transportation and guide coordination for the best experience.",
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
    tips: ["Go with a guide", "Wear hiking boots", "Bring insect repellent", "Carry enough water"],
    accessDetails: [
      { title: "Wheelchair Access", text: "Trails are steep and not wheelchair accessible.", status: "No", icon: "fa-wheelchair" },
      { title: "Parking", text: "Parking is available near access areas.", status: "Yes", icon: "fa-square-parking" },
      { title: "Restrooms", text: "Basic facilities are limited.", status: "Limited", icon: "fa-restroom" },
      { title: "Guided Assistance", text: "Guides are strongly recommended.", status: "Yes", icon: "fa-hands-helping" }
    ]
  }
};

const data = destinations[place] || destinations.coatepeque;

const nameEl = document.getElementById("placeName");
const locationEl = document.getElementById("placeLocation");
const summaryEl = document.getElementById("summary");
const overviewEl = document.getElementById("overviewText");
const highlightsEl = document.getElementById("highlights");
const todoEl = document.getElementById("todoList");
const tipsEl = document.getElementById("tipsList");
const accessEl = document.getElementById("accessText");
const accessSummaryEl = document.getElementById("accessibilitySummary");
const galleryEl = document.getElementById("placeGallery");
const locationTextEl = document.getElementById("locationText");
const practicalInfoEl = document.getElementById("practicalInfo");
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
function renderAccessibilitySummary(items) {
  if (!accessSummaryEl || !accessEl) return;
  accessSummaryEl.innerHTML = "";
  accessEl.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("div");
    const statusClass = item.status.toLowerCase() === "limited" ? "limited" : item.status.toLowerCase() === "no" ? "no" : "";
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

    const detail = document.createElement("div");
    detail.className = "stack-item";
    detail.innerHTML = `<i class="fa-solid ${item.icon}"></i><span><strong>${item.title}:</strong> ${item.text} (${item.status})</span>`;
    accessEl.appendChild(detail);
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

function setupFavoriteButton() {
  document.getElementById("addDestinationFavorite")?.addEventListener("click", () => {
    saveFavoriteItem({
      id: `destination-${place}`,
      type: "destination",
      title: data.name,
      subtitle: data.location,
      description: data.summary,
      image: data.gallery?.[0] || data.heroImage,
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
  if (crumbEl) crumbEl.textContent = data.name;

  renderHighlights(data.highlights);
  renderPracticalInfo(data.practicalInfo || []);
  renderStackList(todoEl, data.todo, "fa-circle-check");
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





