import { ToastContainer } from "react-toastify";
const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000} // auto close in 3 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" // or "dark" "light"
    />
  );
};

export default Toaster;
