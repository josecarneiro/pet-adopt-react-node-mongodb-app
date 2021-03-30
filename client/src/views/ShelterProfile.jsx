import { Component } from 'react';
import { loadShelter } from '../services/shelter';

class ShelterProfile extends Component {
  state = {
    shelter: null
  };

  async componentDidMount() {
    const shelter = await loadShelter(this.props.match.params.id);
    this.setState({ shelter });
  }

  render() {
    const { shelter } = this.state;
    return (
      <main>
        {shelter && (
          <>
            <h1>{shelter.name}</h1>
          </>
        )}
      </main>
    );
  }
}

export default ShelterProfile;
