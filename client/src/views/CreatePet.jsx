import React, { Component } from 'react';
import { createPet } from './../services/pet';

class CreatePet extends Component {
  state = {
    name: '',
    species: '',
    breed: '',
    age: '',
    size: '',
    gender: '',
    qualities: [],
    steralized: false,
    conditions: [],
    description: ''
    // pictures: '',
  };

  handleFormSubmission = async event => {
    event.preventDefault();
    const {
      name,
      species,
      breed,
      age,
      size,
      gender,
      qualities,
      steralized,
      conditions,
      description
    } = this.state;
    const pet = await createPet({
      name,
      species,
      breed,
      age,
      size,
      gender,
      qualities,
      steralized,
      conditions,
      description
    });
    this.props.history.push('/');
    // this.props.history.push(`/pet/${pet._id}`);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCheckboxInputChange = event => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmission}>
          <label htmlFor="input-name">Name</label>
          <input
            id="input-name"
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-species">Species</label>
          <select
            id="input-species"
            name="species"
            value={this.state.species}
            onChange={this.handleInputChange}
            required
          >
            <option value="" disabled>
              Species
            </option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>

          <label htmlFor="input-breed">Breed</label>
          <input
            id="input-breed"
            name="breed"
            type="text"
            placeholder="Breed"
            value={this.state.breed}
            onChange={this.handleInputChange}
          />

          <label htmlFor="input-age">Age</label>
          <input
            id="input-age"
            name="age"
            type="number"
            placeholder="Age"
            min="0"
            value={this.state.age}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-size">Size</label>
          <select
            id="input-size"
            name="size"
            value={this.state.size}
            onChange={this.handleInputChange}
            required
          >
            <option value="" disabled>
              Size
            </option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <label htmlFor="input-gender">Gender</label>
          <select
            id="input-gender"
            name="gender"
            value={this.state.gender}
            onChange={this.handleInputChange}
          >
            <option value="">Non-specied</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <label htmlFor="input-qualities">Qualities</label>
          <input
            id="input-qualities"
            name="qualities"
            type="text"
            placeholder="Qualities"
            value={this.state.qualities}
            onChange={this.handleInputChange}
            disabled
          />

          <label htmlFor="input-steralized">Steralized</label>
          <input
            id="input-steralized"
            name="steralized"
            type="checkbox"
            value={this.state.steralized}
            onChange={this.handleCheckboxInputChange}
          />

          <label htmlFor="input-conditions">Conditions</label>
          <input
            id="input-conditions"
            name="conditions"
            type="text"
            placeholder="Conditions"
            value={this.state.conditions}
            onChange={this.handleInputChange}
            disabled
          />

          <label htmlFor="input-description">Description</label>
          <textarea
            id="input-description"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />

          <button>Create Pet</button>
        </form>
      </div>
    );
  }
}

export default CreatePet;
