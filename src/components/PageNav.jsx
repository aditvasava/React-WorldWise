import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/authcontext";

function PageNav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/* NavLink is almost same as Link, it will only add a class named active to the element, which can be used to add some css */}
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>

        <li>
          <NavLink to="/product">Product</NavLink>
        </li>

        {!isAuthenticated && (
          <li>
            <NavLink
              to="/login"
              className={styles.ctaLink}
              style={{ display: `` }}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PageNav;
