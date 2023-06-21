import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        {/* NavLink add className="active" (support for css), UI same Link */}
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
