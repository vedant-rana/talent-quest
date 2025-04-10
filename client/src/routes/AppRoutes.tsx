import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Contact from "../pages/Contacts";
import Logo from "../pages/masters/logos/Logo";
import ManageLogo from "../pages/masters/logos/ManageLogo";
import CategoryTypeList from "../pages/masters/categoryType/CategoryType";
import ManageCategoryType from "../pages/masters/categoryType/ManageCategoryType";

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

        <Route path="category-type" element={<CategoryTypeList />} />
        <Route path="category-type/manage" element={<ManageCategoryType />} />
        <Route
          path="category-type/manage/:id"
          element={<ManageCategoryType />}
        />
        <Route path="categories" />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
