import { Component } from 'react';

import './PictureSlider.scss';

class PictureSlider extends Component {
  state = {
    index: 0
  };

  navigate = increment => {
    this.setState({
      index: Math.min(
        Math.max(this.state.index + increment, 0),
        this.props.pictures.length - 1
      )
    });
  };

  render() {
    const { pictures } = this.props;
    return (
      <div className="picture-slider">
        <img src={pictures[this.state.index]} alt="A slider item" />
        <div className="picture-slider__controls">
          <button onClick={() => this.navigate(-1)}>⬅️</button>
          <button onClick={() => this.navigate(1)}>➡️</button>
        </div>
      </div>
    );
  }
}

export default PictureSlider;
