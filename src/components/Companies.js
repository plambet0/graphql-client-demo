import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import classes from './Companies.module.css';
import Company from './Company';

const GET_COMPANIES = gql`
  query getCompanies {
  companies{
    id
    company_type{
      name
    }
    membership{
      name
    }
    member_index
    is_main_member
    market_activity{
      name
    }
  }
}
`;

function Companies() {
  const { data, loading, error } = useQuery(GET_COMPANIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul className={classes.list}>
      {data.companies.map((info) => (
        <Company {...info} />
      ))}
    </ul>
  );
}

export default Companies;
