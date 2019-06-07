import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import * as Constants from '../constants';

export default class Home extends Component {
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
    const { breeds } = this.state;

    return (
      <div className="home">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6">Breed List</Typography>
          </Toolbar>
        </AppBar>
        <Container
          className="breed-list-container" maxWidth="xs">
          <List>
            {breeds.map((breed, index) => {
              const { breedId, breedName } = breed;
              return (
                <div key={index}>
                  <ListItem
                    button
                    component={Link}
                    to={`/breed/${breedId}`}>
                    <ListItemIcon>
                      <Icon>pets</Icon>
                    </ListItemIcon>
                    <ListItemText primary={breedName}/>
                  </ListItem>
                  <Divider/>
                </div>
              );
            })}
          </List>
        </Container>
      </div>
    )
  }
}