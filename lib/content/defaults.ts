/**
 * The exact content that was hardcoded in each component before the CMS
 * migration. Used two ways:
 *  1. Runtime fallback — if a CMS record is missing (not seeded yet, or an
 *     admin deleted it), the public site renders these values instead of
 *     breaking.
 *  2. Seed source — scripts/seed-content.ts writes these exact values into
 *     DynamoDB so the CMS-driven site is visually identical to the old
 *     hardcoded one on day one.
 *
 * Image fields hold the original /public path (no leading slash, matching
 * how each source component referenced it) — used directly when no DB
 * record exists at all, or as the error-fallback passed to resolveImageUrl
 * once a record does exist.
 */

export const siteSettingsDefaults = {
  navAboutLabel: "Über uns",
  navExperienceLabel: "Erlebnis",
  navMenuLabel: "Speisekarte",
  navGalleryLabel: "Galerie",
  navEventsLabel: "Events",
  navContactLabel: "Kontakt",
  reservationButtonLabel: "Tisch reservieren",
  logoPath: null as string | null,
}
export const siteSettingsLogoFallback = "/images/logo.png"

export const contactInfoDefaults = {
  phone: "+49 341 56113223",
  email: "Tavernagalazio@gmail.com",
  addressLine1: "Altes Dorf 16",
  addressLine2: "04349 Leipzig",
  reservationUrl: "https://reservation.dish.co/widget/hydra-56ceb440-f22d-11ec-a5b8-61d0b9e3e1b5",
}

export const heroDefaults = {
  ratingValue: "4,9",
  ratingLabel: "Bewertung",
  ratingCountLabel: "533 Google Bewertungen",
  headlinePart1: "Authentisch griechisch",
  headlineAccent: "genießen",
  headlinePart2: " in Leipzig",
  subheadline:
    "Erleben Sie die Wärme mediterraner Gastfreundschaft mit frischen Zutaten, traditionellen Rezepten und einer eleganten Atmosphäre, die Sie an die Küsten Griechenlands entführt.",
  primaryButtonLabel: "Tisch reservieren",
  secondaryButtonLabel: "Speisekarte ansehen",
  backgroundImagePath: "images/photoforevents.jpg",
}

export const aboutDefaults = {
  badgeNumber: "25+",
  badgeLabel: "Jahre Erfahrung",
  eyebrow: "Unsere Geschichte",
  heading1: "Ein Stück Griechenland",
  heading2: "im Herzen von Leipzig",
  paragraph1:
    "Seit über zwei Jahrzehnten ist Taverna Galazio Leipzigs Adresse für authentische griechische Küche. Was als Familientraum begann, ist zu einem beliebten Treffpunkt geworden, an dem mediterrane Traditionen auf deutsche Gastfreundschaft treffen.",
  paragraph2:
    "Unsere Küche ehrt Rezepte, die über Generationen weitergegeben wurden, und verwendet nur die frischesten Zutaten direkt aus Griechenland und von lokalen Märkten. Jedes Gericht erzählt eine Geschichte von sonnenverwöhnten Olivenhainen, azurblauen Meeren und der einfachen Freude, eine Mahlzeit mit seinen Liebsten zu teilen.",
  paragraph3:
    "Unter der Leitung unseres Gründers Leo laden wir Sie ein, die Wärme, die Aromen und die Gastfreundschaft zu erleben, die die griechische Kultur ausmachen. Hier sind Sie nicht nur Gast – Sie sind Familie.",
  signature: "Leo & Familie",
  imagePath: "images/food.png",
  imageAlt: "Gegrillte mediterrane Spezialitäten",
}

export const experienceDefaults = {
  eyebrow: "Das Erlebnis",
  heading1: "Warum unsere Gäste",
  heading2: "Taverna Galazio wählen",
  intro:
    "Mehr als ein Restaurant – wir bieten eine authentische Reise durch griechische Gastronomie, Kultur und Gastfreundschaft.",
}

/** iconKey is fixed at seed time and never exposed in the admin edit form. */
export const experienceFeaturesDefaults = [
  {
    iconKey: "leaf",
    title: "Frische Zutaten",
    description:
      "Handverlesene Produkte, erstklassiges Olivenöl und Kräuter direkt aus Griechenland und von lokalen Höfen.",
    sortOrder: 0,
  },
  {
    iconKey: "book-open",
    title: "Authentische Rezepte",
    description: "Traditionelle Familienrezepte, die jahrhundertealte griechische Kochtraditionen und Techniken ehren.",
    sortOrder: 1,
  },
  {
    iconKey: "sparkles",
    title: "Elegantes Ambiente",
    description: "Ein raffinierter, aber einladender Raum, der Sie an die Mittelmeerküste entführt.",
    sortOrder: 2,
  },
  {
    iconKey: "heart",
    title: "Herzliche Gastfreundschaft",
    description: "Echte griechische Philoxenia – die Liebe zu den Gästen – in jeder Begegnung und jedem Detail.",
    sortOrder: 3,
  },
]

export const menuSectionDefaults = {
  eyebrow: "Unsere Highlights",
  heading1: "Signature",
  heading2: "Griechische Gerichte",
  linkLabel: "Komplette Speisekarte",
}

export const menuCategoriesDefaults = [
  { name: "Vorspeisen", sortOrder: 0 },
  { name: "Vom Grill", sortOrder: 1 },
  { name: "Extra Karte", sortOrder: 2 },
  { name: "Aus dem Backofen", sortOrder: 3 },
]

/**
 * The homepage "Signature Dishes" grid (menu-preview.tsx / lib/menu-data.ts
 * featuredDishes) — the only menu content that's actually CMS-managed. The
 * full /speisekarte page stays the static scanned-PDF flipbook by design
 * decision, untouched by this migration.
 */
export const menuItemsDefaults = [
  {
    category: "Vorspeisen",
    name: "Pikilia Galazio Platte",
    description: "Eine Kreation aus warmen und kalten köstlichen mediterranen Vorspeisen (für 2 Personen) - Sehr zum Empfehlen!",
    price: "18,90",
    imagePath: "images/food2.png",
    sortOrder: 0,
  },
  {
    category: "Vom Grill",
    name: "Galazio Special Teller Mix 5*",
    description: "Hähnchenbrust gegrillt, Lammkotelett, Gyros, Souvlaki, Schweinefiletlende mit Tzatziki, dazu kretanische Kartoffeln",
    price: "26,90",
    imagePath: "images/food5.png",
    sortOrder: 1,
  },
  {
    category: "Extra Karte",
    name: "Moussaka",
    description: "Griechische Moussaka vereint Kartoffeln, Hackfleisch, Auberginen und Tomaten unter einer feinen Käsehaube mit cremiger Béchamelsauce",
    price: "19,90",
    imagePath: "images/food1.png",
    sortOrder: 2,
  },
  {
    category: "Aus dem Backofen",
    name: "Lammhaxe",
    description: "Traditionell griechisch im Ofen gebacken nach langjähriger Rezeptur mit Fetakäse und Kritharaki (Reisnudel)",
    price: "24,90",
    imagePath: "images/food3.png",
    sortOrder: 3,
  },
]

export const gallerySectionDefaults = {
  eyebrow: "Galerie",
  heading1: "Ein Einblick in",
  heading2: "unsere Welt",
  description:
    "Entdecken Sie das Ambiente, die Küche und die Momente, die Taverna Galazio zu einem besonderen Ort für jeden Anlass machen.",
}

export const galleryImagesDefaults = [
  { imagePath: "images/ambient1.png", alt: "Restaurant Innenbereich", caption: "Elegantes Ambiente", sortOrder: 0 },
  { imagePath: "images/ambient2.jpg", alt: "Außenterrasse mit Tischen", caption: "Stilvolles Ambiente", sortOrder: 1 },
  { imagePath: "images/best.png", alt: "Frische Meeresfrüchteplatte", caption: "Frische Meeresfrüchte", sortOrder: 2 },
  { imagePath: "images/drinks.png", alt: "Erlesene coctails", caption: "Erlesene coctails", sortOrder: 3 },
  { imagePath: "images/food3.png", alt: "Spaghetti mit Meeresfrüchten", caption: "Spaghetti mit Meeresfrüchten", sortOrder: 4 },
  { imagePath: "images/food1.png", alt: "Griechischer Salat mit Feta", caption: "Essenz der griechischen Küche", sortOrder: 5 },
]

export const eventsSectionDefaults = {
  eyebrow: "Private Veranstaltungen",
  heading1: "Feiern Sie Ihre",
  heading2: "besonderen Momente",
  description:
    "Von intimen Geburtstagsessen bis hin zu großen Feiern – Taverna Galazio bietet den perfekten Rahmen für Ihre wertvollsten Anlässe. Unser engagiertes Team sorgt dafür, dass jedes Detail Ihre Erwartungen übertrifft.",
  imagePath: "images/photoforevents.jpg",
  imageAlt: "Private Dinner Veranstaltung",
  statNumber: "100+",
  statLabel: "Events pro Jahr",
  ctaLabel: "Anfrage für Events",
}

/** iconKey is fixed at seed time and never exposed in the admin edit form. */
export const eventTypesDefaults = [
  {
    iconKey: "cake",
    title: "Geburtstagsfeiern",
    description: "Machen Sie Ihren besonderen Tag unvergesslich mit griechischer Gastfreundschaft",
    sortOrder: 0,
  },
  {
    iconKey: "users",
    title: "Private Dinner",
    description: "Exklusiver Raum für intime Feiern mit bis zu 30 Gästen",
    sortOrder: 1,
  },
  {
    iconKey: "wine",
    title: "Weinverkostungen",
    description: "Entdecken Sie erlesene griechische Weine mit fachkundiger Begleitung",
    sortOrder: 2,
  },
  {
    iconKey: "briefcase",
    title: "Firmenveranstaltungen",
    description: "Professionelles Ambiente für Geschäftsessen und Meetings",
    sortOrder: 3,
  },
]

export const reviewsSectionDefaults = {
  eyebrow: "Gästebewertungen",
  heading1: "Was unsere Gäste",
  heading2: "über uns sagen",
  aggregateRating: "4,9",
  aggregateCount: "423 Bewertungen",
  ctaLabel: "Alle Bewertungen auf Google lesen",
}

export const reviewsDefaults = [
  {
    author: "Ester-katerina M.",
    text: "The best restaurant!! The food was perfect!! The best in town!! The atmosphere beautiful music and calm. Leo the owner of Galazio very friendly guy!! I will go there every time I go in Germany!! Keep going guys! You are the best! Danke Leo!",
    source: "Google",
    date: "Mai 2025",
    rating: 5,
    sortOrder: 0,
  },
  {
    author: "Thomas K.",
    text: "Wunderbares Essen und fantastischer Service! Das Lamm war perfekt zubereitet und die Atmosphäre war genau richtig für einen romantischen Abend. Wir kommen definitiv wieder!",
    source: "Google",
    date: "April 2025",
    rating: 5,
    sortOrder: 1,
  },
  {
    author: "Maria S.",
    text: "Ein Stück Griechenland mitten in Leipzig. Die Qualität der Zutaten schmeckt man in jedem Bissen. Besonders der Oktopus ist ein Gedicht!",
    source: "Google",
    date: "März 2025",
    rating: 5,
    sortOrder: 2,
  },
]

export const contactSectionDefaults = {
  eyebrow: "Besuchen Sie uns",
  heading1: "Finden Sie den Weg zur",
  heading2: "Taverna Galazio",
  addressLabel: "Adresse",
  routePlanLabel: "Route planen →",
  phoneLabel: "Telefon",
  emailLabel: "E-Mail",
  hoursLabel: "Öffnungszeiten",
  parkingLabel: "Kostenlose Parkplätze",
  accessibleLabel: "Barrierefrei",
  callNowButtonLabel: "Jetzt anrufen",
  openMapsButtonLabel: "In Maps öffnen",
}

export const reservationCtaDefaults = {
  heading1: "Bereit für ein authentisch",
  heading2: "griechisches Erlebnis?",
  description:
    "Erleben Sie einen unvergesslichen Abend mit mediterranen Aromen, herzlicher Gastfreundschaft und elegantem Ambiente. Reservieren Sie noch heute Ihren Tisch.",
  buttonLabel: "Online buchen",
  phoneButtonLabelMobile: "Anrufen",
  note: "Für Gruppen ab 8 Personen rufen Sie uns bitte direkt an",
}

export const footerDefaults = {
  brandName: "Taverna Galazio",
  brandSubtitle: "bei Leo",
  description: "Authentische griechische Küche im Herzen von Leipzig. Erleben Sie mediterrane Gastfreundschaft vom Feinsten.",
  quickLinksHeading: "Schnellzugriff",
  contactHeading: "Kontakt",
  hoursHeading: "Öffnungszeiten",
  quickLinkAboutLabel: "Über uns",
  quickLinkMenuLabel: "Speisekarte",
  quickLinkGalleryLabel: "Galerie",
  quickLinkEventsLabel: "Private Events",
  quickLinkReservationLabel: "Reservierung",
  quickLinkContactLabel: "Kontakt",
  legalImpressumLabel: "Impressum",
  legalDatenschutzLabel: "Datenschutz",
  legalCookieLabel: "Cookie Einstellungen",
  developerCreditText: "Clearline Tech",
  copyrightText: "Taverna Galazio bei Leo. Alle Rechte vorbehalten.",
}
