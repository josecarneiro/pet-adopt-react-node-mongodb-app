import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { signOut, verify } from './services/authentication';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import CreatePet from './views/CreatePet';
import SinglePet from './views/SinglePet';
import RandomPet from './views/RandomPet';
import IndividualProfile from './views/IndividualProfile';
import ShelterProfile from './views/ShelterProfile';
import IndividualPreferences from './views/IndividualPreferences';
import ShelterDonation from './views/ShelterDonation';
import ShelterDonationThankYou from './views/ShelterDonationThankYou';
import ErrorPage from './views/ErrorPage';

class App extends Component {
  state = {
    user: null,
    loaded: false
  };

  async componentDidMount() {
    const user = await verify();
    this.handleUserChange(user);
    this.setState({ loaded: true });
  }

  handleUserChange = user => {
    this.setState({ user });
  };

  handleSignOut = async () => {
    await signOut();
    this.handleUserChange(null);
  };

  render() {
    const user = this.state.user;
    return (
      <HelmetProvider>
        <BrowserRouter>
          <Helmet>
            <title>Pet Adopt</title>
          </Helmet>
          <Navbar user={user} onSignOut={this.handleSignOut} />
          {this.state.loaded && (
            <Switch>
              <Route path="/" component={Home} exact />
              <ProtectedRoute
                path="/sign-in"
                render={props => (
                  <SignIn {...props} onUserChange={this.handleUserChange} />
                )}
                authorized={!user}
                redirect="/"
                exact
              />
              <ProtectedRoute
                path="/sign-up"
                render={props => (
                  <SignUp {...props} onUserChange={this.handleUserChange} />
                )}
                authorized={!user}
                redirect="/"
                exact
              />
              <ProtectedRoute
                path="/pet/create"
                component={CreatePet}
                authorized={user && user.role === 'shelter'}
                redirect="/sign-in"
                exact
              />
              <ProtectedRoute
                path="/pet/random"
                component={RandomPet}
                authorized={user && user.role === 'individual'}
                redirect="/sign-in"
                exact
              />
              <Route path="/pet/:id" component={SinglePet} exact />
              <Route
                path="/individual/:id"
                component={IndividualProfile}
                exact
              />
              <Route path="/shelter/:id" component={ShelterProfile} exact />
              <ProtectedRoute
                path="/shelter/:id/donate"
                component={ShelterDonation}
                authorized={user && user.role === 'individual'}
                redirect="/sign-in"
                exact
              />
              <ProtectedRoute
                path="/shelter/:id/donate/thank-you"
                component={ShelterDonationThankYou}
                authorized={user && user.role === 'individual'}
                redirect="/sign-in"
                exact
              />
              <ProtectedRoute
                path="/preferences"
                render={props => (
                  <IndividualPreferences
                    {...props}
                    user={user}
                    onUserChange={this.handleUserChange}
                  />
                )}
                authorized={user && user.role === 'individual'}
                redirect="/sign-in"
                exact
              />
              <Route path="/error" component={ErrorPage} />
              <Redirect to="/error" />
            </Switch>
          )}
        </BrowserRouter>
      </HelmetProvider>
    );
  }
}

export default App;
