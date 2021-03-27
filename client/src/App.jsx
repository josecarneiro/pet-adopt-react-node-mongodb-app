import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { signOut, verify } from './services/api';

import Home from './views/Home';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Private from './views/Private';

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
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>
          {(this.state.user && (
            <>
              <img
                src={this.state.user.profilePicture}
                alt={this.state.user.name}
              />
              <span>{this.state.user.name}</span>
              <Link to="/private">Private</Link>
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
              path="/private"
              render={props => <Private {...props} user={this.state.user} />}
              exact
              authorized={this.state.user}
              redirect="/sign-in"
            />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
