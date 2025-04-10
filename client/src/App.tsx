import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAppDispatch } from "./hooks/reduxStateHooks";
import { loadUser } from "./features/users/userThunks";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <div className="wrapper" style={{ width: "100%" }}>
        <div className="content content--bg-top content--main">
          <AppRoutes />
          <Navbar />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
