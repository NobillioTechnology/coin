
import React, { Component } from 'react';
import {View, Text} from 'react-native'
import AppNavigator from './src/app/main/Router';
import {
  Platform
} from 'react-native';

export default class App extends Component {

  componentDidMount(){

  }

  render() {
    return (
      <View style={{flex:1}}>
        <AppNavigator />
      </View>
    );
  }
}
