import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query getCompanies {
        companies {
          id
          name
          is_main_member
          membership {
            id
          }
          member_index
          company_type {
            id
            name
          }
        }
      }
    `
  })
  .then((result) => console.log(result));

export default client;
