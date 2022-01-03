import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AuthorizedContainer from './containers/AuthorizedContainer/index.jsx'

import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/Register';
import Horse from  './components/Horses';
import './App.css';

function App() {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path ="/sign-in" element={<SignIn />}/>
              <Route path ="/sign-up" element={<SignUp />}/>
              <Route path="/horse/:id" element={<AuthorizedContainer/>}>
                      <Route path="/horse/:id" element={<Horse/>} />
              </Route>
             
          </Routes>
      </Router>

  );
}

export default App;
