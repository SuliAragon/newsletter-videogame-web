import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound/NotFound";
import FetchNews from "./components/FetchNews";
import Login from "./pages/Login/Login";

import ArticleDetail from "./pages/ArticleDetail/ArticleDetail"; // o donde lo pongas

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<FetchNews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
