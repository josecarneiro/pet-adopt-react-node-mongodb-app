import { Component } from 'react';
import { loadShelter } from '../services/shelter';
import { Helmet } from 'react-helmet-async';

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
            <Helmet>
              <title>Pet Adopt - {shelter.name}</title>
            </Helmet>
            <h1>{shelter.name}</h1>
          </>
        )}
      </main>
    );
  }
}

export default ShelterProfile;
