import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { signOut, verify } from './services/authentication';

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
// import Private from './views/Private';
import CreatePet from './views/CreatePet';
import SinglePet from './views/SinglePet';
import Demo from './views/Demo';

import ProtectedRoute from './components/ProtectedRoute';

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
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          {(user && (
            <>
              {user.profilePicture && (
                <img src={user.profilePicture} alt={user.name} />
              )}
              <span>{user.name}</span>
              {/* <Link to="/private">Private</Link> */}
              {user.role === 'shelter' && (
                <Link to="/pet/create">Create Pet</Link>
              )}
              <button onClick={this.handleSignOut}>Sign Out</button>
            </>
          )) || (
            <>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
        </nav>
        {this.state.loaded && (
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/sign-in"
              render={props => (
                <SignIn {...props} onUserChange={this.handleUserChange} />
              )}
              exact
            />
            <Route
              path="/sign-up"
              render={props => (
                <SignUp {...props} onUserChange={this.handleUserChange} />
              )}
              exact
            />
            <ProtectedRoute
              path="/pet/create"
              component={CreatePet}
              exact
              authorized={user && user.role === 'shelter'}
              redirect="/sign-in"
            />
            <Route path="/pet/:id" component={SinglePet} exact />
            <Route path="/demo" component={Demo} exact />
            {/* <ProtectedRoute
              path="/private"
              render={props => <Private {...props} user={user} />}
              exact
              authorized={user}
              redirect="/sign-in"
            /> */}
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
