import NewsCard from "../../components/NewsCard"; // Ajusta la ruta según tu estructura

export default function Home() {
  const newsData = [
    {
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Noticia sobre tecnología",
      link: "/noticia/tecnologia",
    },
    {
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Noticia de ciencia",
      link: "/noticia/ciencia",
    },
    {
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Noticia de deportes",
      link: "/noticia/deportes",
    },
    {
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Noticia de salud",
      link: "/noticia/salud",
    },
    {
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Noticia de economía",
      link: "/noticia/economia",
    },
    {
      imageUrl:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      title: "Noticia de entretenimiento",
      link: "/noticia/entretenimiento",
    },
  ];

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Últimas Noticias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            imageUrl={news.imageUrl}
            title={news.title}
            link={news.link}
          />
        ))}
      </div>
    </section>
  );
}
