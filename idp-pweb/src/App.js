import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/contexts";
import Navbar from './components/navbar/navbar';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import PrivateRoute from './components/private-route/private-route';
import About from './components/about/about';
import OfferForm from './components/offer-form/offer-form';

function App() {
  return (
    <div className="align-items-center justify-content-center set-font">
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Navbar/>
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" component={About} />
              <Route exact path="/offer" component={OfferForm} />
            </Switch>
          </AuthProvider> 
        </Router>
      </div>
    </div>
  );
}

export default App;