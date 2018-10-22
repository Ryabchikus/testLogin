'use strict';
import * as types from '../constants/actionTypes';

export function updateLogin(newLogin) {
  return {
    type: types.UPDATE_LOGIN,
    payload: newLogin
  };
}

export function requestAuntification(authObject) {
  return {
    type: types.REQUEST_AUNTIFICATION,
    payload: {
      request: {
        url: 'https://jsonplaceholder.typicode.com/users/1',
        responseType: 'json',
        auth: authObject,
      }
    }
  }
}

export function auntificationStatusReset() {
  return {
    type: types.AUNTIFICATION_STATUS_RESET
  };
}