import { Component } from 'react';

import { listPets } from './../services/pet';
import PetList from '../components/PetList';

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
        <PetList pets={this.state.pets} />
      </main>
    );
  }
}

export default Home;
