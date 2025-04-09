import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { useAppDispatch } from "./hooks/reduxStateHooks";
import { useEffect } from "react";
import { loadUser } from "./features/users/userThunks";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Contact from "./pages/Contacts";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <div className="wrapper" style={{ width: "100%" }}>
        <div className="content content--bg-top content--main">
          <Routes>
            <Route path="/" element={ProtectedRoute(<Home />)} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          <Navbar />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
