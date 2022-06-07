import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/companies">ALL COMPANIES</Link>
          </li>
          <li>
            <Link to="/addNewCompany">ADD NEW COMPANY</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
