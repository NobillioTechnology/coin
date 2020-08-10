import React, { Component } from 'react';
import {
  Text, View, Image, Dimensions, Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style';
import Utils from '../Utils';

const width =Dimensions.get('window').width;
const height =Dimensions.get('window').height;

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state={note:false, website:'https://coinbaazar.com/'}
  }

  componentDidMount = async () => {
        const isLoggedIn = await AsyncStorage.getItem(Utils._id);
      setTimeout(()=>{ 
        if (isLoggedIn != null){
              this.props.navigation.navigate('Home')
          }
          else
              this.props.navigation.replace('Register')
    }, 3000);
  }

  render() {
   
    return (
        <View style={Styles.body}>
          {this.state.note==false &&(
            <Image source={require('../../assets/img/logo.png')} style={Styles.logo}/>
          )}
          {this.state.note==true &&(
            <View style={{width:'100%', height:'60%', alignItems:'center'}}>
              <Image source={require('../../assets/img/logo.png')} style={Styles.logoTime}/>
              <Text style={Styles.noteLine}>App Launching Soon</Text>
               <Text style={Styles.noteLine}>You can use our Website for now.</Text>
            </View>
            )}
        </View>
      );
  }
}