import Card from './layout/Card';
import classes from './NewCompanyForm.module.css';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';

const CREATE_COMPANY = gql`
  mutation addCompany($input: AddCompanyInput!) {
    addCompany(input: $input) {
      id
      name
    }
  }
`;

function NewCompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [mktActivity, setMktActivity] = useState('');
  const [membership, setMembership] = useState('');
  const [epraWatchIndex, setEpraWatchIndex] = useState('');
  const [addCompany, { error }] = useMutation(CREATE_COMPANY);

  const handleAddCompany = () => {
    addCompany({
      variables: {
        input: {
          name: companyName,
          company_type_id: parseInt(companyType),
          market_activity_id: parseInt(mktActivity),
          member_index: Boolean(epraWatchIndex),
          is_main_member: Boolean(epraWatchIndex),
          membership_id: parseInt(membership)
        }
      }
    });
  };

  if (error) {
    console.log(error);
  }
  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">COMPANY NAME</label>
          <input
            type="text"
            required
            id="name"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="company_type_id">COMPANY TYPE</label>
          <input
            type="text"
            required
            id="company_type_id"
            onChange={(e) => {
              setCompanyType(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="market_activity_id">MARKET ACTIVITY</label>
          <input
            type="text"
            required
            id="market_activity_id"
            onChange={(e) => {
              setMktActivity(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="member_index">MEMBER INDEX</label>
          <input
            type="text"
            required
            id="member_index"
            onChange={(e) => {
              setEpraWatchIndex(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="is_main_member">IS MAIN MEMBER</label>
          <input
            type="text"
            required
            id="is_main_member"
            onChange={(e) => {
              setEpraWatchIndex(e.target.value);
            }}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="membership_id">MEMBERSHIP</label>
          <input
            type="text"
            required
            id="membership_id"
            onChange={(e) => {
              setMembership(e.target.value);
            }}
          />
        </div>
        <div className={classes.actions}>
          <button onClick={handleAddCompany}>CREATE COMPANY</button>
        </div>
      </form>
    </Card>
  );
}

export default NewCompanyForm;