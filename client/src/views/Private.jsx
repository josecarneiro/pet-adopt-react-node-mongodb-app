import React, { Component } from 'react';

class Private extends Component {
  render() {
    return (
      <main>
        <h1>Welcome {this.props.user.name}</h1>
      </main>
    );
  }
}

export default Private;
