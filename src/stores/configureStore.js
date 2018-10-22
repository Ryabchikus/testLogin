'use strict';
/* @flow */
import { createStore, applyMiddleware, compose } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import { rootReducer, initialState } from '../reducers'

const client = axios.create({
  //baseURL: '​https://jsonplaceholder.typicode.com', //with baseURL any request return "Network error"
  responseType: 'json'
});

const configureStore = createStore(
  rootReducer,
  initialState,
  applyMiddleware(axiosMiddleware(client))
)

export default configureStore;
