import Card from './layout/Card';
import classes from './UpdateCompanyForm.module.css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UPDATE_COMPANY = gql`
  mutation updateCompany($id: Int!, $input: UpdateCompanyInput!) {
    updateCompany(id: $id, input: $input) {
      id
      name
    }
  }
`;

function UpdateCompanyForm() {
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [mktActivity, setMktActivity] = useState('');
  const [membership, setMembership] = useState('');
  const [memberIndex, setmemberIndex] = useState('');
  const [isMainMember, setisMainMember] = useState('');
  const [updateCompany] = useMutation(UPDATE_COMPANY);
  const { id } = useParams();
  const updateCompanyFunc = (id) => {
    updateCompany({
      variables: {
        id: parseInt(id),
        input: {
          name: companyName,
          company_type_id: parseInt(companyType),
          market_activity_id: parseInt(mktActivity),
          member_index: Boolean(memberIndex),
          is_main_member: Boolean(isMainMember),
          membership_id: parseInt(membership)
        }
      }
    });
  };

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>``
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
              setmemberIndex(e.target.value);
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
              setisMainMember(e.target.value);
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
          <button onClick={() => updateCompanyFunc(id)}>UPDATE COMPANY</button>
        </div>
      </form>
    </Card>
  );
}

export default UpdateCompanyForm;
