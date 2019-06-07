import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Breed from './components/Breed';
import * as Constants from './constants';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: [],
    };
  }

  componentDidMount() {
    // fetch list of dog breeds
    fetch(`${Constants.DOG_API_URL}/breeds/list/all`)
    .then(raw => raw.json())
    .then(breeds => this.setState({breeds: this.mapBreeds(breeds.message)}))
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
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' render={props => <Home {...props} breeds={this.state.breeds}/>} />
            <Route path='/breed/:name' component={Breed} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};