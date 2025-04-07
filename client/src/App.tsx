import { Route, Routes } from "react-router-dom";
import Home from "./pages/masters/Home";
import About from "./pages/masters/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="content content--bg-top content--main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Navbar />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
