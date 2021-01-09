import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, TouchableHighlight, ImageBackground,
Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Footer from '../Footer';
import Utils from '../Utils';

const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
        require('../../assets/img/bg2.jpg'),
        require('../../assets/img/bg3.jpg'),
        require('../../assets/img/bg4.jpeg'),
        require('../../assets/img/bg5.jpg'),
        require('../../assets/img/bg6.jpeg')],
        vari:'bg',
      }
   }

   componentDidMount=async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
    if(color!==null){
      this.setState({vari:color});
      if(color=='bg')
        this.setState({color:this.state.img[0]});
        if(color=='bg2')
        this.setState({color:this.state.img[1]});
        if(color=='bg3')
        this.setState({color:this.state.img[2]});
        if(color=='bg4')
        this.setState({color:this.state.img[3]});
        if(color=='bg5')
        this.setState({color:this.state.img[4]});
        if(color=='bg6')
        this.setState({color:this.state.img[5]});
    }
   }

   componentWillReceiveProps=async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
    if(color!==null && color!=this.state.vari){
        if(color=='bg')
        this.setState({color:this.state.img[0]});
        if(color=='bg2')
        this.setState({color:this.state.img[1]});
        if(color=='bg3')
        this.setState({color:this.state.img[2]});
        if(color=='bg4')
        this.setState({color:this.state.img[3]});
        if(color=='bg5')
        this.setState({color:this.state.img[4]});
        if(color=='bg6')
        this.setState({color:this.state.img[5]});
    }
  }

  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
        <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title="Security" data={this.props} menuCheck="true" style={Styles.header}/>
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
            <View style={{alignSelf:'center', justifyContent:'center', width:width, height:height-150}}>
              
              <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('TwoFactor')}}>
              <View style={[Styles.itemBody, Platform.OS=='ios' ? Styles.shadowIos :  Styles.shadow, {alignSelf:'center'}]}>
                <Image source={require('../../assets/img/logo.png')} style={Styles.itembodyImage} />
                <Text style={Styles.title}>TWO-FACTOR AUTHENTICATION</Text>
              </View>
              </TouchableHighlight>

              {/* <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('LoginGuard')}}>
                <View style={[Styles.itemBody, Platform.OS=='ios' ? Styles.shadowIos :Styles.shadow, {alignSelf:'center'}]}>
                  <Image source={require('../../assets/img/logo.png')} style={Styles.itembodyImage} />
                  <Text style={{alignSelf:'center', margin:10}}>LOGIN GUARD</Text>
                </View>
              </TouchableHighlight> */}
              <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('LoginHistory')}}>
                <View style={[Styles.itemBody, Platform.OS=='ios' ? Styles.shadowIos :Styles.shadow, {alignSelf:'center'}]}>
                  <Image source={require('../../assets/img/logo.png')} style={Styles.itembodyImage} />
                  <Text style={{alignSelf:'center', margin:10}}>LOGIN HISTORY</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected='security'/>
      </ImageBackground>
      </View>
    );
  }
}
