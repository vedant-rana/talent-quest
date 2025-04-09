import { useAppDispatch, useAppSelector } from "../../hooks/reduxStateHooks";
import { loginUser } from "../../features/users/userThunks";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../../types/auth/loginTypes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleLogin = (credentials: LoginFormData) => {
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="content__fixed">
      <section className="vh-50 vw-50">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="/images/loginIllustration.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form className="form" onSubmit={handleSubmit(handleLogin)}>
                {/* <input type="hidden" name="ReturnUrl" value="@ViewContext.HttpContext.Request.Query["ReturnUrl"]" /> */}
                <div className="divider d-flex align-items-center my-4">
                  <p
                    className="text-center fw-bold mx-3 mb-0 title-h2"
                    style={{ color: "rgba(100, 30, 196)" }}
                  >
                    Login
                  </p>
                </div>

                <div className="form-outline mb-4">
                  <label
                    htmlFor="Email"
                    className="form-label font-weight-bold"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-outline mb-3 position-relative">
                  <label
                    className="form-label font-weight-bold"
                    asp-for="Password"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    id="passwordInput"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password.message}
                    </span>
                  )}
                  <button
                    type="button"
                    id="togglePassword"
                    className="position-absolute btn-icon"
                    style={{ right: "10px", top: "46px" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {/* <i className="fas fa-eye" id="eyeIcon"></i> */}
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                      backgroundColor: "rgba(100, 30, 196)",
                      color: "white",
                    }}
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
