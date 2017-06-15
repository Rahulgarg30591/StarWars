import 'babel-polyfill';
import {render} from 'react-dom';
import {Router, browserHistory, Route } from 'react-router';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import allReducers from './js/reducers/index';

import LoginContainer from './js/containers/LoginContainer';
import HomeContainer from './js/containers/HomeContainer';

// CSS imports
import '../node_modules/bootstrap/dist/css/bootstrap.css';
// Custom CSS
import './assets/style/login.css';
import './assets/style/home.css';

const store = createStore(allReducers);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={LoginContainer} />
            <Route path="/Home" component={HomeContainer} />
        </Router>
    </Provider>
  , document.getElementById('app'));
