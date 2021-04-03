import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPet, adoptPet } from './../services/pet';
import { Helmet } from 'react-helmet-async';
import PictureSlider from './../components/PictureSlider';
import {
  sizesOptions,
  speciesOptions,
  qualitiesOptions,
  getHumanReadableGender
} from './../common';

import './SinglePet.scss';

class SinglePet extends Component {
  state = {
    pet: null,
    application: null
  };

  async componentDidMount() {
    const { pet, application } = await loadPet(this.props.match.params.id);
    this.setState({ pet, application });
  }

  handleAdoptionApplication = async () => {
    const application = await adoptPet(this.props.match.params.id);
    this.setState({ application });
  };

  render() {
    const pet = this.state.pet;
    return (
      <main className="page--single-pet">
        {pet && (
          <>
            <Helmet>
              <title>Pet Adopt - Adopt {pet.name}</title>
            </Helmet>
            {!!pet.pictures.length && <PictureSlider pictures={pet.pictures} />}
            <h1>{pet.name}</h1>
            <span>
              {speciesOptions.find(({ value }) => value === pet.species).label}{' '}
              | {pet.breed} | {getHumanReadableGender(pet.gender)}
            </span>
            <br />
            <span>
              {sizesOptions.find(({ value }) => value === pet.size).label} |{' '}
              {pet.age}
            </span>
            <br />
            <span>{!pet.sterilized && 'Not '}sterilized</span>
            <br />
            {pet.qualities.map(quality => (
              <strong>
                {qualitiesOptions.find(({ value }) => value === quality).label}
              </strong>
            ))}
            {pet.description && <p>{pet.description}</p>}
            <span>
              Up for adoption at{' '}
              <Link to={`/shelter/${pet.shelter._id}`}>{pet.shelter.name}</Link>
            </span>
            <br />
            <button
              className="button"
              disabled={this.state.application}
              onClick={this.handleAdoptionApplication}
            >
              {(this.state.application && 'Applied!') || 'Apply for Adoption'}
            </button>
          </>
        )}
      </main>
    );
  }
}

export default SinglePet;
