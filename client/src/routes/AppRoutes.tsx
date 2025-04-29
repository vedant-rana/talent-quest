import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Contact from "../pages/Contacts";
import Logo from "../pages/masters/logos/Logo";
import ManageLogo from "../pages/masters/logos/ManageLogo";
import CategoryTypeList from "../pages/masters/categoryType/CategoryType";
import ManageCategoryType from "../pages/masters/categoryType/ManageCategoryType";
import { RolesEnum } from "../utils/enums/roleEnums";
import RolesList from "../pages/masters/userRoles/Role";
import ManageRole from "../pages/masters/userRoles/ManageRole";
import CategoryList from "../pages/masters/category/Category";
import ManageCategory from "../pages/masters/category/ManageCategory";
import ExamList from "../pages/masters/exam/Exam";
import ManageExam from "../pages/masters/exam/ManageExam";
import QuestionList from "../pages/masters/questions/Question";
import ManageQuestion from "../pages/masters/questions/ManageQuestion";
import AnswerList from "../pages/masters/answers/Answer";
import ManageAnswer from "../pages/masters/answers/ManageAnswer";
import ManageQuestionWithOptions from "../pages/masters/questions/ManageQuestionWithAnswers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ProtectedRoute(<Home />)} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/masters">
        {/* logos routes */}
        <Route
          path="logos"
          element={ProtectedRoute(<Logo />, [RolesEnum.Admin])}
        />
        <Route path="logos/manage" element={<ManageLogo />} />
        <Route path="logos/manage/:id" element={<ManageLogo />} />

        {/* category-type routes */}
        <Route path="category-type" element={<CategoryTypeList />} />
        <Route path="category-type/manage" element={<ManageCategoryType />} />
        <Route
          path="category-type/manage/:id"
          element={<ManageCategoryType />}
        />

        {/* user-roles routes */}
        <Route path="user-roles" element={<RolesList />} />
        <Route path="user-roles/manage" element={<ManageRole />} />
        <Route path="user-roles/manage/:id" element={<ManageRole />} />

        {/* categories routes */}
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/manage" element={<ManageCategory />} />
        <Route path="categories/manage/:id" element={<ManageCategory />} />

        {/* categories routes */}
        <Route path="exams" element={<ExamList />} />
        <Route path="exams/manage" element={<ManageExam />} />
        <Route path="exams/manage/:id" element={<ManageExam />} />

        {/* categories routes */}
        <Route path="questions" element={<QuestionList />} />
        <Route path="questions/manage" element={<ManageQuestion />} />
        <Route path="questions/manage/:id" element={<ManageQuestion />} />
        <Route
          path="questions/manage-with-options"
          element={<ManageQuestionWithOptions />}
        />

        {/* answers routes */}
        <Route path="answers" element={<AnswerList />} />
        <Route path="answers/manage" element={<ManageAnswer />} />
        <Route path="answers/manage/:id" element={<ManageAnswer />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
