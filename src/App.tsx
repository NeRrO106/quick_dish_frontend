import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Ceva</h1>} />
          <Route path="blogs" element={<h1>Ceva</h1>} />
          <Route path="contact" element={<h1>Ceva</h1>} />
          <Route path="*" element={<h1>Ceva</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
