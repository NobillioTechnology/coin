import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Picker, CheckBox
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';

const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={}
   }


  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
       <Header title="Security" data={this.props} menuCheck="true" style={Styles.header}/>
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
            <View style={{alignSelf:'center', justifyContent:'center', width:width, height:height-150}}>
              
              <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('TwoFactor')}}>
              <View style={[Styles.itemBody,Styles.shadow, {alignSelf:'center'}]}>
                <Image source={require('../../assets/img/logo.png')} style={Styles.itembodyImage} />
                <Text style={Styles.title}>TWO-FACTOR AUTHENTICATION</Text>
              </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('LoginGuard')}}>
                <View style={[Styles.itemBody,Styles.shadow, {alignSelf:'center'}]}>
                  <Image source={require('../../assets/img/logo.png')} style={Styles.itembodyImage} />
                  <Text style={{alignSelf:'center', margin:10}}>LOGIN GUARD</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('LoginHistory')}}>
                <View style={[Styles.itemBody,Styles.shadow, {alignSelf:'center'}]}>
                  <Image source={require('../../assets/img/logo.png')} style={Styles.itembodyImage} />
                  <Text style={{alignSelf:'center', margin:10}}>LOGIN HISTORY</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected='security'/>
      </View>
    );
  }
}
