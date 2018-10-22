'use strict';
/* @flow */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/stores/configureStore';
import LoginScreenContainer from './src/containers/loginScreenContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={configureStore}>
        <LoginScreenContainer />
      </Provider>
    );
  }
}