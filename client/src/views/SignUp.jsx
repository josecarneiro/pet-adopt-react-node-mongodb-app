import React, { Component } from 'react';
import { signUp } from './../services/api';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    picture: ''
  };

  handleFormSubmission = async event => {
    event.preventDefault();
    const { name, email, password, picture } = this.state;
    // If we want to send a file with the request body
    // we cannot send a simple object
    // we need to send an object instantiated from FormData
    const data = new FormData();
    // data.append('name', name);
    // data.append('email', email);
    // data.append('password', password);
    // data.append('picture', picture);
    const values = { name, email, password, picture };
    for (let key in values) {
      data.append(key, values[key]);
    }
    const user = await signUp(data);
    this.props.onUserChange(user);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFileInputChange = event => {
    const { name, files } = event.target;
    const file = files[0];
    this.setState({
      [name]: file
    });
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            type="text"
            placeholder="James Dean"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            placeholder="james@example.com"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label htmlFor="profile-picture-input">Profile Picture</label>
          <input
            id="profile-picture-input"
            type="file"
            name="picture"
            onChange={this.handleFileInputChange}
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

          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
