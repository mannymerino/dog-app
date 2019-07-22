import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    if (displayName.indexOf('/') >= 0) displayName = name.split('/').reverse().join(' ');

    this.setState({
      breedId: name,
      breedName: displayName,
    });

    this.getBreedImage(name);
  }

  getBreedImage = id => {
    let nextState = {};

    // reset loadingError and set isLoading to true while fetch is executing
    this.setState({ isLoading: true, loadingError: null });

    // fetch random image of this dog breed
    fetch(`${Constants.DOG_API_URL}/breed/${id}/images/random`)
    .then(raw => raw.json())
    .then(breed => nextState.imgUrl = breed.message)
    .catch(err => nextState.loadingError = err.message || err)
    .finally(() => {
      nextState.isLoading = false;
      this.setState(nextState);
    });
  }

  render() {
    const { breedId, breedName, imgUrl, isLoading, loadingError } = this.state;

    return (
      <div className="breed-detail">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6">{breedName}</Typography>
          </Toolbar>
        </AppBar>
        <Container className="card" maxWidth="xs">
          <Card>
            {imgUrl && <CardMedia image={imgUrl} title={breedName}/>}
            {(!imgUrl || loadingError) && (
              <div className="no-image">
                {`${loadingError || 'Loading...'}`}
              </div>
            )}
            <CardActions>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                title="Go back"
                component={Link}
                to="/">
                <Icon>chevron_left</Icon>
                Back to list
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                title="Load new image"
                onClick={() => this.getBreedImage(breedId)}>
                <Icon>refresh</Icon>
              </Fab>
              {isLoading && <CircularProgress size={30} className="breed-refresh"/>}
            </CardActions>
          </Card>
        </Container>
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