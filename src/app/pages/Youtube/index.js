import React, { Component } from 'react';
import {
  Text, View, Image, Dimensions, Linking, 
} from 'react-native';
import { WebView } from 'react-native-webview';
import Styles from './style';
import { NavigationActions, StackActions } from 'react-navigation';
import Header from '../Header';

const width =Dimensions.get('window').width
const height =Dimensions.get('window').height

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state={
    website:'https://www.youtube.com/channel/UCBEaAh_lIXhvV-DA2vuNKpA',
    apikey:'AIzaSyCVrGrdl93jKTC8PNvCViJI86b9HXKPaMY'
    }
  }

 componentDidMount(){
      this.handleClick();
  }
  componentWillUpdate(){
    this.handleClick();
  }
  componentDidUpdate(){
    this.handleClick();
  }

  jumpToPage(page){
    this.props.navigation.toggleDrawer();
    // this.props.navigation.dispatch('Home');
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName:'mainNavigator'})],
      });
      this.props.navigation.dispatch(navigateAction);
    this.props.navigation.navigate('Home', {role:page})
  }

  handleClick = () => {
    Linking.canOpenURL(this.state.website).then(supported => {
      if (supported) {
        // Linking.openURL(this.state.website);
      } else {
        console.log("Don't know how to open URI: " + this.state.website);
      }
    });
  };

  render() {
   
    return (
            <View style={Styles.body}>
               <Header title="Youtube Tutorial" menuCheck="true" data={this.props} style={Styles.header}/>
               <WebView
                  source={{ uri:this.state.website }}
                  startInLoadingState={true} 
                />
            </View>
      );
  }
}


{/*   <Image source={require('../../assets/img/logo.jpg')} style={Styles.logoTime}/>
          // <Text style={Styles.visitButton} onPress={()=>{this.jumpToPage()}}>Back</Text>
       */}