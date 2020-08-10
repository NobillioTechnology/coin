
import React, { Component } from 'react';
import {View} from 'react-native'
import AppNavigator from './src/app/main/Router';
// import SplashScreen from 'react-native-splash-screen';
import {
  Platform
} from 'react-native';

export default class App extends Component {

  componentDidMount(){
    // if(Platform.OS=='android'){
    //   SplashScreen.hide();
    // }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <AppNavigator />
      </View>
    );
  }
}
