import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";

import "./navigation.styles.scss";

const Navigation = () => {
  const userContext = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/auth">
           {userContext?.user ? "SIGN OUT" : "SIGN IN"} 
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
