import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="blogs" element={<h1>Ceva</h1>} />
          <Route path="contact" element={<h1>Ceva</h1>} />
          <Route path="*" element={<h1>Ceva</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
