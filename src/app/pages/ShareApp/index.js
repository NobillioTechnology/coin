import React, { Component } from 'react';
import {
  Text, View, Image, Dimensions, Linking
} from 'react-native';
import Styles from './style'

const width =Dimensions.get('window').width
const height =Dimensions.get('window').height

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state={website:'https://www.youtube.com/channel/UCg2BxjRahmPlGyejFzYVzLg', share:false}
  }

 componentDidUpdate(){

  }

  handleClick = () => {
    Linking.canOpenURL(this.state.website).then(supported => {
      if (supported) {
        Linking.openURL(this.state.website);
      } else {
        console.log("Don't know how to open URI: " + this.state.website);
      }
    });
  };

  render() {
   
    return (
        <View style={Styles.body}>
          <Image source={require('../../assets/img/logo.png')} style={Styles.logoTime}/>
          <Text style={Styles.visitButton}>Copy Link</Text>
        </View>
      );
  }
}
