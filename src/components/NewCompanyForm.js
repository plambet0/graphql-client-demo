import Card from './layout/Card';
import classes from './NewCompanyForm.module.css';

function NewCompanyForm() {
  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">COMPANY NAME</label>
          <input type="text" required id="name" />
        </div>
        <div className={classes.actions}>
          <button>CREATE COMPANY</button>
        </div>
      </form>
    </Card>
  );
}

export default NewCompanyForm;
