import { Leaf, BookOpen, Sparkles, Heart } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Frische Zutaten",
    description: "Handverlesene Produkte, erstklassiges Olivenöl und Kräuter direkt aus Griechenland und von lokalen Höfen.",
  },
  {
    icon: BookOpen,
    title: "Authentische Rezepte",
    description: "Traditionelle Familienrezepte, die jahrhundertealte griechische Kochtraditionen und Techniken ehren.",
  },
  {
    icon: Sparkles,
    title: "Elegantes Ambiente",
    description: "Ein raffinierter, aber einladender Raum, der Sie an die Mittelmeerküste entführt.",
  },
  {
    icon: Heart,
    title: "Herzliche Gastfreundschaft",
    description: "Echte griechische Philoxenia – die Liebe zu den Gästen – in jeder Begegnung und jedem Detail.",
  },
]

export function Experience() {
  return (
    <section id="erlebnis" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
            Das Erlebnis
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-6 text-balance">
            Warum unsere Gäste
            <br />
            Taverna Galazio wählen
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Mehr als ein Restaurant – wir bieten eine authentische Reise durch griechische 
            Gastronomie, Kultur und Gastfreundschaft.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
