const Navbar = () => {
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
                  {/* @{
                              await Html.RenderPartialAsync("_Menu");
                          } */}
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
