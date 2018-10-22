'use strict';
/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  Button,
} from 'native-base';

import SvgUri from 'react-native-svg-uri';

const loginImage = require('../../resources/loginScreen.svg');

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: this.props.login || '',
      password: '',
      auntificationDataIncorrect: false,
    };
  };

  isEmptyObject(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  }

  //-------------------------------------- input handlers ---------------------------------------

  onLoginChanged = (event) => {
    this.setState({ login: event.nativeEvent.text });
  }

  onPasswordChanged = (event) => {
    this.setState({ password: event.nativeEvent.text });
  }

  onLoginPressed = () => {
    if (this.state.login.trim().length <= 3 || this.state.password.trim().length <= 3) {
      this.setState({ auntificationDataIncorrect: true });
    } else {
      this.props.actions.updateLogin(this.state.login);
      let authObject = JSON.stringify({
        login: this.state.login,
        password: this.state.password
      });
      this.props.actions.requestAuntification(authObject);
    }
  }

  //------------------------------------ rendering functions ------------------------------------

  renderLoginButton() {
    let disabledState = this.props.loading
    let text = this.props.loading ? null : <Text style={styles.buttonText}>Войти</Text>;
    let spinner = this.props.loading ? <ActivityIndicator size='small' style={{ flex: 1, alignSelf: 'center' }} /> : null;
    let buttonStyle = this.props.loading ? styles.buttonDisabled : styles.button;
    return (
      <Button
        rounded
        block
        disabled={disabledState}
        style={buttonStyle}
        onPress={this.onLoginPressed}>
        {spinner}
        {text}
      </Button>
    );
  }

  renderErrorMessageAlert() {
    Alert.alert(
      'Network error',
      `\n\rError status: ${this.props.error.status} 
      \n\rError data: ${this.props.error.data}`,
      [
        { text: 'Reload', onPress: () => this.onLoginPressed() },
        { text: 'OK', onPress: () => this.props.actions.auntificationStatusReset() },
      ]
    );
  }

  renderServerDataAlert() {
    Alert.alert(
      'Server data',
      `Server data is: ${JSON.stringify(this.props.data)}`,
      [
        { text: 'OK', onPress: () => this.props.actions.auntificationStatusReset() },
      ]
    );
  }

  renderIncorrectAuthDataAlert() {
    Alert.alert(
      'Incorrect data!',
      `Please, check your login and password and try again`,
      [
        { text: 'OK', onPress: () => this.setState({ auntificationDataIncorrect: false }) },
      ]
    );
  }

  render() {

    const errorMessageAlert = this.props.auntificationError ? this.renderErrorMessageAlert() : null;
    const serverDataAlert = (!this.props.auntificationError && !this.isEmptyObject(this.props.data)) ? this.renderServerDataAlert() : null;
    const incorrectAuthDataAlert = this.state.auntificationDataIncorrect ? this.renderIncorrectAuthDataAlert() : null;

    return (
      <View style={styles.content}>
        {errorMessageAlert}
        {serverDataAlert}
        {incorrectAuthDataAlert}
        <View style={styles.imageContainer}>
          <SvgUri
            source={loginImage}
            style={styles.image}
            width='200'
            height='200'
          />
          <Text style={styles.title}>
            Nature inc.
        </Text>
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            autoFocus={true}
            style={[styles.inputField, styles.itemContainer]}
            value={this.state.login}
            placeholder='Логин'
            returnKeyType='next'
            textContentType='username'
            onChange={this.onLoginChanged}
            onSubmitEditing={() => { this.passwordInput.focus(); }}
          />
          <TextInput
            style={[styles.inputField, styles.itemContainer]}
            value={this.state.password}
            placeholder='Пароль'
            returnKeyType='go'
            textContentType='password'
            secureTextEntry={true}
            onChange={this.onPasswordChanged}
            onSubmitEditing={this.onLoginPressed}
            ref={input => { this.passwordInput = input }} //for possibility set focus to password TextInput
          />
          {this.renderLoginButton()}
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.text}>
            Нажимая войти, вы подтверждаете ознакомление c
        </Text>
          <TouchableHighlight>
            <Text style={styles.link}>
              пользовательским соглашением
        </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },

  imageContainer: {
    marginTop: 30,
    alignSelf: 'center',
  },

  loginContainer: {
    padding: 15,
  },

  footerContainer: {
    flexDirection: 'column',
    padding: 15,
    alignItems: 'center',
  },

  image: {

  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },

  inputField: {
    height: 40,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#ff0188',
    borderRadius: 20,
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginTop: 8,
  },

  button: {
    backgroundColor: "#ff0188",
    marginTop: 16,
  },

  buttonDisabled: {
    marginTop: 16,
  },

  buttonText: {
    color: "#f3f3f3",
    fontSize: 16,
  },

  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#bfbfbf',
  },

  link: {
    fontSize: 12,
    textAlign: 'center',
    color: "#ff0188"

  },
});

export default LoginScreen
