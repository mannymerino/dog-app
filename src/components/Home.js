import React from 'react';
import PropTypes from 'prop-types';
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

const Home = ({breeds, loadingError}) => {
  return (
    <div className="home">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6">Breed List</Typography>
        </Toolbar>
      </AppBar>
      <Container
        className="breed-list-container" maxWidth="xs">
        {loadingError && <div className="error-message">{loadingError}</div>}
        {!loadingError && (
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
        )}
      </Container>
    </div>
  )
};

Home.propTypes = {
  breeds: PropTypes.arrayOf(PropTypes.object),
  loadingError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

Home.defaultProps = {
  breeds: [],
  loadingError: null,
};

export default Home;