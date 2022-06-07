import Companies from './components/Companies';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div>
      <h1>Companies</h1>
      <Router>
        <Routes>
          <Route path="/companies" element={<Companies />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
