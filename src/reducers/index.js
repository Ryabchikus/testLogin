'use strict';
/* @flow */

import * as types from '../constants/actionTypes';

export const initialState = {
  login: '',
  data: {},
  auntificationError: false,
  loading: false,
  loggedIn: false,
  error: {},
}

export const rootReducer = (state = initialState, action = {}) => {
  let { type, newLogin } = action;

  switch (type) {
    case types.UPDATE_LOGIN:
      return {
        ...state,
        login: action.payload
      };
    
      case types.REQUEST_AUNTIFICATION:
      return {
        ...state,
        loading: true,
        auntificationError: false,
      }
    
    case types.REQUEST_AUNTIFICATION_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        loggedIn: true,
        error: {},
      }

    case types.REQUEST_AUNTIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        auntificationError: true,
        loggedIn: false,
        error: action.error,
      }
    
      case types.AUNTIFICATION_STATUS_RESET:
      return {
        ...state,
        auntificationError: false,
        data: {},
      }
    
    default:
      return state;
  }
}