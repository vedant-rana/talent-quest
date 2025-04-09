import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Contact from "../pages/Contacts";
import Logo from "../pages/masters/logos/Logo";
import ManageLogo from "../pages/masters/logos/ManageLogo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ProtectedRoute(<Home />)} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/masters">
        <Route path="logos" element={<Logo />} />
        <Route path="logos/manage" element={<ManageLogo />} />
        <Route path="logos/manage/:id" element={<ManageLogo />} />
        {/* Add other routes here */}
        <Route path="categories" />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
