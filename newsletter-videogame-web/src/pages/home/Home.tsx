import ParticlesBackground from "../../components/ParticlesBackground";
import GameQuotes from "../../components/GameQuotes";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import FetchNews from "../../components/FetchNews";
import HomeSections from "../../components/HomeSection";
import HomeEditorial from "../../components/HomeEditorial";
import HomeCarousel from "../../components/HomeCarousel";

export default function Home() {
  return (
    <div
      className="relative w-full min-h-screen text-white overflow-hidden bg-black"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <ParticlesBackground />

      <div className="relative z-10">
        <HomeSections />
        <HomeEditorial />
        <HomeCarousel />
        <GameQuotes />
        <FetchNews />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
