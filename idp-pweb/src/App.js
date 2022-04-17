import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/contexts";
import Navbar from './components/navbar/navbar';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import PrivateRoute from './components/private-route/private-route';
import About from './components/about/about';
import OfferForm from './components/offer-form/offer-form';
import InfoPage from './components/info-page/InfoPage';
import OffersList from './components/offers-list/offers-list';
import RequestsList from './components/requests-list/requests-list';
import AccountSettings from './components/account-settings/account-settings';
import NotificationsPage from './components/notifications-page/notifications-page';

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
              <Route exact path="/" component={About} />
              <Route exact path="/offer" component={OfferForm} />
              <Route exact path="/offers" component={OffersList} />
              <Route exact path="/requests" component={RequestsList} />
              <Route exact path="/info" component={InfoPage} />
              <Route exact path="/account" component={AccountSettings} />
              <Route exact path="/notifications" component={NotificationsPage} />
            </Switch>
          </AuthProvider> 
        </Router>
      </div>
    </div>
  );
}

export default App;