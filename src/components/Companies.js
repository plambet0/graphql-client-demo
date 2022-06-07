import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_COMPANIES = gql`
  query getCompanies {
    companies {
      id
      name
    }
  }
`;

function Companies() {
  const { data, loading, error } = useQuery(GET_COMPANIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.companies.map((company) => (
    <div key={company.id}>
      <p>
        {company.id} - {company.name}
      </p>
    </div>
  ));
}

export default Companies;
