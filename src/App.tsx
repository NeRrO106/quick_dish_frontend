import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";
import NoPage from "./pages/NoPage";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import AuthRedirect from "./routes/AuthRedirect";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthRedirect />
        <NavBar />
        <Routes>
          <Route path="/hero" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
