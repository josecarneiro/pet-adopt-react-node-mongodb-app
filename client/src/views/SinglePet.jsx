import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadPet } from './../services/pet';
import { Helmet } from 'react-helmet-async';
import {
  sizesOptions,
  speciesOptions,
  qualitiesOptions,
  getHumanReadableGender
} from './../common';

import './SinglePet.scss';

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
      <main className="page--single-pet">
        {pet && (
          <>
            <Helmet>
              <title>Pet Adopt - Adopt {pet.name}</title>
            </Helmet>
            {pet.pictures.length && (
              <img src={pet.pictures[0]} alt={pet.name} />
            )}
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
            <Link>Shelter</Link>
            <Link className="button" to="/pet/id/adopt">
              Adopt this Pet
            </Link>
          </>
        )}
      </main>
    );
  }
}

export default SinglePet;
