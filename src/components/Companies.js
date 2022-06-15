import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import classes from './Companies.module.css';
import Company from './Company';
import { TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';

const GET_COMPANIES = gql`
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

function Companies() {
  const { data, loading, error } = useQuery(GET_COMPANIES);
  const [query, setQuery] = useState('');
  //const [company, setCompany] = useState('');
  //const [allData, setAllData] = useState([]);

  // useEffect(() => {
  //   if (data) {
  //     setAllData(data);
  //   }
  // }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <TextField
        placeholder="Search by Name  ..."
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <ul className={classes.list}>
        {data.companies
          .filter((info) => {
            if (query === '') {
              return info;
            } else if (info.name.toLowerCase().includes(query.toLocaleLowerCase())) {
              return info;
            }
          })
          .map((info) => (
            <Company {...info} />
          ))}
      </ul>
    </div>
  );
}

export default Companies;
