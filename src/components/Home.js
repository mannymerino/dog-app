import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../constants';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: [],
      breed: null,
    };
  }

  componentDidMount() {
    // fetch list of dog breeds
    fetch(`${Constants.DOG_API_URL}/breeds/list/all`)
    .then(raw => raw.json())
    .then(breeds => {
      console.log(breeds);
      this.setState({breeds: this.mapBreeds(breeds.message)})
    })
    .catch(err => {
      // TODO: surface error to UI
      console.log(err);
    });
  }

  mapBreeds = breeds => {
    // breeds should be an array of objects in the shape: 
    // { breedId: <breed>[-<subbreed>], breedName: [<subbreed> ]<breed> }
    let mappedBreeds = [];

    Object.keys(breeds).reduce((acc, cur) => {
      const breed = breeds[cur];
      const hasSubBreeds = breed.length > 0;

      if (hasSubBreeds) {
        breed.forEach(sb => {
          mappedBreeds.push({
            breedId: `${cur}-${sb}`,
            breedName: `${sb} ${cur}`
          });
        })
      } else {
        mappedBreeds.push({
          breedId: cur,
          breedName: cur,
        });
      }
      
      return acc;
    }, mappedBreeds);

    return mappedBreeds;
  }

  render() {
    const { breeds } = this.state;

    // console.log(breeds);
    return (
      <div className="breed-list-container">
        <ul>
          {breeds.map((breed, index) => {
            const { breedId, breedName } = breed;
            return (
              <li key={index}>
                <Link to={`/breed/${breedId}`}>{breedName}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}