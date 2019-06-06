import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

export default class BreedDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breedId: null,
      breedName: null,
      imgUrl: null,
      isLoading: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { name } = match.params;

    // if name is hyphenated, then it is <breed>-<subbreed>
    // parse name for better display
    let displayName = name;
    if (displayName.indexOf('-') >= 0) displayName = name.split('-').reverse().join(' ');

    this.setState({
      breedId: name,
      breedName: displayName,
      isLoading: true,
    });

    this.getBreedImage(name);
  }

  getBreedImage = id => {
    let nextState = {};

    // fetch random image of this dog breed
    fetch(`${Constants.DOG_API_URL}/breed/${id}/images/random`)
    .then(raw => raw.json())
    .then(breed => nextState.imgUrl = breed.message)
    .catch(err => {
      // TODO: surface error to UI
      console.log(err);
      nextState.loadingError = err.message || err;
    })
    .finally(() => {
      nextState.isLoading = false;
      this.setState(nextState);
    });
  }

  render() {
    const { breedId, breedName, imgUrl } = this.state;

    // TODO: add error check and surface error here
    if (!breedId) return <div className="no-breed">Breed is loading or no breed specified</div>

    return (
      <div className="breed-detail">
        <h1>{breedName}</h1>
        {imgUrl && <img src={imgUrl} alt={`${breedName} dog breed`}/>}
        <div className="controls">
          <Link to="/" className="pull-left">Back</Link>
          <Link to="#" className="pull-right" onClick={() => this.getBreedImage(breedId)}>Refresh</Link>
        </div>
      </div>
    )
  }
}

BreedDetail.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
}

BreedDetail.defaultProps = {
  history: {},
  location: {},
  match: {},
}