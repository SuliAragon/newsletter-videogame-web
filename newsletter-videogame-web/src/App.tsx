import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound/NotFound";
import FetchNews from "./components/FetchNews";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/admin";
import ArticleCreate from "./pages/ArticleCreate/articleCreate";
import ArticleEdit from "./pages/EditArticle/editArticle";
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail";
import IndiePage from "./pages/Indie/indie";
import NoticiasPage from "./pages/Noticias/noticias";
import RetroPage from "./pages/Retro/retro";
import AnalisisPage from "./pages/Analisis/analisis";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create" element={<ArticleCreate />} />
          <Route path="/admin/edit/:id" element={<ArticleEdit />} />
          <Route path="/indie" element={<IndiePage />} />
          <Route path="/noticias" element={<NoticiasPage />} />
          <Route path="/retro" element={<RetroPage />} />
          <Route path="/analisis" element={<AnalisisPage />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
