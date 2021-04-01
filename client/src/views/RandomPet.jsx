import { Component } from 'react';
import { Link } from 'react-router-dom';
import PetItem from './../components/PetItem';
import { loadRandomPet } from './../services/pet';
import './RandomPet.scss';

class RandomPet extends Component {
  state = {
    pet: null
  };

  componentDidMount() {
    this.loadRandom();
  }

  loadRandom = async () => {
    const pet = await loadRandomPet();
    this.setState({ pet });
  };

  render() {
    const { pet } = this.state;
    return (
      <main className="page--random-pet">
        <header>
          <h1>Pick a pet!</h1>
        </header>
        {pet && (
          <Link to={`/pet/${pet._id}`}>
            <PetItem pet={pet} size="large" />
          </Link>
        )}
        <button className="button" onClick={this.loadRandom}>
          Show me a new pet
        </button>
      </main>
    );
  }
}

export default RandomPet;
