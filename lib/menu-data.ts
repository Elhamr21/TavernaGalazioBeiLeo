/**
 * Speisekarte content (source: public/menu/Taverna_Galazio_Menu.pdf).
 *
 * The /speisekarte flipbook shows pre-rendered page images
 * (public/menu/menu-page-XX.png and public/menu/extra-karte-page-XX.png)
 * generated from this data in the existing menu design. If dishes or
 * prices change here, the page images need to be regenerated.
 *
 * Allergens use the letter codes from `allergenInfo` joined with "-"
 * (e.g. "A-C-G"); additives use the numbers from `additiveInfo` (e.g. "4, 8").
 */

export interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  allergens?: string
  additives?: string
  category: string
}

export interface MenuNote {
  title: string
  text: string
}

export interface MenuCategory {
  name: string
  nameGreek?: string
  items: MenuItem[]
  notes?: MenuNote[]
}

const MIX_PLATTE_NOTE: MenuNote = {
  title: "Für jede Mix-Platte",
  text: "Unsere Küche empfiehlt Ihnen gerne dazu Metaxasauce mit Käse überbacken für 6,20 €.",
}

export const mainMenu: MenuCategory[] = [
  {
    name: "Vorspeisen",
    nameGreek: "Mezedes",
    items: [
      { id: 1, name: "Tagessuppe", description: "Tomatensuppe oder Hühnersuppe, dazu Brot.", price: "5,50", allergens: "A-I", category: "Vorspeisen" },
      { id: 2, name: "Pikilia Galazio Platte", description: "Sehr zu empfehlen! Mix für 2 Personen: eine Kreation aus warmen und kalten mediterranen Vorspeisen.", price: "22,00", allergens: "A-C-G", category: "Vorspeisen" },
      { id: 3, name: "Gigantes", description: "Dicke Bohnen, mit Fetakäse überbacken.", price: "8,90", allergens: "G", category: "Vorspeisen" },
      { id: 4, name: "Gegrillte Peperoni", description: "Mit Tzatziki, Knoblauch und Kräutern.", price: "7,40", allergens: "G-H", category: "Vorspeisen" },
      { id: 5, name: "Melitzana (mehliert)", description: "Gebratene Auberginen mit Tzatziki, Knoblauch und Kräutern.", price: "8,90", allergens: "A-C-G-H", category: "Vorspeisen" },
      { id: 6, name: "Kolokithia (mehliert)", description: "Gebratene Zucchini mit Tzatziki, Knoblauch und Kräutern.", price: "8,90", allergens: "A-C-G-H", category: "Vorspeisen" },
      { id: 7, name: "Champignons in Metaxasauce", description: "Mit Fetakäse gefüllt und mit Käse überbacken.", price: "10,00", allergens: "A-G", category: "Vorspeisen" },
      { id: 8, name: "Knoblauchbrot", description: "Mit hausgemachter Kräuterbutter und frischem Knoblauch.", price: "5,30", allergens: "A-G", category: "Vorspeisen" },
      { id: 9, name: "Paprika Florinis", description: "Mit Schafskäse gefüllte Spitzpaprika, im Ofen gebacken.", price: "9,00", allergens: "G", category: "Vorspeisen" },
      { id: 10, name: "Dolmadakia", description: "Gefüllte Weinblätter mit Reis in Zitronenrahmsauce.", price: "8,50", allergens: "A-G", category: "Vorspeisen" },
      { id: 11, name: "Spanakopitakia", description: "Blätterteig mit Spinat und Schafskäse gefüllt.", price: "8,50", allergens: "A-C-G", category: "Vorspeisen" },
      { id: 12, name: "Bruschetta Speciale", description: "Mit frischen Tomaten, Knoblauch, Petersilie, Olivenöl und Käse, im Ofen überbacken.", price: "7,50", allergens: "A-G", category: "Vorspeisen" },
      { id: 13, name: "Baby-Calamari", description: "In Buttersauce gebraten, mit Zitrone und Cherrytomaten.", price: "14,00", allergens: "G-N", category: "Vorspeisen" },
      { id: 14, name: "Oktopus", description: "Gebratener Oktopus mit Zitrone und Cherrytomaten.", price: "15,00", allergens: "N", category: "Vorspeisen" },
      { id: 15, name: "Hummus Kichererbsen", description: "Feine Kichererbsencreme, serviert mit Zwiebeln und nativem Olivenöl.", price: "9,00", allergens: "E-I", category: "Vorspeisen" },
      { id: 16, name: "Tzatziki", description: "Aus feinstem Joghurt, Gurken, Knoblauch und Olivenöl.", price: "6,50", allergens: "G", additives: "8", category: "Vorspeisen" },
      { id: 17, name: "Oliven", description: "Mit Olivenöl, Zwiebeln und Oregano verfeinert.", price: "6,50", allergens: "I", category: "Vorspeisen" },
      { id: 18, name: "Kolokithokeftedes", description: "Griechische Zucchinibällchen mit Fetakäse und Tzatziki-Dip.", price: "10,90", allergens: "A-C-G", category: "Vorspeisen" },
      { id: 19, name: "Taramas", description: "Fischrogencreme.", price: "9,00", allergens: "A-C-D", category: "Vorspeisen" },
      { id: 20, name: "Dakos", description: "Kretische Spezialität mit Fetakäse, Tomaten, Oregano und Olivenöl.", price: "10,50", allergens: "A-G", category: "Vorspeisen" },
      { id: 21, name: "Melitzanosalata", description: "Legendäre kretische Spezialität: Auberginensalat mit Knoblauch, Zwiebeln, Olivenöl und Paprika.", price: "9,00", allergens: "G", category: "Vorspeisen" },
      { id: 22, name: "Chtipiti", description: "Hausgemachte, leicht pikante Käsecreme aus Schafskäse und frischen Kräutern.", price: "9,00", allergens: "G", additives: "8", category: "Vorspeisen" },
      { id: 23, name: "Saganaki Special", description: "Gebackener, panierter Käse griechischer Art mit Honig.", price: "12,00", allergens: "A-C-G-K", category: "Vorspeisen" },
      { id: 24, name: "Feta fournou", description: "Überbackener Fetakäse mit Tomaten, Oliven, Peperoni und Knoblauch.", price: "12,50", allergens: "G", additives: "8", category: "Vorspeisen" },
    ],
  },
  {
    name: "Salate",
    nameGreek: "Salates",
    items: [
      { id: 25, name: "Großer Bauernsalat (Choriatiki)", description: "Traditionell griechisch mit Tomaten, Gurken, Zwiebeln, Oliven, Peperoni und Fetakäse.", price: "11,50", allergens: "G", category: "Salate" },
      { id: 26, name: "Halloumi-Salat", description: "Spezialität aus Zypern: Halloumi auf gemischtem Salat mit Rosinen, Balsamico, Honig und Walnüssen.", price: "14,50", allergens: "G-H-L", category: "Salate" },
      { id: 27, name: "Gyros-Salat", description: "Gyrosfleisch auf gemischtem Salat mit hausgemachtem Dressing.", price: "14,00", allergens: "J", category: "Salate" },
      { id: 28, name: "Kotosalata", description: "Hähnchenbrust auf gemischtem Salat mit hausgemachtem Dressing.", price: "14,00", allergens: "A-F-G", category: "Salate" },
      { id: 29, name: "Scampi-Salat Special", description: "In Ouzo abgelöschte, in Butter gebratene Scampi mit Knoblauch, Cherrytomaten, Fetakäse und Walnüssen auf gemischtem Salat.", price: "15,00", allergens: "B-G-H", category: "Salate" },
    ],
  },
  {
    name: "Kindergerichte",
    nameGreek: "Für unsere kleinen Helden",
    items: [
      { id: 30, name: "Pluto-Teller", description: "Kinderschnitzel mit Pommes frites.", price: "9,00", allergens: "A-C", category: "Kindergerichte" },
      { id: 31, name: "Nemo-&-Dory-Teller", description: "Fischstäbchen mit Pommes frites.", price: "9,00", allergens: "A-C-D", category: "Kindergerichte" },
      { id: 32, name: "Tom-&-Jerry-Teller", description: "Penne mit Tomatensauce und Schnittkäse.", price: "9,00", allergens: "A-G", category: "Kindergerichte" },
      { id: 33, name: "Micky-Maus-Teller", description: "Kinder-Gyros mit Pommes frites.", price: "9,00", category: "Kindergerichte" },
      { id: 34, name: "Paw-Patrol-Teller", description: "Ein Fleischspieß mit Pommes frites.", price: "9,00", category: "Kindergerichte" },
    ],
    notes: [
      { title: "Für unsere kleinen Helden", text: "Unser Koch empfiehlt dazu eine Metaxasauce für 4,90 €." },
    ],
  },
  {
    name: "Gerichte aus dem Backofen",
    nameGreek: "Apo ton Fourno",
    items: [
      { id: 35, name: "Andros-Pfanne", description: "Hähnchenfiletspitzen und Penne in Metaxasauce, mit Schnittkäse überbacken.", price: "19,90", allergens: "A-G", category: "Gerichte aus dem Backofen" },
      { id: 36, name: "Brokkoli-Pfanne (vegetarisch)", description: "Brokkoli in Metaxasauce, mit Schnittkäse überbacken.", price: "18,50", allergens: "A-G", category: "Gerichte aus dem Backofen" },
      { id: 37, name: "Gyros Special", description: "Gyros vom Drehspieß in Metaxasauce, mit Fetakäse und Schnittkäse überbacken; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "20,00", allergens: "G-H", additives: "4, 8", category: "Gerichte aus dem Backofen" },
      { id: 38, name: "Kota fournou", description: "Hähnchenbrust in Metaxasauce, mit Käse überbacken; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "21,00", allergens: "A-G-H", category: "Gerichte aus dem Backofen" },
      { id: 39, name: "Souvlaki fournou", description: "Zwei marinierte Fleischspieße in Metaxasauce, mit Käse überbacken; dazu Pommes frites.", price: "21,00", allergens: "A-G", category: "Gerichte aus dem Backofen" },
      { id: 40, name: "Bifteki überbacken", description: "Hacksteak aus Schweine- und Kalbfleisch, mit Schafskäse gefüllt, in Metaxasauce und mit Schnittkäse überbacken; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "23,00", allergens: "A-G-H", additives: "4", category: "Gerichte aus dem Backofen" },
      { id: 41, name: "Lammhaxe aus dem Ofen", description: "Traditionell griechisch nach langjährigem Hausrezept, mit dicken Bohnen und Fetakäse überbacken. Enthält Zimt.", price: "25,90", allergens: "G", category: "Gerichte aus dem Backofen" },
      { id: 42, name: "Santorini-Pfanne", description: "Gyros mit Penne in Metaxasauce, mit Fetakäse und Schnittkäse überbacken.", price: "19,90", allergens: "A-G", category: "Gerichte aus dem Backofen" },
      { id: 43, name: "Scampi-Pfanne (Saganaki Garides)", description: "Scampi in Weißwein abgelöscht und in Butter mit Knoblauch und Tomaten gebraten; mit Fetakäse serviert. Dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "25,90", allergens: "A-B-G-H-L", category: "Gerichte aus dem Backofen" },
    ],
    notes: [
      { title: "Unsere Empfehlung", text: "Zu unserer Andros-Pfanne und Brokkoli-Pfanne empfehlen wir Ihnen zusätzlich Kretische Kartoffeln mit Knoblauch und Kräutern für 4,50 €." },
    ],
  },
  {
    name: "Grillgerichte",
    nameGreek: "Apo tin Schara",
    items: [
      { id: 44, name: "Paidakia (Lammkoteletts)", description: "Gegrillte Lammkoteletts mit Tzatziki und frischer Zitrone; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "25,90", allergens: "A-G-H", category: "Grillgerichte" },
      { id: 45, name: "Gyros-Calamari (Bayerischer Teller)", description: "Gyros vom Drehspieß mit Calamari und Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "22,90", allergens: "A-C-G-H-N", additives: "8", category: "Grillgerichte" },
      { id: 46, name: "Kreta-Mix", description: "Gyros, marinierter Fleischspieß, Hacksteak und gegrillte Rinderleber mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "23,00", allergens: "A-G-H-J", additives: "4", category: "Grillgerichte" },
      { id: 47, name: "Gyros aus Larissa", description: "Hausspezialität: Gyros vom Drehspieß mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "17,50", allergens: "A-G-H", additives: "4", category: "Grillgerichte" },
      { id: 48, name: "Souvlaki", description: "Zwei marinierte Fleischspieße mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "19,00", allergens: "A-G-H", category: "Grillgerichte" },
      { id: 49, name: "Rinderleber", description: "Zart gegrillte Rinderleber mit gebratenen Zwiebeln und Apfelring; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "18,90", allergens: "A-H", additives: "4", category: "Grillgerichte" },
      { id: 50, name: "Souzoukakia", description: "Saftig gegrillte Hacksteaks in Metaxasauce, mit Käse überbacken; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "23,00", allergens: "A-G-H-J", category: "Grillgerichte" },
      { id: 51, name: "Bifteki", description: "Gegrilltes Hacksteak aus Schweine- und Kalbfleisch, mit Schafskäse und Schnittkäse gefüllt; dazu Tzatziki und Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "22,00", allergens: "A-G-H-J", category: "Grillgerichte" },
      { id: 52, name: "Gegrillte Hähnchenbrust", description: "Saftig gegrillt mit Zitrone und Kräuterbutter; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "20,00", allergens: "A-F-G-H", category: "Grillgerichte" },
      { id: 53, name: "Kleopatra-Teller", description: "Gegrillte Rinderleber, Schweinefilet und Hähnchenbrust mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "23,00", allergens: "A-G-H-M", category: "Grillgerichte" },
      { id: 54, name: "Schweinefilet Metaxa", description: "Zart gegrilltes Schweinefilet in Metaxasauce; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "22,00", allergens: "A-E-G-H", additives: "4", category: "Grillgerichte" },
      { id: 55, name: "Thessaloniki-Mix", description: "Schweinesteak, Rinderleber und Gyros vom Drehspieß mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "23,00", allergens: "A-G-H", additives: "4", category: "Grillgerichte" },
      { id: 56, name: "Korfu-Mix", description: "Gegrilltes Schweinesteak, Gyros und Fleischspieß mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "23,00", allergens: "A-G-H-J", additives: "4", category: "Grillgerichte" },
      { id: 57, name: "Galazio Special Teller - Mix", description: "Gegrillte Hähnchenbrust, Lammkotelett, Gyros, Souvlaki und Schweinefilet mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "28,00", allergens: "A-F-G-H-J", additives: "4", category: "Grillgerichte" },
      { id: 58, name: "Gyros à la Chef", description: "Gyros mit Rucola, Zwiebeln, Fetakäse, Olivenöl und Paprika; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "20,00", allergens: "A-G-H", category: "Grillgerichte" },
      { id: 59, name: "Lammfilet vom Grill", description: "Saftig gegrillt mit Kräuterbutter und frischer Zitrone; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "27,50", allergens: "A-G-H", category: "Grillgerichte" },
      { id: 60, name: "Kotopoulo Gemisto", description: "Hähnchenbrustfilet, mit Spinat und Schnittkäse gefüllt, in Metaxasauce überbacken; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "22,50", allergens: "A-G-H", category: "Grillgerichte" },
      { id: 61, name: "Souvla Meteora", description: "Lieblingsgericht von Chef Leo. Hauchdünne Schweinefleischröllchen, mit Schafskäse gefüllt, am Spieß mit Paprika und Zwiebeln; in Metaxasauce und mit Käse überbacken. Dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "27,00", allergens: "A-G-H", additives: "4", category: "Grillgerichte" },
      { id: 62, name: "Tavernaki-Teller", description: "Zart gegrilltes Schweinesteak, Rinderleber und Lammkotelett; dazu Tzatziki und Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "23,00", allergens: "A-E-G-H", additives: "4", category: "Grillgerichte" },
    ],
    notes: [MIX_PLATTE_NOTE],
  },
  {
    name: "Fischgerichte",
    nameGreek: "Psaria",
    items: [
      { id: 63, name: "Tsipoura (Dorade)", description: "Gegrilltes Doradenfilet mit Petersilienkartoffeln und Brokkoli - sehr zu empfehlen.", price: "28,00", allergens: "D-G", category: "Fischgerichte" },
      { id: 64, name: "Scampi", description: "Mehlierte, frittierte Scampi mit Zitronen-Fischsauce; dazu Petersilienkartoffeln und Brokkoli.", price: "26,00", allergens: "A-B-D-G", category: "Fischgerichte" },
      { id: 65, name: "Calamari", description: "Mehlierte, gebratene Calamari mit Zitronen-Fischsauce; dazu Petersilienkartoffeln und Brokkoli.", price: "24,00", allergens: "A-D-G-N", category: "Fischgerichte" },
      { id: 66, name: "Fischplatte", description: "Gemischte Platte mit Scampi, Calamari und Lachsfilet; dazu Zitronen-Fischsauce, Petersilienkartoffeln und Brokkoli.", price: "25,00", allergens: "A-B-D-G-N", category: "Fischgerichte" },
      { id: 67, name: "Zanderfilet", description: "Mit Liebe zubereitet und in Butter gebraten; dazu Petersilienkartoffeln, Brokkoli und Zitronen-Fischsauce.", price: "22,00", allergens: "A-D-G", category: "Fischgerichte" },
      { id: 68, name: "Gegrilltes Lachsfilet", description: "Mit Petersilienkartoffeln und Brokkoli.", price: "25,00", allergens: "A-D-G", category: "Fischgerichte" },
    ],
  },
  {
    name: "Nudelgerichte",
    nameGreek: "Ta Makaronia mas",
    items: [
      { id: 69, name: "Tagliatelle Hellas", description: "Tagliatelle mit Oliven, Cherrytomaten, Knoblauch und Fetakäse, mit Weißwein abgelöscht.", price: "17,00", allergens: "A-G-L", category: "Nudelgerichte" },
      { id: 70, name: "Makaronia Kotopoulo", description: "Tagliatelle mit Hähnchenfiletspitzen in Sahnesauce.", price: "19,00", allergens: "A-G", category: "Nudelgerichte" },
      { id: 71, name: "Makaronia Solomos", description: "Tagliatelle mit gebratenem Lachsfilet, frischem Spinat und Cherrytomaten in Hummercremesauce.", price: "22,00", allergens: "A-B-D-G", category: "Nudelgerichte" },
      { id: 72, name: "Makaronia Metaxa", description: "Penne mit Metaxasauce und Fetakäse.", price: "17,00", allergens: "A-G", category: "Nudelgerichte" },
    ],
  },
  {
    name: "Beilagen",
    nameGreek: "Sinodeftika",
    items: [
      { id: 73, name: "Pommes frites", description: "", price: "4,30", allergens: "A", category: "Beilagen" },
      { id: 74, name: "Kretische Kartoffeln", description: "Mit Knoblauch und Kräutern.", price: "4,90", allergens: "A-H", category: "Beilagen" },
      { id: 75, name: "Pita", description: "Fladenbrot.", price: "4,30", allergens: "A", additives: "2", category: "Beilagen" },
      { id: 76, name: "Tomatenreis", description: "", price: "4,30", category: "Beilagen" },
      { id: 77, name: "Gemüse-Mix", description: "", price: "4,90", category: "Beilagen" },
      { id: 78, name: "Metaxasauce", description: "", price: "4,90", allergens: "A-G", category: "Beilagen" },
      { id: 79, name: "Butterreis", description: "", price: "4,30", allergens: "G", category: "Beilagen" },
    ],
  },
]

export const extraMenu: MenuCategory[] = [
  {
    name: "Extra-Karte",
    items: [
      { id: 85, name: "Frittierte Sardellen", description: "Knusprig frittierte Sardellen mit Zitrone.", price: "9,50", allergens: "A-D", additives: "8", category: "Extra-Karte" },
      { id: 86, name: "Mydia fournou", description: "Miesmuscheln mit Cherrytomaten, Knoblauch, Peperoni und Fetakäse im Ofen überbacken.", price: "13,00", allergens: "G-N", additives: "2", category: "Extra-Karte" },
      { id: 87, name: "Mydia achnista", description: "Zart gedämpfte Miesmuscheln in einem Sud aus Weißwein, Knoblauch und Bukovo (pikante Paprikakerne).", price: "17,00", allergens: "I-L-N", additives: "2", category: "Extra-Karte" },
      { id: 88, name: "Albanische Fërgesë mit Rinderleber", description: "Ein traditionelles albanisches Gericht mit gebratener Rinderleber, Paprika, Zwiebeln, Tomaten und Knoblauch, überbacken mit cremigem Feta-Käse und aromatischen Gewürzen. Dazu Kretische Kartoffeln mit Knoblauch.", price: "19,50", allergens: "A-G-H", category: "Extra-Karte" },
      { id: 89, name: "Moussaka", description: "Kartoffeln, Hackfleisch, Auberginen und Tomaten unter einer feinen Käsehaube mit cremiger Béchamelsauce.", price: "19,50", allergens: "A-C-G", category: "Extra-Karte" },
      { id: 90, name: "Gyros Kaftero (scharf)", description: "Gyros vom Drehspieß mit Paprika, Cherrytomaten, Fetakäse und Bukovo; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "20,00", allergens: "A-G-H", category: "Extra-Karte" },
      { id: 91, name: "Pelopones Pfanne", description: "Gyros vom Drehspieß mit Brokkoli und Penne in Metaxasauce, mit Käse überbacken.", price: "19,90", allergens: "A-G", category: "Extra-Karte" },
      { id: 92, name: "Gnocchi Pfanne", description: "Italienische Kartoffelklößchen (Gnocchi) mit Gyros in Metaxasauce, mit Käse überbacken.", price: "19,90", allergens: "A-C-G", category: "Extra-Karte" },
      { id: 93, name: "Schweinefilet Gefüllt", description: "Gefülltes Schweinefilet mit Fetakäse und Schnittkäse, in Metaxasauce und mit Käse überbacken; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.", price: "25,00", allergens: "A-G", category: "Extra-Karte" },
      { id: 94, name: "Gefüllte Calamari", description: "Gegrillte Calamari, gefüllt mit Fetakäse, Paprika, frischer Minze, Knoblauch und Oregano. Dazu Petersilienkartoffeln und Brokkoli.", price: "25,00", allergens: "G-N", category: "Extra-Karte" },
      { id: 95, name: "Brizola (Schwein, Kotelett)", description: "Gegrilltes großes Schwein-Kotelett XXL, genau wie in Griechenland serviert mit Tzatziki und Kretischen Kartoffeln mit Knoblauch und Kräutern.", price: "27,00", allergens: "G", category: "Extra-Karte" },
    ],
  },
]

// Featured dishes for the preview section
export const featuredDishes = [
  {
    id: 2,
    name: "Pikilia Galazio Platte",
    description: "Sehr zu empfehlen! Mix für 2 Personen: eine Kreation aus warmen und kalten mediterranen Vorspeisen.",
    price: "22,00",
    category: "Vorspeisen",
  },
  {
    id: 57,
    name: "Galazio Special Teller - Mix",
    description: "Gegrillte Hähnchenbrust, Lammkotelett, Gyros, Souvlaki und Schweinefilet mit Tzatziki; dazu Kretische Kartoffeln mit Knoblauch und Kräutern.",
    price: "28,00",
    category: "Grillgerichte",
  },
  {
    id: 89,
    name: "Moussaka",
    description: "Kartoffeln, Hackfleisch, Auberginen und Tomaten unter einer feinen Käsehaube mit cremiger Béchamelsauce.",
    price: "19,50",
    category: "Extra-Karte",
  },
  {
    id: 41,
    name: "Lammhaxe aus dem Ofen",
    description: "Traditionell griechisch nach langjährigem Hausrezept, mit dicken Bohnen und Fetakäse überbacken. Enthält Zimt.",
    price: "25,90",
    category: "Gerichte aus dem Backofen",
  },
]

/** Allergen letter → number shown on the printed menu (e.g. "G" → "7G"). */
export const allergenNumbers: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10, K: 11, L: 12, M: 13, N: 14,
}

export const allergenInfo: Record<string, string> = {
  A: "Glutenhaltiges Getreide",
  B: "Krebstiere",
  C: "Eier",
  D: "Fisch",
  E: "Erdnüsse",
  F: "Soja",
  G: "Milch / Laktose",
  H: "Schalenfrüchte / Nüsse",
  I: "Sellerie",
  J: "Senf",
  K: "Sesamsamen",
  L: "Schwefeldioxid / Sulfite",
  M: "Lupinen",
  N: "Weichtiere",
}

export const additiveInfo: Record<string, string> = {
  "1": "mit Farbstoff",
  "2": "mit Konservierungsstoff",
  "3": "mit Antioxidationsmittel",
  "4": "mit Geschmacksverstärker",
  "5": "geschwefelt",
  "6": "geschwärzt",
  "7": "mit Phosphat",
  "8": "mit Milcheiweiß",
  "9": "koffeinhaltig",
  "10": "chininhaltig",
  "11": "mit Süßungsmittel",
}

export const drinkPromoNote: MenuNote = {
  title: "Griechische Taverne ohne Ouzo oder Tsikoudia?",
  text: "Das wäre wie Griechenland ohne Meer! Plomari, MINI oder Barbayanni (200 ml) - oder Tsikoudia, der traditionelle Raki aus Kreta. Nur 14,50 €.",
}

export const packagingNote =
  "Der Umwelt zuliebe - für nicht verzehrte Speisen \"zum Mitnehmen\" müssen wir Ihnen 1,00 € Verpackungskosten berechnen. Vielen Dank für Ihr Verständnis."
