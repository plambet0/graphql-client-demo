import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid } from '@material-ui/core';

const CREATE_COMPANY = gql`
  mutation addCompany($input: AddCompanyInput!) {
    addCompany(input: $input) {
      id
      name
    }
  }
`;

const UPDATE_COMPANY = gql`
  mutation updateCompany($id: Int!, $input: UpdateCompanyInput!) {
    updateCompany(id: $id, input: $input) {
      id
      name
    }
  }
`;

function CompanyForm({ handleClose, companyInput }) {
  const [companyName, setCompanyName] = useState(companyInput?.name || '');
  const [companyType, setCompanyType] = useState(companyInput?.company_type.id || '');
  const [mktActivity, setMktActivity] = useState(companyInput?.market_activity.id || '');
  const [membership, setMembership] = useState(companyInput?.membership.id || '');
  const [memberIndex, setmemberIndex] = useState(companyInput?.member_index || '');
  const [isMainMember, setisMainMember] = useState(companyInput?.is_main_member || '');
  const [addCompany] = useMutation(CREATE_COMPANY);
  const [updateCompany] = useMutation(UPDATE_COMPANY);
  const [formErrors, setFormErrors] = useState({});

  const errorTexts = {
    name: 'Name is required!',
    companyType: 'Company type is required!',
    mactivity: 'Market activity is required!',
    is_main_member: 'Is main member is required!',
    membership: 'Membership is required',
    memberIndex: 'Member index is required'
  };

  const handleSumbit = () => {
    let hasErrors = false;
    const errors = {
      name: null,
      companyType: null,
      marketActivity: null,
      memberIndex: null,
      isMainMember: null,
      membership: null
    };

    if (!companyName || companyName.length === 0) {
      hasErrors = true;
      errors.name = errorTexts.companyType;
    }
    if (!companyType) {
      hasErrors = true;
      errors.companyType = errorTexts.name;
    }
    if (!mktActivity) {
      hasErrors = true;
      errors.marketActivity = errorTexts.mactivity;
    }
    if (!isMainMember) {
      hasErrors = true;
      errors.isMainMember = errorTexts.is_main_member;
    }
    if (!membership) {
      hasErrors = true;
      errors.membership = errorTexts.membership;
    }
    if (!memberIndex) {
      hasErrors = true;
      errors.memberIndex = errorTexts.memberIndex;
    }
    if (hasErrors) {
      setFormErrors(errors);
    } else {
      const input = {
        name: companyName,
        company_type_id: parseInt(companyType),
        market_activity_id: parseInt(mktActivity),
        member_index: Boolean(memberIndex),
        is_main_member: Boolean(isMainMember),
        membership_id: parseInt(membership)
      };
      if (!companyInput) {
        addCompany({
          variables: {
            input
          }
        });
        handleClose();
      } else {
        updateCompany({
          variables: {
            id: parseInt(companyInput.id),
            input
          }
        });
        handleClose();
      }
    }
  };

  return (
    <Dialog id="new-company-dialog" open={true}>
      <DialogTitle
        id="form-dialog-title"
        style={{
          textAlign: 'center',
          paddingTop: '15px',
          paddingBottom: '13px'
        }}
      >
        <span
          style={{
            margin: 'auto',
            letterSpacing: '-0.01px',
            fontSize: '22px',
            lineHeight: '33px',
            opacity: '1px',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          Create company
        </span>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Grid container style={{ marginTop: '38px' }}>
          <Grid item xs={12}>
            <TextField
              style={{ marginTop: 0 }}
              fullWidth
              required
              id="company-name"
              data-testid="company-name-input-label"
              label="Company Name (full)"
              name="companyName"
              error={formErrors.name !== null}
              helperText={formErrors.name ? formErrors.name : ''}
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: 0 }}
                fullWidth
                required
                id="company-type"
                data-testid="company-type-input-label"
                label="Company Type "
                name="companyType"
                error={formErrors.companyType !== null}
                helperText={formErrors.companyType ? formErrors.companyType : ''}
                value={companyType}
                onChange={(e) => {
                  setCompanyType(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: 0 }}
                fullWidth
                required
                id="market-activity"
                data-testid="market-activity-input-label"
                label="Market Activity "
                name="mktActivity"
                error={formErrors.marketActivity !== null}
                helperText={formErrors.marketActivity ? formErrors.marketActivity : ''}
                value={mktActivity}
                onChange={(e) => {
                  setMktActivity(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: 0 }}
                fullWidth
                required
                id="membership-id"
                data-testid="membership-id-input-label"
                label="Membership "
                name="membership"
                error={formErrors.membership !== null}
                helperText={formErrors.membership ? formErrors.membership : ''}
                value={membership}
                onChange={(e) => {
                  setMembership(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: 0 }}
                fullWidth
                required
                id="memberIndex"
                data-testid="memberIndex-input-label"
                label="Member Index "
                name="memberIndex"
                error={formErrors.memberIndex !== null}
                helperText={formErrors.memberIndex ? formErrors.memberIndex : ''}
                value={memberIndex}
                onChange={(e) => {
                  setmemberIndex(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ marginTop: 0 }}
                fullWidth
                required
                id="isMainMember"
                data-testid="isMainMember-input-label"
                label="Is Main Member "
                name="isMainMember"
                error={formErrors.isMainMember !== null}
                helperText={formErrors.isMainMember ? formErrors.isMainMember : ''}
                value={isMainMember}
                onChange={(e) => {
                  setisMainMember(e.target.value);
                }}
              />
            </Grid>
            <Grid container style={{ marginTop: '115px', marginBottom: '40px' }}>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  id="cancel-new-company-button"
                  data-testid="cancel-new-company-button"
                  className={''}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  id="create-new-company-button"
                  data-testid="create-new-company-button"
                  className={''}
                  onClick={handleSumbit}
                >
                  {!companyInput ? 'CREATE' : 'UPDATE'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CompanyForm;
