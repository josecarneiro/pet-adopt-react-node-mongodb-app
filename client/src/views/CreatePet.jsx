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
    sterilized: false,
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
      sterilized,
      conditions,
      description,
      pictures
    } = this.state;
    const data = {
      name,
      species,
      breed,
      age,
      size,
      gender,
      qualities,
      sterilized,
      conditions,
      description,
      pictures
    };
    const body = new FormData();
    // To do:
    // Figure out why form data request bodies with empty array
    // sends empty string
    for (let key in data) {
      const value = data[key];
      if (value instanceof Array) {
        for (let item of value) {
          body.append(key, item);
        }
      } else {
        body.append(key, value);
      }
    }
    const pet = await createPet(body);
    this.props.history.push(`/pet/${pet._id}`);
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

  handleFileInputChange = event => {
    const { name, files } = event.target;
    const arrayOfFiles = [];
    for (const file of files) arrayOfFiles.push(file);
    this.setState({
      [name]: arrayOfFiles
    });
  };

  render() {
    return (
      <main>
        <header>
          <h1>Add a Pet for Adoption</h1>
        </header>
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

          <div className="row">
            <div className="col">
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
            </div>
            <div className="col">
              <label htmlFor="input-breed">Breed</label>
              <input
                id="input-breed"
                name="breed"
                type="text"
                placeholder="Breed"
                value={this.state.breed}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
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
            </div>
            <div className="col">
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
            </div>
            <div className="col">
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
            </div>
          </div>

          <label htmlFor="input-sterilized">Sterilized</label>
          <input
            id="input-sterilized"
            name="sterilized"
            type="checkbox"
            value={this.state.sterilized}
            onChange={this.handleCheckboxInputChange}
          />

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

          <label htmlFor="input-pictures">Pictures</label>
          <input
            id="input-pictures"
            type="file"
            name="pictures"
            multiple
            required
            onChange={this.handleFileInputChange}
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
      </main>
    );
  }
}

export default CreatePet;
