import { Routes, Route } from "react-router-dom";

import NavBar from "./Components/Navbar";

import About from "./Pages/About/About";
import Aplica from "./Pages/Aplica/Aplica";
import Drepturi from "./Pages/Drepturi/Drepturi";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Admin from "./Pages/Admin/Admin";

function App() {
  return (
    <>
      <NavBar color="white" textColor="black" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drepturi" element={<Drepturi />} />
        <Route path="/desprenoi" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aplica" element={<Aplica />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
