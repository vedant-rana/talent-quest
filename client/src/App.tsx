import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/auth/login";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="wrapper" style={{ width: "100%" }}>
        <div className="content content--bg-top content--main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
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
