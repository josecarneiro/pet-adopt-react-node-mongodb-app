import React, { Component } from 'react';

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.name}</h1>
      </div>
    );
  }
}

export default Private;
