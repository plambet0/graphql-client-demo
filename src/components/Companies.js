import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
// import classes from './Companies.module.css';
// import Company from './Company';
import { Box, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CompanyForm from './CompanyForm';
import { useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import { hover } from '@testing-library/user-event/dist/hover';

export const GET_COMPANIES = gql`
  query getCompanies {
    companies {
      id
      name
      company_type {
        id
        name
      }
      membership {
        id
        name
      }
      member_index
      is_main_member
      market_activity {
        id
        name
      }
    }
  }
`;

const DELETE_COMPANY = gql`
  mutation deleteCompany($id: Int!) {
    deleteCompany(id: $id)
  }
`;
const useStyles = makeStyles(() => ({
  Button: {
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
    },
    '&:hover':{
    color: 'blue',
    boxShadow: '0px 2px 10px grey',
    }
  }
}));

function Companies() {
  const { data, loading, error } = useQuery(GET_COMPANIES);
  const [query, setQuery] = useState('');
  const [company, setCompany] = useState(null);
  const [allData, setAllData] = useState([]);
  const [deleteCompany] = useMutation(DELETE_COMPANY,
    {
      update(cache, {data: {deleteCompany} }){
        const { companies } = cache.readQuery({query : GET_COMPANIES});
        cache.writeQuery({
          query: GET_COMPANIES,
          data: { companies: companies.concat([deleteCompany])},
        });
      }
    }
    
  );
  const classes = useStyles();

  
  
  const renderEdit = ({row}) => {
    return <EditIcon 
    className={classes.Button}
    onClick={() => setCompany(row)}>
      EDIT</EditIcon>
  }

  const renderDelete = ({row}) => {
    return <DeleteIcon 
     className={classes.Button} 
     style={{color: '#F44336', border: '1px solid ' + '#F44336'}} 
     onClick={() => deleteCompanyFunc(row.id, row.name)}>
       DELETE
       </DeleteIcon >
  }

  const deleteCompanyFunc = (id, name) => {
    deleteCompany({
      variables: {
        id: parseInt(id)
      }
    });
    alert(`Company "${name}" successfully deleted!`)
  };

  useEffect(() => {
    if (data && data.companies) {
      if (query.length > 0) {
        setAllData(data.companies.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())));
      } else {
        setAllData(data.companies);
      }
    }
  }, [query]);

  useEffect(() => {
    if (data && data.companies) {
      setAllData(data.companies);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: 'super-app-theme--header',
      width: 90
    },
    {
      field: 'Name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      width: 300,
      valueGetter: (params) => params.row.name
    },
    {
      field: 'Company type',
      headerName: 'Company type',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row.company_type.name
    },
    {
      field: 'Membership',
      headerName: 'Membership',
      headerClassName: 'super-app-theme--header',
      width: 300,
      valueGetter: (params) => params.row.membership.name
    },
    {
      field: 'Member index',
      headerName: 'Member index',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row.member_index === true ? "Yes" : "No"
    },
    {
      field: 'Is main member',
      headerName: 'Is main member',
      headerClassName: 'super-app-theme--header',
      width: 200,
      valueGetter: (params) => params.row.is_main_member === true ? "Yes" : "No"
    },
    {
      field: 'Market Activity',
      headerName: 'Market Activity',
      headerClassName: 'super-app-theme--header',
      width: 300,
      valueGetter: (params) => params.row.market_activity.name
    },
    {
      field: 'EDIT',
      headerName: 'EDIT',
      headerClassName: 'super-app-theme--header',
      width: 140,
      renderCell: renderEdit
    }
    ,
    {
      field: 'DELETE',
      headerName: 'DELETE',
      headerClassName: 'super-app-theme--header',
      width: 140,
      renderCell: renderDelete
    }
  ];

  return (
    <div>
      <TextField
        placeholder="Search by Name  ..."
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
        <Box 
        sx={{
          height: 900,
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#98a4d7',
          },
        }}>
        <DataGrid
          rows={allData}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          disableSelectionOnClick
        />
        </Box>
        {company && <CompanyForm handleClose={() => setCompany(null)} companyInput={company}/>}
    </div>
  );
}

export default Companies;
