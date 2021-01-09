

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, Modal, BackHandler, ImageBackground,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import utils from '../Utils';
import CommonCss from '../Utils/commonCss';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import Clipboard from "@react-native-community/clipboard";
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
        GfaDisableView:false,
        _id:'',
        otpFactor:false,
        googleFactor:false,
        googleSecret:'',
        googleQrImage:'https://fullstackworld.com/storage/images/UL8ojQAm8dUqkUdtFTSNqwnLSc9NIZRi4UQIOdym.png',
        googleOtp:'',
        validOtp:true,
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
      this.flipDialog=this.flipDialog.bind(this);
      this.closeDialog=this.closeDialog.bind(this);
      this.stopLoading=this.stopLoading.bind(this);
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
     BackHandler.addEventListener('hardwareBackPress', this.closeDialog);
     const _id = await AsyncStorage.getItem(Utils._id);
     await this.setState({_id:_id});
     await this.getProfile(_id);
     await this.getGoogleFactor(); 
   }

   flipDialog(){
     this.setState({dialog:!this.state.dialog});
     // alert('Hello');

   }
   closeDialog(){
     if(this.state.dialog){
       this.setState({dialog:!this.state.dialog});
       return true;
     }
     else
       this.props.navigation.goBack(null);
       return true;
   }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.closeDialog);
  }

  stopLoading(){
    this.setState({loading:false});
  }

   getProfile=async(_id)=>{
     await WebApi.getProfile(_id)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                    //  console.log('Response from getProfile===>', json);
                        if(json.responseCode==200){
                            // alert(json.result.time_zone);
                            this.setState({
                                       otpFactor:json.result.two_factor_auth,
                                       googleFactor:json.result.googleTwofactorLink,
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

   setOtpFactor=async()=>{
     this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Updating...'});
       console.log(!this.state.otpFactor)
       await WebApi.setOtpFactor(this.state._id, !this.state.otpFactor, !this.state.otpFactor)
        .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from setOtpFactor===>', json);
                        if(json.responseCode==200){
                            // alert(json.result.time_zone);
                            this.setState({
                                       otpFactor:json.result.two_factor_auth,
                                       googleFactor:json.result.google2FA,
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

   getGoogleFactor=async()=>{
     // this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'loading...'});
     await WebApi.getGoogleFactor()
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from getGoogleFactor===>', json.data.qrCodeUrl);
                        if(json.responseCode==200){
                            // alert(json.result.time_zone);
                            var qr = 'https://fullstackworld.com/storage/images/UL8ojQAm8dUqkUdtFTSNqwnLSc9NIZRi4UQIOdym.png';
                            if(json.data.qrCodeUrl!='')
                              qr = json.data.qrCodeUrl;
                              qr = qr.replace('%3A', ':');
                              qr = qr.replace('%40', '@');
                              qr = qr.replace('%3F', '?');

                              console.log('modi url ==>',qr);

                            this.setState({
                                       googleSecret:json.data.secret,
                                       googleQrImage:qr,
                                });
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
   }

   setGoogleFactor=async()=>{
      if (this.state.googleOtp!='' && this.state.googleOtp.length==6){
          await this.setState({dialog:false, GfaDisableView:false, loading:true, loadingTitle:'Please Wait', loadingMessage:'loading...'});   
          let remove = false;
          if(this.state.googleFactor)
              remove=true;
          await WebApi.setGoogleFactor(this.state.googleOtp, remove)
              .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                    console.log('Response from getGoogleFactor===>', json);
                    if(json.responseCode==200){
                        // alert(json.result.time_zone);
                        this.setState({
                                   dialog:false,
                                   GfaDisableView:false,
                                   loading:true,
                                   loadingTitle:'Success',
                                   loadingMessage:json.responseMessage,
                                   googleOtp:''
                               });
                               this.getProfile(this.state._id);
                    }else{
                      this.setState({googleOtp:'', loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                     console.log('error==>' , error)
                     this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                });
      }else{
        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid Code!', validOtp:false});
      }
   }

  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
        <ImageBackground source={this.state.color} style={{flex:1}}>
         <Header title="Two-Factor Authentication" menuCheck="false" data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'} nestedScrollEnabled={true}>
          {this.state.dialog==true && (
            <View style={Styles.itemBodyDialog}>
              <Modal style={[Styles.dialogue]}
                visible={this.state.dialog}
                transparent={true}
                animationType={"fade"}
                onRequestClose={ () => { this.flipDialog()}}>
                   <View style={Styles.dialogue}>
                     <ScrollView style={{flex:1}} keyboardShouldPersistTaps={'always'}>
                          <View style={Styles.dialogueContainer}>
                            <View style={{flexDirection:'row', width:'100%', justifyContent:'center'}}>
                              <Text style={Styles.dialogTitle}>Enable Authenticator</Text>
                              <Icon name='close' style={{fontSize:Utils.headSize+5, position:'absolute', right:20, top:10}}
                                onPress={()=>this.setState({dialog:false})}
                              />
                            </View>
                            <Image style={{width:'90%', height:1, backgroundColor:utils.colorGray}}/>
                            <Text style={Styles.dialogSubtitle}>if you setup 2 step verification, you can use the google authenticator app to receive codes
                              even if you don't have an internet connection or mobile server for trades & transactions
                            </Text>
                            <Image source={{uri:this.state.googleQrImage}} 
                              style={Styles.qr}/>
                            {/* <View style={[Styles.qr, {alignItems:'center', justifyContent:'center'}]}>
                              <Text style={Styles.button} onPress={()=>this.openQr()}>Get QR Image</Text>
                            </View> */}
                            <Text style={[Styles.dialogSubtitle, {fontSize:14, marginTop:10, textAlign:'center'}]}>SecretKey: {this.state.googleSecret}</Text>
                            <Icon name="copy" style={[Styles.copyIcon, this.state.copied ? {color:Utils.colorGreen} : {color:Utils.colorDarkBlue}]} onPress={()=>{Clipboard.setString(this.state.googleSecret); this.setState({copied:true})}}/>
                          
                            <Text style={[Styles.dialogSubtitle, {fontSize:14, marginLeft:20, marginTop:20, fontWeight:'bold'}]}>Authentication code</Text>
                            
                            <View style={this.state.validOtp ? Styles.bitAddressView : Styles.bitAddressViewError}>
                              <TextInput style={Styles.bitAddress}
                                value={this.state.googleOtp}
                                onChangeText={(otp)=>{this.setState({googleOtp:otp}); if(otp.length===6)this.setState({validOtp:true}); else this.setState({validOtp:false})}}
                                keyboardType={'number-pad'}
                              />
                            </View>
                            <TouchableHighlight underlayColor='none' onPress={()=>this.setGoogleFactor()} style={[Styles.submit]}>
                              <View>
                                <Text>ACTIVE</Text>
                              </View>
                            </TouchableHighlight>
                          </View>           
                      </ScrollView>
                  </View>
              </Modal>
            </View>
          )}
          <View style={Styles.container}>
            <View style={{alignSelf:'center', justifyContent:'center', width:width, height:height-150}}>
              <View style={[Styles.itemBody, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow, {alignSelf:'center'}]}>
                <Text style={{alignSelf:'center', margin:10}}>OTP Two-factor authentication is</Text>
                <TouchableHighlight underlayColor='none' onPress={()=>this.setOtpFactor()}>
                  <View style={this.state.otpFactor==false ? Styles.buttonRed : Styles.buttonGreen}>
                    {this.state.otpFactor==false ? (
                      <Text style={Styles.disbleText}>AUTHENTICATOR DISABLED</Text>
                      ):(
                       <Text style={[Styles.disbleText, {color:Utils.colorBlack}]}>AUTHENTICATOR ENABLED</Text>
                      )
                    }
                  </View>
                </TouchableHighlight>
              </View>
              <View style={[Styles.itemBody, Platform.OS=='ios' ? CommonCss.shadowIos : Styles.shadow, {alignSelf:'center'}]}>
                <Text style={{alignSelf:'center', margin:10}}>Google Two-factor authentication is</Text>
                <TouchableHighlight underlayColor='none' onPress={()=>{if(!this.state.googleFactor)this.flipDialog(); else this.setState({GfaDisableView:true})}}>
                  <View style={this.state.googleFactor==false ? Styles.buttonRed : Styles.buttonGreen}>
                    {!this.state.googleFactor ? (
                      <Text style={Styles.disbleText} >AUTHENTICATOR DISABLED</Text>
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
        <Modal style={[Styles.dialogue]}
                visible={this.state.GfaDisableView}
                transparent={true}
                animationType={"fade"}
                onRequestClose={ () => { this.setState({GfaDisableView:false})}}>
                   <View style={Styles.dialogue}>
                     <ScrollView style={{flex:1}} keyboardShouldPersistTaps={'always'}>
                          <View style={[Styles.dialogueContainer, {minHeight:250, marginBottom:50}]}>
                            <View style={{flexDirection:'row', width:'100%', justifyContent:'center'}}>
                              <Text style={Styles.dialogTitle}>Disable Authenticator</Text>
                              <Icon name='close' style={{fontSize:Utils.headSize+5, position:'absolute', right:20, top:10}}
                                onPress={()=>this.setState({GfaDisableView:false})}
                              />
                            </View>
                            <Image style={{width:'90%', height:1, backgroundColor:utils.colorGray}}/>
                            <Text style={Styles.dialogSubtitle}>if you setup 2 step verification, you can use the google authenticator app to receive codes
                              even if you don't have an internet connection or mobile server for trades & transactions
                            </Text>
                          
                            <Text style={[Styles.dialogSubtitle, {fontSize:14, marginLeft:20, marginTop:20, fontWeight:'bold'}]}>Authentication code</Text>  
                            <View style={this.state.validOtp ? Styles.bitAddressView : Styles.bitAddressViewError}>
                              <TextInput style={Styles.bitAddress}
                                value={this.state.googleOtp}
                                onChangeText={(otp)=>{this.setState({googleOtp:otp}); if(otp.length===6)this.setState({validOtp:true}); else this.setState({validOtp:false})}}
                                keyboardType={'number-pad'}
                              />
                            </View>
                            <TouchableHighlight underlayColor='none' onPress={()=>this.setGoogleFactor()} style={[Styles.submit]}>
                              <View>
                                <Text>Deactivate</Text>
                              </View>
                            </TouchableHighlight>
                          </View>           
                      </ScrollView>
                  </View>
              </Modal>
        <Footer style={Styles.footer} navigation={this.props.navigation}/>
      </ImageBackground>
      </View>
    );
  }
}
