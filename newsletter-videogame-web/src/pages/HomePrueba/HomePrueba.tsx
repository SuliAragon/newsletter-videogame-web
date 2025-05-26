import React from "react";
import ParticlesBackground from "../../components/ParticlesBackground";
const HomePrueba: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Fondo de partículas */}
      <ParticlesBackground />

      {/* Contenido encima */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10">
        <h1 className="text-5xl font-bold mb-6">Test Partículas</h1>
        <p className="text-xl">
          Si ves estas partículas blancas moviéndose sobre fondo negro, ¡funciona!
        </p>
      </div>
    </div>
  );
};

export default HomePrueba;
