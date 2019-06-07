import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Breed from './Breed';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Route path="/breed/:name" component={Breed}/>
    </BrowserRouter>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
