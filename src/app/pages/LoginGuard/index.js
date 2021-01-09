

import React, { Component } from 'react';
import {
  Text, View, ImageBackground, ScrollView, Dimensions, TouchableHighlight,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header';
import Footer from '../Footer';
import Utils from '../Utils';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';

const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

export default class Home extends Component {

  state={
    wantTo:'sell',PickerSelectedVal:''
  }

  constructor(props) {
    super(props);
      this.state={
        dialog:false,
        _id:'',
        loginGuard:false,
        loading:true,
        loadingTitle:'Please Wait',
        loadingMessage:'loading...',
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
        require('../../assets/img/bg2.jpg'),
        require('../../assets/img/bg3.jpg'),
        require('../../assets/img/bg4.jpeg'),
        require('../../assets/img/bg5.jpg'),
        require('../../assets/img/bg6.jpeg')],     
      }
      this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
    if(color!==null){
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

    const _id = await AsyncStorage.getItem(Utils._id);
     await this.setState({_id:_id});
     await this.getProfile(_id); 
   }

  stopLoading(){
    this.setState({loading:false});
  }

   getProfile=async(_id)=>{
     await WebApi.getProfile(_id)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from getProfile===>', json.result);
                        if(json.responseCode==200){
                            // alert(json.result.time_zone);
                            this.setState({
                                       loginGuard:json.result.loginGuard,
                                      })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
   }

   flipLoginGuard=async()=>{
     this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Updating...'});
       console.log(!this.state.loginGuard)
       await WebApi.loginGuard(!this.state.loginGuard)
        .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from loginGuard===>', json);
                        if(json.responseCode==200){
                            this.setState({
                                       loginGuard:json.result.loginGuard,
                              })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
   }
  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
        <ImageBackground source={this.state.color} style={{flex:1}}>
        <Header title="Login Guard" menuCheck="false" data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
            <View style={{alignSelf:'center', justifyContent:'center', width:width, height:height-150}}>
              <View style={[Styles.itemBody, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow, {alignSelf:'center'}]}>
                <Text style={{alignSelf:'center', margin:10}}>Prevent logins from unauthorized browser:</Text>
                <TouchableHighlight underlayColor='none' onPress={()=>this.flipLoginGuard()}>
                  <View style={this.state.loginGuard==false ? Styles.buttonRed : Styles.buttonGreen}>
                    {this.state.loginGuard==false ? (
                      <Text style={Styles.disbleText}>AUTHENTICATOR DISABLED</Text>
                      ):(
                       <Text style={[Styles.disbleText, {color:Utils.colorBlack}]}>AUTHENTICATOR ENABLED</Text>                    
                      )
                    }
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation}/>
      </ImageBackground>
      </View>
    );
  }
}
