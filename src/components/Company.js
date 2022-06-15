import classes from './Company.module.css';
import Card from './layout/Card';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import CompanyForm from './CompanyForm';

const DELETE_COMPANY = gql`
  mutation deleteCompany($id: Int!) {
    deleteCompany(id: $id)
  }
`;

function Company(props) {
  const [deleteCompany] = useMutation(DELETE_COMPANY);
  const [openUpdateForm, setopenUpdateForm] = useState(false);

  const handleOpenUpdateForm = () => {
    setopenUpdateForm(true);
  };

  const deleteCompanyFunc = (id) => {
    deleteCompany({
      variables: {
        id: parseInt(id)
      }
    });
  };

  return (
    <li key={props.id} className={classes.company}>
      <Card>
        <div className={classes.content}>
          <p>ID: {props.id}</p>
          <p>NAME: {props.name}</p>
          <p>COMPANY TYPE: {props.company_type.name}</p>
          <p>MEMBERSHIP: {props.membership.name}</p>
          <p>MEMBER INDEX: {props.member_index}</p>
          <p>IS MAIN MEMBER: {props.is_main_member}</p>
          <p>MARKET ACTIVITY: {props.market_activity.name}</p>
        </div>
        <div className={classes.actions}>
          <Button onClick={handleOpenUpdateForm} className={classes.update}>
            UPDATE COMPANY
          </Button>
          <Button onClick={() => deleteCompanyFunc(props.id)}>DELETE COMPANY</Button>
        </div>
        {openUpdateForm && (
          <CompanyForm handleClose={() => setopenUpdateForm(false)} companyInput={props} />
        )}
      </Card>
    </li>
  );
}

export default Company;
