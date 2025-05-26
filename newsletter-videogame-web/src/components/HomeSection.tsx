import AnimatedSection from "./AnimatedSection";

const sections = [
  {
    title: "Explora nuevos mundos",
    texts: [
      "Sumérgete en historias inolvidables.",
      "Descubre aventuras más allá de la realidad.",
      "Tu próxima gran partida comienza aquí.",
    ],
    img: "/img/expedition33.jpg",
  },
  {
    title: "Revive lo retro",
    texts: [
      "La nostalgia en cada píxel.",
      "Clásicos que marcaron generaciones.",
      "Vuelve a jugar como la primera vez.",
    ],
    img: "/img/gameBoy.jpg",
  },
  {
    title: "Analizamos lo mejor",
    texts: [
      "Opiniones expertas y honestas.",
      "Profundizamos en cada detalle.",
      "Descubre joyas ocultas y blockbusters.",
    ],
    img: "/img/FFVII.jpeg",
  },
];

export default function HomeSections() {
  return (
    <>
      {sections.map((section, index) => {
        const isReverse = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-24 py-16 gap-8 ${
              isReverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <AnimatedSection from={isReverse ? "right" : "left"}>
              <img
                src={section.img}
                alt={section.title}
                className="w-full md:w-full rounded-3xl shadow-2xl object-cover h-[400px] md:h-[600px]"
              />
            </AnimatedSection>

            <AnimatedSection from={isReverse ? "left" : "right"}>
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  {section.title}
                </h2>
                {section.texts.map((text, i) => (
                  <p key={i} className="text-lg md:text-xl text-gray-300">
                    {text}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        );
      })}
    </>
  );
}
