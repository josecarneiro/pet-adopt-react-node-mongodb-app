import { Component } from 'react';

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { loadShelter } from '../services/shelter';
import PetList from '../components/PetList';

class ShelterProfile extends Component {
  state = {
    shelter: null,
    pets: [],
    donations: 0
  };

  async componentDidMount() {
    const { shelter, pets, donations } = await loadShelter(
      this.props.match.params.id
    );
    this.setState({ shelter, pets, donations });
  }

  render() {
    const { shelter, pets, donations } = this.state;
    return (
      <main>
        {shelter && (
          <>
            <Helmet>
              <title>Pet Adopt - {shelter.name}</title>
            </Helmet>
            <h1>{shelter.name}</h1>
            <h3>${donations}€ received so far</h3>
            <Link to={`/shelter/${shelter._id}/donate`}>Donate to Shelter</Link>
            <PetList pets={pets} />
          </>
        )}
      </main>
    );
  }
}

export default ShelterProfile;
