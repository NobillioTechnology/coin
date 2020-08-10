

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Picker, CheckBox, ImageBackground,
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import RadioForm from 'react-native-simple-radio-button';
import Adapter from './Adapter';
import { WebView } from 'react-native-webview';


const width = Dimensions.get('window').width;

export default class Home extends Component {

  state={
  }

  constructor(props) {
    super(props);
      this.state={
        website:'https://blog.coinbaazar.com/',
      }
  }

  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
       <Header title="Blog" menuCheck="true" data={this.props} style={Styles.header}/>
         <WebView 
            source={{ uri:this.state.website }}
            startInLoadingState={true} 
         />
      </View>
    );
  }
}



        // <ScrollView style={{flex:0.8}}>
        //   <View style={Styles.container}>

        //     <View style={Styles.headBlog}>
        //       <ImageBackground source={require('../../assets/img/bloghead.jpeg')} style={Styles.headImage}>
        //         <Text style={Styles.headText}>Buy & Sell Bitcoins</Text>
        //       </ImageBackground>
        //     </View>

        //      <Adapter
        //        imageUri={require('../../assets/img/bloghead.jpeg')}
        //        title="Blog from One Person"
        //        subtitle="Bitcoin superstar and Bitcoin Era - The Latest Two Faces of the Same Scam"
        //      />
        //      <Adapter
        //        imageUri={require('../../assets/img/bloghead.jpeg')}
        //        title="Blog from second person"
        //        subtitle="Bitcoin superstar and Bitcoin Era - The Latest Two Faces of the Same Scam"
        //      />
        //   </View>
        // </ScrollView>
