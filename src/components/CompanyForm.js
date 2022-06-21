import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';
import { GET_COMPANIES } from './Companies';

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

const GET_COMPANYTYPES = gql`
  query getCompanyTypes {
    companyTypes {
      id
      name
    }
  }
`;

const GET_MEMBERSHIPS = gql`
  query getMemberships {
    memberships {
      id
      name
    }
  }
`;

const GET_MARKETACTIVITIES = gql`
  query getMarketActivities {
    marketActivities {
      id
      name
    }
  }
`;



const useStyles = makeStyles(() => ({
  paperNew: {
    maxWidth: '1400px',
    width: '1400px',
    height: '680px'
  },
  cancelButton: {
    width: '125px',
    height: '36px',
    border: '1px solid ' + '#2274BC',
    color: '#2274BC',
    fontFamily: 'Overpass',
    textTransform: 'uppercase',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0px',
    FontWeights: {
      light: 300,
      regular: 400,
      semiBold: 600,
      bold: 700
    }
  }
}));
const leftGridStyle = {
  paddingLeft: '11%',
  paddingRight: '0.1%',
};

const gridItem = {
  height: '51px',
  marginTop: '30px'
};

function CompanyForm({ handleClose, companyInput }) {
  const classes = useStyles();
  const [companyName, setCompanyName] = useState(companyInput?.name || '');
  const [companyType, setCompanyType] = useState(companyInput?.company_type || '');
  const [mktActivity, setMktActivity] = useState(companyInput?.market_activity || '');
  const [membership, setMembership] = useState(companyInput?.membership || '');
  const [memberIndex, setmemberIndex] = useState(companyInput?.member_index || '');
  const [isMainMember, setisMainMember] = useState(companyInput?.is_main_member || '');
  const [addCompany] = useMutation(CREATE_COMPANY);
  const [updateCompany] = useMutation(UPDATE_COMPANY);
  const [formErrors, setFormErrors] = useState({});
  const { data: dataCompanyTypes } = useQuery(GET_COMPANYTYPES);
  const [allDataCompanyTypes, setallDataCompanyTypes] = useState([]);
  const { data:datamemberships} = useQuery(GET_MEMBERSHIPS);
  const [allDataMemberships, setallDataMemberships] = useState([]);
  const { data:dataMarketActivities} = useQuery(GET_MARKETACTIVITIES);
  const [allDataMarketActivities, setallDataMarketActivities] = useState([]);

  useEffect(() => {
    if (dataCompanyTypes && dataCompanyTypes.companyTypes){
      setallDataCompanyTypes(dataCompanyTypes.companyTypes);
    }
  }, [dataCompanyTypes]);

  useEffect(() => {
    if (datamemberships && datamemberships.memberships){
      setallDataMemberships(datamemberships.memberships);
    }
  }, [datamemberships]);

  useEffect(() => {
    if (dataMarketActivities && dataMarketActivities.marketActivities){
      setallDataMarketActivities(dataMarketActivities.marketActivities);
    }
  }, [dataMarketActivities]);


  const errorTexts = {
    companyName: 'Company name is required!',
    companyType: 'Company type is required!',
    mactivity: 'Market activity is required!',
    is_main_member: 'Is main member is required!',
    membership: 'Membership is required',
    memberIndex: 'Member index is required'
  };

  const handleSumbit = () => {
    let hasErrors = false;
    const errors = {
      companyName: null,
      companyType: null,
      marketActivity: null,
      memberIndex: null,
      isMainMember: null,
      membership: null
    };

    if (!companyName || companyName.length === 0) {
      hasErrors = true;
      errors.companyName = errorTexts.companyName;
    }
    if (!companyType) {
      hasErrors = true;
      errors.companyType = errorTexts.companyType;
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
        company_type_id: parseInt(companyType.id),
        market_activity_id: parseInt(mktActivity.id),
        member_index: Boolean(memberIndex),
        is_main_member: Boolean(isMainMember),
        membership_id: parseInt(membership.id)
      };
      if (!companyInput) {
        addCompany({
          variables: {
            input
          }, update(cache, {data: {addCompany} }){
            const { companies } = cache.readQuery({query : GET_COMPANIES});
            cache.writeQuery({
              query: GET_COMPANIES,
              data: { companies: [addCompany,...companies]},
            });
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
    <Dialog 
    id="new-company-dialog" 
    open={true} 
    classes={{ paper: classes.paperNew }}
    >
      <DialogTitle
        id="form-dialog-title"
        style={{
          borderBottom: '1px solid ' + '#0EAEFF',
          textAlign: 'center',
          paddingTop: '15px',
          paddingBottom: '13px'
        }}
      >
        <span
          style={{
            margin: 'auto',
            color: '#0EAEFF',
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
      <DialogContent style={{ padding: 0, width:'170%'}}>
        <Grid container style={{ marginTop: '38px' }}>
          <Grid item xs={6} style={leftGridStyle}>
            <TextField
              style={{ ...gridItem, marginTop: 0 }}
              fullWidth
              required
              id="company-name"
              data-testid="company-name-input-label"
              label="Company Name (full)"
              name="companyName"
              error={formErrors.companyName !== null}
              helperText={formErrors.companyName ? formErrors.companyName : ''}
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.companyName !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' },
                'data-testid': 'company-name-input-field'
              }}
            />
            <Grid container>
            <Grid item xs={6} style={{ paddingRight: '2.5%' }}>
            <Autocomplete
                  id="company-types-autocomplete"
                  data-testid="company-types-autocomplete"
                  style={gridItem}
                  options={(allDataCompanyTypes)}
                  getOptionLabel={(option) => option?.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      InputLabelProps={{
                        style: {
                          color: formErrors.companyType !== null ? 'red' : '#12497F'
                        }
                      }}
                      inputProps={{
                        ...params.inputProps,
                        'data-testid': 'company-type-input-field'
                      }}
                      label="Company Type"
                      data-testid="company-type-input-label"
                      name="company-type-input"
                      error={formErrors.companyType !== null}
                      helperText={formErrors.companyType ? formErrors.companyType : ''}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setCompanyType(newValue);
                  }}
                  defaultValue={companyType}
                />
            </Grid>
            <Grid item xs={6} style={{ paddingRight: '2.5%' }}>
            <Autocomplete
                  id="market-activities-autocomplete"
                  data-testid="market-activities-autocomplete"
                  style={gridItem}
                  options={(allDataMarketActivities)}
                  getOptionLabel={(option) => option?.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      InputLabelProps={{
                        style: {
                          color: formErrors.marketActivity !== null ? 'red' : '#12497F'
                        }
                      }}
                      inputProps={{
                        ...params.inputProps,
                        'data-testid': 'market-activity-input-field'
                      }}
                      label="Market Activity"
                      data-testid="market-acivity-input-label"
                      name="market-activity-input"
                      error={formErrors.marketActivity !== null}
                      helperText={formErrors.marketActivity ? formErrors.marketActivity : ''}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setMktActivity(newValue);
                  }}
                  defaultValue={mktActivity}
                />
            </Grid>
            </Grid>
            <Grid container>
            <Grid item xs={6} style={{ paddingRight: '2.5%' }}>
            <Autocomplete
                  id="memberships-autocomplete"
                  data-testid="memberships-autocomplete"
                  style={gridItem}
                  options={(allDataMemberships)}
                  getOptionLabel={(option) => option?.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      InputLabelProps={{
                        style: {
                          color: formErrors.membership!== null ? 'red' : '#12497F'
                        }
                      }}
                      inputProps={{
                        ...params.inputProps,
                        'data-testid': 'membership-input-field'
                      }}
                      label="Membership"
                      data-testid="membership-input-label"
                      name="membership-input"
                      error={formErrors.membership !== null}
                      helperText={formErrors.membership ? formErrors.membership : ''}
                    />
                  )}
                  onChange={(event, newValue) => {
                    setMembership(newValue);
                  }}
                  defaultValue={membership}
                />
            </Grid>
            <Grid item xs={6} style={{ paddingRight: '2.5%' }}>
              <TextField
                style={{ ...gridItem, marginTop: 0 }}
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
                InputLabelProps={{
                  style: {
                    color: formErrors.memberIndex !== null ? 'red' : '#12497F'
                  }
                }}
                inputProps={{
                  style: { color: '#12497F' },
                  'data-testid': 'memberIndex-input-field'
                }}
              />
            </Grid>
            <Grid item xs={6} style={{ paddingRight: '2.5%' }}>
              <TextField
                style={{ ...gridItem, marginTop: 0 }}
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
                InputLabelProps={{
                  style: {
                    color: formErrors.isMainMember !== null ? 'red' : '#12497F'
                  }
                }}
                inputProps={{
                  style: { color: '#12497F' },
                  'data-testid': 'isMainMember-input-field'
                }}
              />
            </Grid>
            <Grid container style={{ marginTop: '115px', marginBottom: '40px' }}>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                <Button
                  id="cancel-new-company-button"
                  data-testid="cancel-new-company-button"
                  className={classes.cancelButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  id="create-new-company-button"
                  data-testid="create-new-company-button"
                  className={classes.cancelButton}
                  onClick={handleSumbit}
                >
                  {!companyInput ? 'CREATE' : 'UPDATE'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default CompanyForm;
