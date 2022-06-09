import Companies from './components/Companies';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNavigation from './components/layout/MainNavigation';
import NewCompanyForm from './components/NewCompanyForm';
import UpdateCompanyForm from './components/UpdateCompanyForm';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainNavigation />}></Route>
        </Routes>
        <Routes>
          <Route path="/companies" element={<Companies />}></Route>
        </Routes>
        <Routes>
          <Route path="/addNewCompany" element={<NewCompanyForm />}></Route>
        </Routes>
        <Routes>
          <Route path="/updateCompany/:id" element={<UpdateCompanyForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
