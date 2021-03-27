import React, { Component } from 'react';
import { signIn } from './../services/api';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleFormSubmission = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const user = await signIn({ email, password });
    this.props.onUserChange(user);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            placeholder="james@example.com"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            placeholder="A secure password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <button>Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignIn;
