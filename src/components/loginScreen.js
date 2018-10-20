'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  Icon,
  Button,
} from 'native-base';

import SvgUri from 'react-native-svg-uri';


class LoginScreen extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',

      isAuntificationSubmit: false,
    };
  };

  onLoginChanged = (event) => {
    //console.log(`Current login: ${event.nativeEvent.text}`);
    this.setState({ login: event.nativeEvent.text });
  }

  onPasswordChanged = (event) => {
    this.setState({ password: event.nativeEvent.text });
  }

  onLoginPressed = () => {
    this.setState({ isAuntificationSubmit: true });
  }

  renderLoginButton() {
    let disabledState = this.state.isAuntificationSubmit
    let text = this.state.isAuntificationSubmit ? null : <Text style={styles.buttonText}>Войти</Text>;
    let spinner = this.state.isAuntificationSubmit ? <ActivityIndicator size='small' style={{ flex: 1, alignSelf: 'center' }} /> : null;
    let buttonStyle = this.state.isAuntificationSubmit ? styles.buttonDisabled : styles.button;
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
)
  }

  render() {

    return (
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <SvgUri
            source={require('../../resources/loginScreen.svg')}
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
    //backgroundColor: 'green',
  },

  loginContainer: {
    padding: 15,
    //backgroundColor: 'yellow',
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

export default LoginScreen;
