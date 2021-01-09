import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, TouchableHighlight, BackHandler, Modal, Dimensions, Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import commonCss from '../Utils/commonCss';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DeviceInfo from 'react-native-device-info';
import * as RNLocalize from 'react-native-localize';
import ConfirmGoogleCaptcha from 'react-native-recaptcha-v2-enhanced';
import Header from '../Header';
                 
const siteKey = '6LfoW5kUAAAAANJBVkOkyyjm_OLB7NlCKpdJLo7c';
const baseUrl = 'https://uat.coinbaazar.com/api/v1';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

var deviceToken = '', deviceType='';
PushNotification.configure({
  onRegister: function (token) {
    deviceToken=token.token;
    deviceType=token.os;
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
   requestPermissions: true,
});

export default class Login extends Component {

  constructor(props) {
    super(props);
     this.state={
      formValue:{},
      _id:'',
      forgotScreen:false,
      name:'',
      email:'',
      password:'',
      validateName:true,
      validateEmail:true,
      validatePassword:true,
      hiddenPass:true,
      loading: false,
      loadingTitle:'Please Wait',
      loadingMessage:"Logining...",
      phoneVerified:false,
      otp1:'', otp2:'', otp3:'', otp4:'',
      captcha:true, validCaptcha:true, captchaDone:false,
      deviceType:'', deviceToken:''
     }
  
    this.stopLoading=this.stopLoading.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

   componentDidMount=async()=>{
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    console.log('before setting state====>', deviceType, deviceToken);
    this.setState({_id:await AsyncStorage.getItem(Utils._id), deviceToken:deviceToken, deviceType:deviceType});
     if(this.props.navigation.state.key=='Logout'){
       this.logout();
     }
    // console.log('token from didMount====>', this.state.deviceToken, '\n', this.state.deviceType);  
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick(){
    BackHandler.exitApp();
    return true;
  }

  logout=async()=>{
    this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loging Out...'});
    const body= await JSON.stringify({
                        _id:this.state._id
                      });
    await WebApi.postApi_user('logout', body)
    .then(response => response.json())
      .then(json => {
         this.setState({loading:false});
           console.log('Response from logout===>', json);
              if(json.responseCode==200){
                  this.props.navigation.navigate('Register');
                  AsyncStorage.removeItem(Utils._id);
                  AsyncStorage.removeItem(Utils.token);
                  AsyncStorage.removeItem(Utils.userName);
                  AsyncStorage.removeItem(Utils.receiveWA);
                  AsyncStorage.removeItem(Utils.receiveQr);
                  AsyncStorage.removeItem(Utils.balance);
                  AsyncStorage.removeItem(Utils.profilePic);
                  
              }else{
                this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
              }
          })
          .catch(error => {
            console.log('error==>' , error)
            this.setState({loading:true, 
                          loadingTitle:'Alert',
                          loadingMessage:'Oops! '+error,
                          })
        });
  }

   setPasswordType(){
       this.setState({passwordType:!this.state.passwordType})
   }

   stopLoading(){
     this.setState({loading:false});
   }

   validateName=async(name)=>{
      await this.setState({name:name});
      if(this.state.name.length>3)
       this.setState({validateName:true});
      else
       this.setState({validateName:false});
   }

   validateEmail=async(email)=>{
     await this.setState({email:email});
     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (reg.test(email) === true)
       await this.setState({validateEmail:true});
      else
       await this.setState({validateEmail:false});
   }

   validatePassword=async(pass)=>{
     await this.setState({password:pass});
     if(this.state.password.length>5)
        await this.setState({validatePassword:true});
       else
       await this.setState({validatePassword:false});
   }

   login=async()=>{
       if(this.state.name!=='' && this.state.validateName){
          if(this.state.password!=='' && this.state.validatePassword){
            if(this.state.captchaDone){
             this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loging ln...'});
              const body= await JSON.stringify({
                        email:this.state.name,
                        password:this.state.password,
                        browser_id:await DeviceInfo.getUniqueId(),
                        browser:await DeviceInfo.getSystemName(),
                        location:await RNLocalize.getCountry(),
                        system_ip:await DeviceInfo.getDeviceId(),
                        deviceToken:this.state.deviceToken,
                        deviceType:this.state.deviceType
                      });
              console.log(body);
              await WebApi.postApi_WT_user('userLogin', body)
                .then(response => response.json())
                .then(json => {
                  //  this.setState({loading:false});
                     console.log('Response from Login===>', json);
                        if(json.responseCode==200){
                            AsyncStorage.setItem(Utils._id, json.data._id);
                            AsyncStorage.setItem(Utils.token, json.data.token);
                            this.setState({_id:json.data._id});
                            this.getProfile();
                          }else if(json.responseCode==202){
                           this.setState({_id:json.data._id, phoneVerified:true});
                           this.setState({loading:false});
                           return;
                        }else if(json.responseCode==404){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                            return;
                          }else if(json.responseCode==500){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.err});
                            return;
                          }else
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                            return;
                          })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                         return;
                        });
            }else
             this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Please complete the Captcha!', validCaptcha:false});  
          }else{
             this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Please enter valid password!'});
           }
        }else{
           this.setState({
             validateName:false,
             loading:true,
             loadingTitle:'Alert', 
             loadingMessage:'Please enter valid email!'
           });
          }
     }

     getProfile=async()=>{
          await WebApi.postApi_user('userProfile', JSON.stringify({_id:this.state._id}))
          .then(response => response.json())
          .then(json => {
             this.setState({loading:false});
               console.log('Response from Login===>', json);
                  if(json.responseCode==200){
                    const data = json.result;
                    var qr = 'https://fullstackworld.com/storage/images/UL8ojQAm8dUqkUdtFTSNqwnLSc9NIZRi4UQIOdym.png';
                    if(data.qrCodeUrlAddress!='')
                      qr = data.qrCodeUrlAddress;
                      var walletAdd = '';
                      if(typeof(data.btc.addresses[0].addr)==='string')
                      walletAdd = data.btc.addresses[0].addr;
                    AsyncStorage.setItem(Utils.userName, data.user_name);
                    AsyncStorage.setItem(Utils.profilePic, data.profilePic);
                    AsyncStorage.setItem(Utils.balance, data.btc.total.toFixed(8).toString());
                    AsyncStorage.setItem(Utils.receiveQr, qr);
                    AsyncStorage.setItem(Utils.receiveWA, walletAdd);
                    this.props.navigation.navigate('Home', {'update':true});
                    }
                })
              .catch(error => {
                   console.log('error==>' , error)
                   this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
             });

     }

     forgot=async()=>{
       if(this.state.email!=='' && this.state.validateEmail){
         this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Sending reset link...'});
         const body= await JSON.stringify({
                        email:this.state.email,
                      });
         await WebApi.postApi_WT_user('forgotPassword', body)
             .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from Forgot===>', json);
                        if(json.responseCode==200){
                            this.setState({forgotScreen:false, loading:true, loadingTitle:'Alert', loadingMessage:'Reset password link sent to your email'});
                        }else if(json.responseCode==500){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'This email does not belong to any account'});
                        }else
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+json.responseMessage});
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });

       }else{
         this.setState({validateEmail:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter valid Email!'});
       }
     }

    verifyOtp=async()=>{
     if(this.state.otp1!='' && this.state.otp2!='', this.state.otp3!='', this.state.otp4!=''){
         const otp = this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4;
         this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'verifying...'});
           const body= JSON.stringify({
                phoneOtp:otp,
                _id:this.state._id
           })
           await WebApi.postApi_WT_user('verify', body)
              .then(response => response.json())
                  .then(json => {
                     this.setState({loading:false});
                       console.log('Response from verifyOtp===>', json);
                          if(json.responseCode==200){
                            this.setState({phoneVerified:false});
                            AsyncStorage.setItem(Utils._id, json.result._id);
                            AsyncStorage.setItem(Utils.token, json.result.token);
                            this.props.navigation.navigate('Home');
                         }else{
                           this.setState({
                             loading:true,
                             loadingTitle:'Alert',
                             loadingMessage:'Oops! '+json.responseMessage,
                             phoneVerified:false,
                           })
                          }
                      })
                      .catch(error => {
                           console.log('error==>' , error)
                           this.setState({
                             loading:true,
                             loadingTitle:'Alert',
                             loadingMessage:'Oops! '+error,
                             phoneVerified:false
                           })
                      });

     }else
       this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid Otp!'})
   }

   onMessage = event => {
         if (event && event.nativeEvent.data) {
            if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
                console.log('captcha===>', event);
                if(event.nativeEvent.data=='cancel')
                    this.setState({capshow:false, captchaDone:false, validCaptcha:false});
                else
                    this.setState({capshow:false, validCaptcha:false});
                return;
            } else {
                console.log('Verified code from Google', event.nativeEvent.data);
                setTimeout(() => {
                    this.setState({capshow:false, validCaptcha:true, captchaDone:true});
                }, 1500);
            }
        }
   }

  render() {
      
      return (
      <View style={Styles.body}>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        {this.state.phoneVerified==true && ( 
              <Modal style={[commonCss.dialogue]}
                  visible={this.state.phoneVerified}
                  transparent={true}
                  animationType={"fade"}
                  onRequestClose={()=>this.setState({phoneVerified:false})}>
                <View style={commonCss.dialogue}>
                  <View style={[Styles.dialogueContainer, {marginTop:-70}]}>
                  <Icon name="close" style={Styles.close} onPress={()=>this.setState({phoneVerified:!this.state.phoneVerified})}/>
                  <Text style={Styles.phoneVeriLine}>Phone number verification</Text>
                  <Text style={{fontSize:Utils.headSize, fontWeight:'bold', marginTop:30}}>Enter Verification Code</Text>
                  <Text style={{fontSize:Utils.textSize, marginTop:20, marginHorizontal:10, textAlign:'center'}}>A text message with code was sent to your phone</Text>
                  <View style={{flexDirection:'row', marginTop:30}}>
                    <TextInput
                      style={Styles.otpBox}
                      placeholder='*'
                       returnKeyType = {"next"}
                       autoFocus = {true}
                       maxLength={1}
                       value={this.state.otp1}
                       onChangeText={(text) => { this.setState({otp1:text}); if(text!=''){this.text2.focus();}}}
                       ref={(input) => { this.text1 = input;}}
                       keyboardType={'numeric'}
                      />
                    <TextInput
                      style={Styles.otpBox}
                      placeholder='*'
                       returnKeyType = {"next"}
                       maxLength={1}
                       value={this.state.otp2}
                       onChangeText={(text) => {this.setState({otp2:text}); if(text==''){this.text1.focus();} else{this.text3.focus();}}}
                       ref={(input) => { this.text2 = input;}}
                       keyboardType={'numeric'}
                      />
                    <TextInput
                      style={Styles.otpBox}
                      placeholder='*'
                       returnKeyType = {"next"}
                       maxLength={1}
                       value={this.state.otp3}
                       onChangeText={(text) => {this.setState({otp3:text}); if(text==''){this.text2.focus();} else {this.text4.focus();}}}
                       ref={(input) => { this.text3 = input;}}
                       keyboardType={'numeric'}
                      />
                    <TextInput
                      style={Styles.otpBox}
                      placeholder='*'
                       returnKeyType = {"next"}
                       maxLength={1}
                       value={this.state.otp4}
                       onChangeText={(text) => {this.setState({otp4:text}); if(text==''){this.text3.focus();}}}
                       ref={(input) => { this.text4 = input;}}
                       keyboardType={'numeric'}
                      />
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TouchableHighlight underlayColor='none' onPress={()=>this.verifyOtp()} style={Styles.phoneVeriButton}>
                        <Text>Submit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='none' onPress={()=>this.login()} style={Styles.phoneVeriButton}>
                      <Text>Resend</Text>
                    </TouchableHighlight>
                  </View>

                  </View>
                </View>
              </Modal>
              )}
          {this.state.forgotScreen && (
          <Header title="Forgot password" menuCheck="false" rightIcon={false} data={this.props} style={Styles.header}/>
          )}
        <ScrollView keyboardShouldPersistTaps={'always'}>
           <View style={Styles.container}>
             <Image source={require('../../assets/img/logo.png')} style={Styles.logoForRegister}/>
             {this.state.forgotScreen==true ? (
                 <View style={Styles.forgotContainer}>
                    <View style={{position:'absolute', bottom:0, width:'100%'}}>
                       <TextInput
                         style={this.state.validateEmail == false ? Styles.inputTextError : Styles.inputText}
                         placeholder="Please Enter Your Email Id"
                         placeholderTextColor={Utils.colorGray}
                         value={this.state.email}
                         onChangeText={(email)=>this.validateEmail(email)}
                         />
                         <TouchableHighlight underlayColor='none' onPress={()=>this.forgot()}>
                            <View style={[Styles.loginButton,{width:'80%', alignSelf:'center', marginTop:40}]}>
                              <Text style={{fontSize:Utils.subHeadSize}}>Submit</Text>
                            </View>
                         </TouchableHighlight>
                    </View>
                 </View>
           ):(
             <View style={[commonCss.cardView, commonCss.shadow]}>
               <Text style={Styles.title}>LOGIN</Text>
               <Text style={{backgroundColor:Utils.colorGray, height:1, width:'90%', alignSelf:'center', marginTop:5}}/>
                 <TextInput
                   style={[this.state.validateName==false ? Styles.inputTextError : Styles.inputText, Platform.OS=='ios' ? {height:50}: {}]}
                   placeholder="Username Or Email"
                   placeholderTextColor={Utils.colorGray}
                   value={this.state.name}
                   autoCapitalize="none" 
                   autoCorrect={false}
                   onChangeText={(name)=>this.validateName(name)}
                   />
                   <View style={{flexDirection:'row', marginLeft:18}}>
                     <TextInput
                       style={[this.state.validatePassword==false ? Styles.inputPassError : Styles.inputPass, Platform.OS=='ios' ? {height:50} : {}]}
                       placeholder="Password"
                       placeholderTextColor={Utils.colorGray}
                       secureTextEntry={this.state.hiddenPass}
                       value={this.state.password}
                       onChangeText={(pass)=>this.validatePassword(pass)}
                       />
                      <Icon name={this.state.hiddenPass ? "eye" : "eye-slash"} style={Styles.iconForPassword} onPress={()=>this.setState({hiddenPass:!this.state.hiddenPass})}/>
                   </View>
                   <TouchableHighlight underlayColor='none' style={this.state.validCaptcha ? Styles.captcha : Styles.captchaError} onPress={async()=>{await this.setState({capshow:true}); this.captchaForm.show();}}>
                      {this.state.capshow==true ? (
                        <View style={{width:width, height:height}}>
                          <ConfirmGoogleCaptcha
                            ref={_ref => this.captchaForm = _ref}
                            siteKey={siteKey}
                            baseUrl={baseUrl}
                            languageCode='en'
                            onMessage={this.onMessage}
                            style={{width:width, height:height}}
                          />
                      </View>
                      ):(
                        <Text style={{color:Utils.colorGray, fontSize:18}}>Captcha</Text>
                      )}
                   </TouchableHighlight>
                   <View style={{alignSelf:'flex-end', marginTop:15, marginRight:20}}>
                     <Text style={Styles.acceptLine} onPress={()=>this.setState({forgotScreen:true})}>Forgot password?</Text>
                   </View>
                   <TouchableHighlight underlayColor='none' onPress={
                     ()=>
                     this.login(this.state.validateName, this.state.validatePassword)
                     }
                   >
                     <View style={[Styles.loginButton]}>
                       <Text style={{fontSize:Utils.subHeadSize}}>LOGIN</Text>
                     </View>
                   </TouchableHighlight>

                   <Text style={Styles.loginLine} onPress={()=>this.props.navigation.navigate('Register')}>Don't have an account?  <Text style={Styles.hyperLogin}>Register Now...</Text></Text>           

               </View>
               )}
            </View>
        </ScrollView>    
      </View>
    );
  }
}
