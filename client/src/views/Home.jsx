import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { listPets } from './../services/pet';
import PetItem from './../components/PetItem';

class Home extends Component {
  state = {
    pets: []
  };

  async componentDidMount() {
    const pets = await listPets();
    this.setState({ pets });
  }

  render() {
    return (
      <main>
        <header>
          <h1>Choose a pet below</h1>
        </header>
        <div className="pet__list">
          {this.state.pets.map(pet => (
            <Link to={`/pet/${pet._id}`}>
              <PetItem pet={pet} />
            </Link>
          ))}
        </div>
      </main>
    );
  }
}

export default Home;
