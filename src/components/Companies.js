import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import classes from './Companies.module.css';
import Company from './Company';

const GET_COMPANIES = gql`
  query getCompanies {
    companies {
      id
      name
    #   companyType {
    #     name
    #   }
    }
  }
`;

function Companies() {
  const { data, loading, error } = useQuery(GET_COMPANIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul className={classes.list}>
      {data.companies.map((company) => (
        <Company
          key={company.id}
          id={company.id}
          name={company.name}
          //companyType={company.companyType.name}
        />
      ))}
    </ul>
  );
}

export default Companies;
