import classes from './Company.module.css';
import Card from './layout/Card';


function Company(props) {
  return (
    <li className={classes.company}>
        <Card>
      <div className={classes.content}>
        <p>ID: {props.id}</p>
        <p>NAME: {props.name}</p>
        {/* <p>COMPANY_TYPE: {props.companyType}</p> */}
      </div>
      <div className={classes.actions}>
        <button className={classes.update}>UPDATE COMPANY</button>
        <button>DELETE COMPANY</button>
      </div>
      </Card>
    </li>
  );
}

export default Company;
