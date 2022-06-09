import classes from './Company.module.css';
import Card from './layout/Card';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const DELETE_COMPANY = gql`
  mutation deleteCompany($id: Int!) {
    deleteCompany(id: $id)
  }
`;

function Company(props) {
  const [deleteCompany] = useMutation(DELETE_COMPANY);

  const deleteCompanyFunc = (id) => {
    deleteCompany({
      variables: {
        id: parseInt(id)
      }
    });
  };
  return (
    <li className={classes.company}>
      <Card>
        <div className={classes.content}>
          <p>ID: {props.id}</p>
          <p>NAME: {props.name}</p>
          {/* <p>COMPANY_TYPE: {props.companyType}</p> */}
        </div>
        <div className={classes.actions}>
          <Link to={`/updateCompany/${props.id}`}>
            <button className={classes.update}>UPDATE COMPANY</button>
          </Link>
          <button onClick={() => deleteCompanyFunc(props.id)}>DELETE COMPANY</button>
        </div>
      </Card>
    </li>
  );
}

export default Company;
