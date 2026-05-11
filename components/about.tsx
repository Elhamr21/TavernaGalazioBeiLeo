export function About() {
  return (
    <section id="uber-uns" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="images/food.png"
                alt="Gegrillte mediterrane Spezialitäten"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:bottom-8 lg:-right-8 bg-primary text-primary-foreground p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold">25+</span>
              <span className="text-xs sm:text-sm lg:text-base opacity-90">Jahre Erfahrung</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">
              Unsere Geschichte
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-4 sm:mb-6 text-balance">
              Ein Stück Griechenland
              <br />
              im Herzen von Leipzig
            </h2>
            <div className="space-y-4 sm:space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                Seit über zwei Jahrzehnten ist Taverna Galazio Leipzigs Adresse für authentische 
                griechische Küche. Was als Familientraum begann, ist zu einem beliebten Treffpunkt 
                geworden, an dem mediterrane Traditionen auf deutsche Gastfreundschaft treffen.
              </p>
              <p>
                Unsere Küche ehrt Rezepte, die über Generationen weitergegeben wurden, und verwendet 
                nur die frischesten Zutaten direkt aus Griechenland und von lokalen Märkten. Jedes 
                Gericht erzählt eine Geschichte von sonnenverwöhnten Olivenhainen, azurblauen Meeren 
                und der einfachen Freude, eine Mahlzeit mit seinen Liebsten zu teilen.
              </p>
              <p>
                Unter der Leitung unseres Gründers Leo laden wir Sie ein, die Wärme, die Aromen 
                und die Gastfreundschaft zu erleben, die die griechische Kultur ausmachen. 
                Hier sind Sie nicht nur Gast – Sie sind Familie.
              </p>
            </div>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
              <p className="font-serif text-lg sm:text-xl text-foreground italic">Leo & Familie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
