import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxStateHooks";
import { loginUser } from "../../features/users/userThunks";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    console.log("Login form submitted");
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    console.log("logged in User =>  ", user);
  };

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
              <form className="form" onSubmit={handleLogin}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-3 position-relative">
                  <label
                    className="form-label font-weight-bold"
                    asp-for="Password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    id="passwordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    id="togglePassword"
                    className="position-absolute btn-icon"
                    style={{ right: "10px", top: "46px" }}
                  >
                    <i className="fas fa-eye" id="eyeIcon"></i>
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
