import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Breed from './components/Breed';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/breed/:name' component={Breed} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;