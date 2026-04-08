export interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  allergens?: string
  category: string
}

export interface MenuCategory {
  name: string
  nameGreek?: string
  items: MenuItem[]
}

export const mainMenu: MenuCategory[] = [
  {
    name: "Vorspeisen",
    nameGreek: "Mezedes",
    items: [
      { id: 1, name: "Tagessuppe", description: "Tomatensuppe oder Hühnersuppe (dazu Brot)", price: "5,50", allergens: "", category: "Vorspeisen" },
      { id: 2, name: "Pikilia Galazio Platte Mix", description: "Eine Kreation aus warmen und kalten köstlichen mediterranen Vorspeisen (für 2 Personen) - Sehr zum Empfehlen!", price: "18,90", allergens: "G-A-C", category: "Vorspeisen" },
      { id: 3, name: "Gigantes", description: "Dicke Bohnen mit Feta Käse überbacken", price: "8,30", allergens: "G", category: "Vorspeisen" },
      { id: 4, name: "Gegrillte Pepperoni", description: "Mit Tzatziki und Knoblauchkräutern", price: "6,90", allergens: "G", category: "Vorspeisen" },
      { id: 5, name: "Melitzana", description: "Gebratene Auberginen mit Tzatziki und Knoblauchkräutern (mehliert)", price: "8,10", allergens: "A-G-C", category: "Vorspeisen" },
      { id: 6, name: "Kolokithia", description: "Gebratene Zucchini mit Tzatziki und Knoblauchkräutern (mehliert)", price: "8,10", allergens: "A-G-C", category: "Vorspeisen" },
      { id: 7, name: "Champignons in Metaxasauce", description: "Gefüllt mit Spinat und Schnittkäse überbacken", price: "8,80", allergens: "A-G", category: "Vorspeisen" },
      { id: 8, name: "Knoblauchbrot", description: "Mit frischer hausgemachter Kräuterbutter und Knoblauch", price: "4,90", allergens: "A-G", category: "Vorspeisen" },
      { id: 9, name: "Paprika Florinis", description: "Mit Schafskäse gefüllte Spitzpaprika, ofengebacken", price: "8,50", allergens: "G", category: "Vorspeisen" },
      { id: 10, name: "Dolmadakia", description: "Gefüllte Weinblätter mit Reis in Zitronenrahmsoße", price: "7,50", allergens: "", category: "Vorspeisen" },
      { id: 11, name: "Spanakopitakia", description: "Blätterteig mit Spinat und Schafskäse gefüllt", price: "7,50", allergens: "A-G", category: "Vorspeisen" },
      { id: 12, name: "Bruschetta Speziale", description: "Mit frischen Tomaten, Knoblauch, Petersilie, Olivenöl & Käse im Ofen", price: "6,90", allergens: "G-A", category: "Vorspeisen" },
      { id: 13, name: "Baby Calamaris", description: "In Buttersauce gebraten mit Zitrone & Cherry Tomaten", price: "12,90", allergens: "G-D", category: "Vorspeisen" },
      { id: 14, name: "Octopus", description: "Gegrillter Oktopus mit Zitrone und Cherry Tomaten", price: "14,30", allergens: "G-D", category: "Vorspeisen" },
      { id: 15, name: "Sardellen", description: "Gewürzte Sardellen - eine traditionelle Spezialität aus Griechenland und sehr beliebt im Taverna", price: "8,90", allergens: "D-A-G", category: "Vorspeisen" },
      { id: 16, name: "Tzatziki", description: "Aus feinsten Zutaten: Joghurt, Gurken, Knoblauch, Olivenöl", price: "5,80", allergens: "G", category: "Vorspeisen" },
      { id: 17, name: "Oliven", description: "Verfeinert mit Olivenöl, Zwiebeln und Oregano", price: "5,90", allergens: "", category: "Vorspeisen" },
      { id: 18, name: "Kolokithokeftedes", description: "Griechische Zucchinibällchen mit Fetakäse und Tzatziki-Dip", price: "8,70", allergens: "", category: "Vorspeisen" },
      { id: 19, name: "Taramas", description: "Fischcreme Soße von Fischeier", price: "7,50", allergens: "B-C-D", category: "Vorspeisen" },
      { id: 20, name: "Dakos", description: "Kretische Spezialität mit Feta Käse, Tomaten, Oregano und Olivenöl", price: "7,50", allergens: "A-G", category: "Vorspeisen" },
      { id: 21, name: "Melitzanosalata", description: "Der legendäre kretische Auberginensalat mit Knoblauch, Zwiebeln, Olivenöl, Paprika", price: "8,90", allergens: "", category: "Vorspeisen" },
    ],
  },
  {
    name: "Käse Spezialitäten",
    nameGreek: "Eidikotites Tirion",
    items: [
      { id: 22, name: "Tirokafteri (Chtipiti)", description: "Hausgemachte Käsecreme aus Schafskäse mit frischen Kräutern", price: "8,70", allergens: "G", category: "Käse Spezialitäten" },
      { id: 23, name: "Saganaki Special", description: "Gebackener panierter Käse, griechischer Art mit Honig", price: "10,90", allergens: "G-A-K", category: "Käse Spezialitäten" },
      { id: 24, name: "Feta Furno", description: "Überbackener Käse mit Tomaten, Oliven, Peperoni und Knoblauch verfeinert", price: "10,90", allergens: "G", category: "Käse Spezialitäten" },
    ],
  },
  {
    name: "Salate",
    nameGreek: "Salates",
    items: [
      { id: 25, name: "Bauernsalat (Xoriatiki)", description: "Traditionell griechisch mit Tomaten, Gurken, Zwiebeln, Oliven, Pepperoni und Feta Käse", price: "10,90", allergens: "G", category: "Salate" },
      { id: 26, name: "Haloumi Salata", description: "Spezialität aus Zypern: Halloumikäse auf gemischtem Salat mit Rosinen, Balsamico, Honig und Walnüssen", price: "13,50", allergens: "G-H-L", category: "Salate" },
      { id: 27, name: "Gyros-Salata", description: "Gyrosfleisch auf gemischtem Salat mit hausgemachtem Dressing", price: "13,50", allergens: "J", category: "Salate" },
      { id: 28, name: "Kotosalata", description: "Hähnchenbrust auf gemischtem Salat mit hausgemachtem Dressing", price: "13,50", allergens: "A-F-G", category: "Salate" },
      { id: 29, name: "Scampi Special Salat", description: "Scampis in Ouzo gelöscht, in Butter gebraten mit Knoblauch, Cherry Tomaten, Feta Käse auf gemischtem Salat mit Walnüssen", price: "14,90", allergens: "B-H-G", category: "Salate" },
    ],
  },
  {
    name: "Für unsere kleinen Helden",
    nameGreek: "Mono gia tous mikrous mas Iroes",
    items: [
      { id: 30, name: "Pluto Teller", description: "Kinder Schnitzel mit Pommes Frites", price: "8,90", allergens: "A-C", category: "Für unsere kleinen Helden" },
      { id: 31, name: "Nemo & Dory Teller", description: "Fischstäbchen mit Pommes Frites", price: "8,90", allergens: "", category: "Für unsere kleinen Helden" },
      { id: 32, name: "Tom & Jerry Teller", description: "Penne mit Tomatensauce und Schnittkäse", price: "8,90", allergens: "A-G", category: "Für unsere kleinen Helden" },
      { id: 33, name: "Micky Maus Teller", description: "Kinder Gyros mit Pommes Frites", price: "8,90", allergens: "", category: "Für unsere kleinen Helden" },
      { id: 34, name: "Paw Patrol Teller", description: "1x Fleischspieß mit Pommes Frites", price: "8,90", allergens: "", category: "Für unsere kleinen Helden" },
    ],
  },
  {
    name: "Aus dem Backofen",
    nameGreek: "Apo ton Fourno",
    items: [
      { id: 35, name: "Andros Pfanne", description: "Hähnchenfiletspitzen in der Pfanne gebraten und Penne in Metaxasauce mit Schnittkäse überbacken", price: "18,50", allergens: "G-A", category: "Aus dem Backofen" },
      { id: 36, name: "Brokkoli Pfanne", description: "Vegetarisch - Brokkoli mit Metaxasoße und Schnittkäse überbacken", price: "17,40", allergens: "G", category: "Aus dem Backofen" },
      { id: 37, name: "Gyros Special", description: "Gyros vom Drehspieß mit Metaxasauce, Feta Käse und Schnittkäse überbacken, dazu kretanische Kartoffeln", price: "19,70", allergens: "G", category: "Aus dem Backofen" },
      { id: 38, name: "Kota Fourno", description: "Hähnchenbrust mit Metaxasoße und Käse überbacken, dazu kretanische Kartoffeln", price: "19,50", allergens: "", category: "Aus dem Backofen" },
      { id: 39, name: "Souvlaki Furno", description: "Zwei marinierte Fleischspieße mit Metaxasoße und Käse überbacken, dazu Pommes", price: "19,50", allergens: "A-G", category: "Aus dem Backofen" },
      { id: 40, name: "Bifteki Überbacken", description: "Hacksteak gefüllt (Schwein und Kalb) mit Schafskäse, Schnittkäse überbacken mit Metaxasauce, dazu kretanische Kartoffeln", price: "20,90", allergens: "A", category: "Aus dem Backofen" },
      { id: 41, name: "Lammhaxe", description: "Traditionell griechisch im Ofen gebacken nach langjähriger Rezeptur mit Fetakäse und Kritharaki (Reisnudel)", price: "24,90", allergens: "G-A", category: "Aus dem Backofen" },
      { id: 42, name: "Santorini Pfanne", description: "Gyros mit Penne in Metaxasoße mit Fetakäse und Schnittkäse überbacken", price: "18,90", allergens: "G-A", category: "Aus dem Backofen" },
      { id: 43, name: "Scampi Pfanne", description: "Scampi gelöscht in Weißwein, in Butter gebraten mit Knoblauch, Paprika, Champignons und Cherry Tomaten mit Fetakäse, dazu kretanische Kartoffeln", price: "22,90", allergens: "B-H", category: "Aus dem Backofen" },
    ],
  },
  {
    name: "Vom Grill",
    nameGreek: "Apo tin Sxara",
    items: [
      { id: 44, name: "Paidakia (Lammkoteletts)", description: "Gegrillte Lammkoteletts mit Tzatziki und frischer Zitrone, dazu kretanische Kartoffeln und grüne Bohnen", price: "24,90", allergens: "G-A", category: "Vom Grill" },
      { id: 45, name: "Gyros Calamaris (Bayerischer Teller)", description: "Gyros vom Drehspieß mit Calamaris und Tzatziki, dazu kretanische Kartoffeln", price: "19,90", allergens: "G-C-A-D", category: "Vom Grill" },
      { id: 46, name: "Kreta Mix", description: "Gyros vom Spieß, marinierter Fleischspieß, Hacksteak und gegrillte Rinderleber mit Tzatziki, dazu kretanische Kartoffeln", price: "20,90", allergens: "G-A-J", category: "Vom Grill" },
      { id: 47, name: "Gyros aus Larissa", description: "Spezialität des Hauses - Gyros vom Drehspieß mit Tzatziki, dazu kretanische Kartoffeln", price: "16,50", allergens: "G", category: "Vom Grill" },
      { id: 48, name: "Souvlaki", description: "Zwei marinierte Fleischspieße mit Tzatziki, dazu kretanische Kartoffeln", price: "18,80", allergens: "G", category: "Vom Grill" },
      { id: 49, name: "Rinderleber", description: "Zart gegrillte Rinderleber mit gebratenen Zwiebeln in Tomatensauce und Apfelring garniert, dazu kretanische Kartoffeln", price: "17,10", allergens: "", category: "Vom Grill" },
      { id: 50, name: "Souzoukakia", description: "Saftig gegrillte Hacksteaks in Metaxasauce mit Käse überbacken, dazu kretanische Kartoffeln", price: "18,90", allergens: "A-G-J", category: "Vom Grill" },
      { id: 51, name: "Bifteki", description: "Gegrilltes Hacksteak (Schwein und Kalb) gefüllt mit Schafskäse und Schnittkäse, dazu kretanische Kartoffeln", price: "19,90", allergens: "G-J", category: "Vom Grill" },
      { id: 52, name: "Hähnchenbrust Gegrillt", description: "Saftig gegrillt mit Zitrone und Kräuterbutter, dazu kretanische Kartoffeln", price: "18,50", allergens: "A-F-G", category: "Vom Grill" },
      { id: 53, name: "Kleopatra Teller", description: "Gegrillte Rinderleber, Schweinefiletlende, Hähnchenbrust mit Tzatziki, dazu kretanische Kartoffeln", price: "19,90", allergens: "M-G", category: "Vom Grill" },
      { id: 54, name: "Schweinelende Metaxa", description: "Zart gegrillte Schweinefiletlende mit Metaxasauce, dazu kretanische Kartoffeln", price: "19,90", allergens: "A-G-E", category: "Vom Grill" },
      { id: 55, name: "Thessaloniki Mix", description: "Schweinesteak, Rinderleber, Gyros vom Drehspieß, dazu kretanische Kartoffeln", price: "19,90", allergens: "A-G", category: "Vom Grill" },
      { id: 56, name: "Korfu Mix", description: "Gegrilltes Schweinesteak, Gyros vom Spieß & Fleischspieße mit Tzatziki, dazu kretanische Kartoffeln", price: "19,90", allergens: "G-J", category: "Vom Grill" },
      { id: 57, name: "Galazio Special Teller Mix 5*", description: "Hähnchenbrust gegrillt, Lammkotelett, Gyros, Souvlaki, Schweinefiletlende mit Tzatziki, dazu kretanische Kartoffeln", price: "26,90", allergens: "G-A-J-F", category: "Vom Grill" },
      { id: 58, name: "Gyros A LA Chef", description: "Gyros mit Rucola, Zwiebeln, Fetakäse, Olivenöl, Paprika, Tomaten, dazu kretanische Kartoffeln", price: "19,90", allergens: "G", category: "Vom Grill" },
      { id: 59, name: "Lammfilet Grill", description: "Saftig gegrillt mit Kräuterbutter und frischer Zitrone, Tzatziki, dazu Kartoffeln mit Knoblauchkräutern", price: "25,90", allergens: "G", category: "Vom Grill" },
      { id: 60, name: "Kotopoulo Gemisto", description: "Gefülltes Hähnchenbrustfilet mit Spinat und Schnittkäse in Metaxasoße überbacken, dazu kretanische Kartoffeln", price: "20,50", allergens: "G-A", category: "Vom Grill" },
      { id: 61, name: "Souvla Meteora (Chef Lieblingsessen)", description: "Hauchdünne Schweinefleischröllchen gefüllt mit Schafskäse auf Spieß mit Paprika, Zwiebeln, Metaxasoße und Käse überbacken, dazu kretanische Kartoffeln", price: "22,90", allergens: "G-A", category: "Vom Grill" },
      { id: 62, name: "Psaronefri Fileto", description: "Zart gegrillte Schweinefiletlende mit Petersilienkartoffeln und Pfeffersauce", price: "20,50", allergens: "E", category: "Vom Grill" },
    ],
  },
  {
    name: "Fisch & Meeresfrüchte",
    nameGreek: "Psaria & Thallasina",
    items: [
      { id: 63, name: "Thalassa Mix Frittierte", description: "Mehlierte Calamaris, Scampi, Sardellen, Zanderfilet, dazu Zitronenfischsoße und Gemüse", price: "26,90", allergens: "A-B-D", category: "Fisch & Meeresfrüchte" },
      { id: 64, name: "Scampi", description: "Mit Butter gebratene Scampis (Garnelen), dazu Zitronenfischsoße und Gemüse", price: "24,90", allergens: "B-D-G", category: "Fisch & Meeresfrüchte" },
      { id: 65, name: "Calamaris", description: "Calamaris mehliert und gebraten, dazu Zitronenfischsoße und Gemüse", price: "20,90", allergens: "A-D-G", category: "Fisch & Meeresfrüchte" },
      { id: 66, name: "Fischplatte", description: "Gemischte Platte mit Scampi, Calamaris, Lachsfilet, dazu Zitronenfischsoße und Gemüse", price: "23,90", allergens: "A-B-D-G", category: "Fisch & Meeresfrüchte" },
      { id: 67, name: "Zanderfilet", description: "Mit Liebe gemacht und in Butter gebratenes Zanderfilet, dazu leckere Petersilienkartoffeln", price: "19,90", allergens: "A-D-G", category: "Fisch & Meeresfrüchte" },
      { id: 68, name: "Gegrilltes Lachsfilet", description: "Lachsfilet gegrillt mit Beilage, dazu Gemüse", price: "21,90", allergens: "D-G-A", category: "Fisch & Meeresfrüchte" },
    ],
  },
  {
    name: "Nudeln",
    nameGreek: "Ta Makaronia mas",
    items: [
      { id: 69, name: "Spaghetti Hellas", description: "Spaghetti mit Oliven, Cherry Tomaten und Knoblauch in Weißwein gelöscht", price: "15,90", allergens: "G-A", category: "Nudeln" },
      { id: 70, name: "Makaronia Kotopoulo", description: "Tagliatelle mit Hähnchenfiletspitzen in Sahnesoße", price: "17,90", allergens: "G-A", category: "Nudeln" },
      { id: 71, name: "Makaronia Solomos", description: "Tagliatelle mit gebratenem Lachsfilet und frischem Spinat in Hummercremesoße", price: "18,90", allergens: "G-A-D", category: "Nudeln" },
      { id: 72, name: "Makaronia me Kima", description: "Ein beliebtes griechisches Alltagsgericht - Spaghetti mit Hackfleisch in Tomatensauce und Feta Käse", price: "18,70", allergens: "G", category: "Nudeln" },
    ],
  },
  {
    name: "Beilagen",
    nameGreek: "Sinodeftika piata",
    items: [
      { id: 73, name: "Pommes Frites", description: "Klassische Pommes Frites", price: "4,30", allergens: "A", category: "Beilagen" },
      { id: 74, name: "Kretanische Kartoffeln", description: "Mit Knoblauch gratiniert", price: "4,50", allergens: "A", category: "Beilagen" },
      { id: 75, name: "Pita", description: "Fladenbrot", price: "4,10", allergens: "A", category: "Beilagen" },
      { id: 76, name: "Tomatenreis", description: "Aromatischer Tomatenreis", price: "4,30", allergens: "", category: "Beilagen" },
      { id: 77, name: "Gemüse Mix", description: "Gemischtes Gemüse", price: "4,50", allergens: "", category: "Beilagen" },
      { id: 78, name: "Metaxasoße", description: "Hausgemachte Metaxasoße", price: "4,90", allergens: "G", category: "Beilagen" },
      { id: 79, name: "Butter Reis", description: "Butterreis", price: "4,30", allergens: "", category: "Beilagen" },
      { id: 84, name: "Kritharaki", description: "Reisnudel", price: "4,30", allergens: "", category: "Beilagen" },
    ],
  },
]

export const extraMenu: MenuCategory[] = [
  {
    name: "Extra Karte",
    nameGreek: "Extra Karte",
    items: [
      { id: 85, name: "Tiganito Gavro", description: "Frittierter Gavro Fisch mit Zitrone", price: "8,90", allergens: "G-D", category: "Extra Karte" },
      { id: 86, name: "Mydia Fourno", description: "Muscheln im Ofen mit Cherry Tomaten, Knoblauch, Peperoni und Feta Käse überbacken", price: "11,90", allergens: "D-N-G", category: "Extra Karte" },
      { id: 87, name: "Mydia Achnista", description: "Zart gedämpfte Miesmuscheln in einem Sud aus Weißwein, Knoblauch und Bukovo (Paprikakerne pikant)", price: "14,90", allergens: "D-N-B-I", category: "Extra Karte" },
      { id: 88, name: "Soutzouki Fourno", description: "Hacksteak mit Fetakäse überbacken in Tomatensauce und Kritharaki (Reisnudel)", price: "18,50", allergens: "G-J", category: "Extra Karte" },
      { id: 89, name: "Moussaka", description: "Griechische Moussaka vereint Kartoffeln, Hackfleisch, Auberginen und Tomaten unter einer feinen Käsehaube mit cremiger Béchamelsauce", price: "19,90", allergens: "C-A-G", category: "Extra Karte" },
      { id: 90, name: "Gyros Kaftero", description: "Scharf! Gyros vom Drehspieß mit Paprika, Cherry Tomaten, Feta Käse und Bukovo (Paprikakerne pikant), dazu kretanische Kartoffeln", price: "19,70", allergens: "A-G", category: "Extra Karte" },
      { id: 91, name: "Nudel Spezial Salat", description: "Gemischter Salat mit Penne, Cherry Tomaten, Feta Käse, Zwiebeln, Oliven, Paprika und Mayonnaise Sauce", price: "14,90", allergens: "G-A", category: "Extra Karte" },
    ],
  },
]

// Featured dishes for the preview section
export const featuredDishes = [
  {
    id: 2,
    name: "Pikilia Galazio Platte",
    description: "Eine Kreation aus warmen und kalten köstlichen mediterranen Vorspeisen (für 2 Personen) - Sehr zum Empfehlen!",
    price: "18,90",
    category: "Vorspeisen",
  },
  {
    id: 57,
    name: "Galazio Special Teller Mix 5*",
    description: "Hähnchenbrust gegrillt, Lammkotelett, Gyros, Souvlaki, Schweinefiletlende mit Tzatziki, dazu kretanische Kartoffeln",
    price: "26,90",
    category: "Vom Grill",
  },
  {
    id: 89,
    name: "Moussaka",
    description: "Griechische Moussaka vereint Kartoffeln, Hackfleisch, Auberginen und Tomaten unter einer feinen Käsehaube mit cremiger Béchamelsauce",
    price: "19,90",
    category: "Extra Karte",
  },
  {
    id: 41,
    name: "Lammhaxe",
    description: "Traditionell griechisch im Ofen gebacken nach langjähriger Rezeptur mit Fetakäse und Kritharaki (Reisnudel)",
    price: "24,90",
    category: "Aus dem Backofen",
  },
]

export const allergenInfo: Record<string, string> = {
  A: "Glutenhaltig",
  B: "Krebstiere",
  C: "Eier/Eierzeugnisse",
  D: "Fisch- und Erzeugnisse",
  E: "Erdnüsse/Erzeugnisse",
  F: "Soja/Erzeugnisse",
  G: "Milch/Erzeugnisse",
  H: "Schalenobst",
  I: "Sellerie/Erzeugnisse",
  J: "Senf/Erzeugnisse",
  K: "Sesamstangen",
  L: "Schwefeloxid/Sulfide",
  M: "Lupinen",
  N: "Weichtiere",
}
