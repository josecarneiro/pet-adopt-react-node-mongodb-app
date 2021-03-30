import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { loadPet } from './../services/pet';

class SinglePet extends Component {
  state = {
    pet: null
  };

  async componentDidMount() {
    const pet = await loadPet(this.props.match.params.id);
    this.setState({ pet });
  }

  render() {
    const pet = this.state.pet;
    return (
      <main>
        {pet && (
          <>
            <h1>{pet.name}</h1>
            <img
              src="https://source.unsplash.com/200x200/?dog"
              alt={pet.name}
            />
            <span>{pet.size}</span>
            <br />
            <span>{pet.age}</span>
            <br />
            <span>{pet.breed}</span>
            <br />
            <span>{pet.species}</span>
          </>
        )}
      </main>
    );
  }
}

export default SinglePet;
