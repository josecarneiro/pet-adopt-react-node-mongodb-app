import { Component } from 'react';
import CheckboxGroup from './../components/CheckboxGroup';
import { savePreferences } from './../services/individual';

import { speciesOptions, sizesOptions, qualitiesOptions } from './../common';

class IndividualPreferences extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = { ...user.preferences };
  }

  handleFormSubmission = async event => {
    event.preventDefault();
    const { species, sizes, qualities } = this.state;
    const user = await savePreferences({ species, sizes, qualities });
    this.props.onUserChange(user);
    this.props.history.push('/');
  };

  handleCheckboxGroupChange = (name, values) => {
    this.setState({
      [name]: values
    });
  };

  render() {
    return (
      <main>
        <header>
          <h1>Personal Preferences</h1>
          <p>
            Set your personal preferences so that we can match with the perfect
            pet.
          </p>
        </header>
        <form onSubmit={this.handleFormSubmission}>
          <label>Species</label>
          <CheckboxGroup
            options={speciesOptions}
            values={this.state.species}
            onUpdate={values =>
              this.handleCheckboxGroupChange('species', values)
            }
          />

          <label>Sizes</label>
          <CheckboxGroup
            options={sizesOptions}
            values={this.state.sizes}
            onUpdate={values => this.handleCheckboxGroupChange('sizes', values)}
          />

          <label>Qualities</label>
          <CheckboxGroup
            options={qualitiesOptions}
            values={this.state.qualities}
            onUpdate={values =>
              this.handleCheckboxGroupChange('qualities', values)
            }
          />

          <button>Save Preferences</button>
        </form>
      </main>
    );
  }
}

export default IndividualPreferences;
