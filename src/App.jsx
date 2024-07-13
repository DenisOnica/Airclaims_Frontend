import { Routes, Route } from "react-router-dom";

import NavBar from "./Components/Navbar";

import About from "./Pages/About/About";
import Aplica from "./Pages/Aplica/Aplica";
import Drepturi from "./Pages/Drepturi/Drepturi";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";

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
      </Routes>

      <Footer />
    </>
  );
}

export default App;
