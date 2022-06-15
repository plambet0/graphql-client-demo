import classes from './MainNavigation.module.css';
import Companies from '../Companies';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import CompanyForm from '../CompanyForm';

function MainNavigation() {
  const [loadCompanies, setLoadCompanies] = useState(false);
  const [loadNewCompanyForm, setloadNewCompanyForm] = useState(false);

  const handleLoadCompanies = () => {
    setLoadCompanies(!loadCompanies);
  };

  const handleLoadNewCompanyForm = () => {
    setloadNewCompanyForm(!loadNewCompanyForm);
  };

  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>
              <Button onClick={handleLoadCompanies}>
                {!loadCompanies ? 'ALL COMPANIES' : 'HIDE COMPANIES'}
              </Button>
            </li>
            <li>
              <Button onClick={handleLoadNewCompanyForm}>ADD NEW COMPANY</Button>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <div>{loadCompanies ? <Companies /> : <></>}</div>
        {loadNewCompanyForm && <CompanyForm handleClose={() => setloadNewCompanyForm(false)}/>}
      </div>
    </>
  );
}

export default MainNavigation;
