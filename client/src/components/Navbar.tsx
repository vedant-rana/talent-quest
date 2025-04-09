import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxStateHooks";
import { logoutUser } from "../features/users/userThunks";

const Navbar = () => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="content__outer">
      <header className="header header--fixed">
        <div className="max-container container-fluid">
          <div className="header__outer">
            <div className="header__itm">
              <a className="logo" asp-action="index" asp-controller="Home">
                <img className="logo__img" src="/images/silverlogo.png" />
              </a>
            </div>
            <div className="header__itm">
              <a className="header__btn js-toggleNavMobile" href="#">
                <span></span>
              </a>
              <div className="header__nav">
                <ul className="nav__ul">
                  <li className="nav__li">
                    <Link to={"/"} className="nav__link nav__link--active">
                      Home
                    </Link>
                  </li>
                  <li className="nav__li">
                    <Link
                      to={"/contact"}
                      className="nav__link nav__link--active"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="nav__li nav__li--dropdown">
                    <a href="#" className="nav__link">
                      Masters
                    </a>
                    <ul className="dropdown">
                      <li>
                        <Link to={"/masters/logos"} className="nav__link">
                          Logo
                        </Link>
                      </li>
                      <li>
                        <Link to={"/masters/categories"} className="nav__link">
                          Category
                        </Link>
                      </li>
                      <li>
                        <Link to={"/masters/exams"} className="nav__link">
                          Exam
                        </Link>
                      </li>
                      <li>
                        <Link to={"/masters/questions"} className="nav__link">
                          Questions
                        </Link>
                      </li>
                      <li>
                        <Link to={"/masters/answers"} className="nav__link">
                          Answers
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav__li">
                    {!isLoading && isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="nav__link nav__link--active"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to={"/login"}
                        className="nav__link nav__link--active"
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
