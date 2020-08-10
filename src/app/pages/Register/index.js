

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, StyleSheet, TouchableHighlight, CheckBox, BackHandler,
  Dimensions
} from 'react-native';
import Styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome';
import FormEngine from 'react-native-form-engine';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DeviceInfo from 'react-native-device-info';
import ConfirmGoogleCaptcha from 'react-native-recaptcha-v2-enhanced';
const siteKey = '6LfoW5kUAAAAANJBVkOkyyjm_OLB7NlCKpdJLo7c';
const baseUrl = 'https://uat.coinbaazar.com/api/v1';


export default class Login extends Component {

  constructor(props) {
    super(props);
     this.state={
       passwordType:true, 
       registerScreen:false,
       loading:false, 
       loadingTitle:'Please Wait',
       loadingMessage:'loading...',
       name:'', email:'', password:'', confirmPass:'', agree:false,
       validateName:true, validateEmail:true, validatePassword:true, validateConfirmPass:true,
       captcha:true, validCaptcha:true, captchaDone:false,
     }
     this.stopLoading=this.stopLoading.bind(this);
     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

   setPasswordType(){
       this.setState({passwordType:!this.state.passwordType})
   }

 
   componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if(this.state.registerScreen==true){
        this.setState({registerScreen:false});
        // alert('hello');
        return true;
    }else{
        // this.props.navigation.goBack(null);
        return false;
    }
  }

   goToHome(){
    this.setState({loading:true});
    setTimeout(()=>{  
     this.props.navigation.navigate('SetPassword')
    }, 1000);
   }

   stopLoading(){
     this.setState({loading:false});
   }

   validateName=async(val)=>{
     await this.setState({name:val});
     if(this.state.name.length>3){
       await this.setState({validateName:true})
     }else 
       await this.setState({validateName:false})
   }

   validateEmail=async(email)=>{
     await this.setState({email:email});
     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (reg.test(email) === true)
    // if(email.length>5)
       await this.setState({validateEmail:true});
      else
       await this.setState({validateEmail:false});
   }

   validatePassword=async(pass)=>{
     await this.setState({password:pass});
     if(this.state.password.length>7){
         const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
         if(reg.test(pass)===true){
           this.setState({validatePassword:true, errorMsg:''});
         }else{
           this.setState({validatePassword:false, errorMsg:'* Too easy, please include at least 1 capital letter , digit and special symbol'});
         }
       }else{
         await this.setState({validatePassword:false, errorMsg:'* Please enter atleast 8 character'});
       }
   }

   validateConfirmPass=async(pass)=>{
     await this.setState({confirmPass:pass});
     if(this.state.password!=this.state.confirmPass)
         await this.setState({validateConfirmPass:false});
     else
         await this.setState({validateConfirmPass:true});
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


   register=async()=>{
     if(this.state.name!='' && this.state.validateName){
        if(this.state.email!='' && this.state.validateEmail){
          if(this.state.password!=='' && this.state.validatePassword){
            if(this.state.confirmPass!=='' && this.state.validateConfirmPass){
              if(this.state.agree!==false){
                if(this.state.captchaDone){

                this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Registering...'});
                const body = JSON.stringify({
                                user_name: this.state.name,
                                email: this.state.email,
                                password: this.state.password,
                                confirm_password: this.state.confirmPass,
                                opt_key: 'false',
                                system_ip: await DeviceInfo.getDeviceId(),
                              });
                await WebApi.postApi_WT_user('signup', body)
                  .then(response => response.json())
                    .then(json => {
                       this.setState({loading:false});
                       console.log('response from register=>', json);
                        if(json.responseCode==200){
                            this.setState({dataSource:json, loading:true, loadingTitle:'Alert', loadingMessage:'Success!\nVerification link has been sent to your Email'});
                            this.props.navigation.navigate('Login');
                        }
                        else if(json.responseCode==400){
                          if(json.responseMessage=='Phone number already exists.'){
                              this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'You already have an account!\n Try to login!'});
                              this.props.navigation.navigate('Login');
                          }else if(json.responseMessage=='Username already exist'){
                              this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'This userName already exists!\nTry different one!'});
                          }else
                              this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }else
                              this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+json.responseMessage});
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
                  }else
                 this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Please complete the Captcha!', validCaptcha:false});                  
              }else
                 this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Please accept the T&C and Privacy policy'});
            }else{
                await this.setState({validateConfirmPass:false, loading:true, loadingTitle:'Alert', loadingMessage:'Password didnt match'});
              }
          }else{
              await this.setState({validatePassword:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter a valid Password'});
            }
        }else{
           await this.setState({validateEmail:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter a valid Email'});
          }
      }else{
         await this.setState({validateName:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter a valid userName'});
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
        <ScrollView keyboardShouldPersistTaps={'always'}>
          {this.state.registerScreen ? (
           <View style={Styles.containerForRegisterrrr}>
             <Image source={require('../../assets/img/logo.png')} style={Styles.logoForRegister}/>
             <View style={[Styles.subBody, Styles.shadow]}>
               <Text style={Styles.title}>REGISTER</Text>
               <Text style={Styles.subtitle}>Create an Account and start usong your wallet.</Text>
               <Text style={Styles.bottomLine}/>
               <View style={Styles.form}>
                 <TextInput
                   style={this.state.validateName==false ? Styles.inputTextError : Styles.inputText}
                   placeholder="UserName"
                   placeholderTextColor={Utils.colorGray}
                   value={this.state.name}
                   onChangeText={(name)=>this.validateName(name)}
                   />
                 <TextInput
                   style={this.state.validateEmail==false ? Styles.inputTextError : Styles.inputText}
                   placeholder="Email ID"
                   placeholderTextColor={Utils.colorGray}
                   value={this.state.email}
                   onChangeText={(email)=>this.validateEmail(email)}
                   />
                 <TextInput
                   style={this.state.validatePassword==false ? Styles.inputTextError : Styles.inputText}
                   placeholder="Password"
                   placeholderTextColor={Utils.colorGray}
                   secureTextEntry={this.state.passwordType}
                   value={this.state.password}
                   onChangeText={(pass)=>this.validatePassword(pass)}
                   />
                   {this.state.errorMsg!='' && (
                     <Text style={{color:Utils.colorRed, marginHorizontal:20}}>{this.state.errorMsg}</Text>
                     )}
                  <TextInput
                     style={this.state.validateConfirmPass==false ? Styles.inputTextError : Styles.inputText}
                     placeholder="Confirm Password"
                     placeholderTextColor={Utils.colorGray}
                     secureTextEntry={this.state.passwordType}
                     value={this.state.confirmPass}
                     onChangeText={(pass)=>this.validateConfirmPass(pass)}
                   />

                   <TouchableHighlight underlayColor='none' style={this.state.validCaptcha ? Styles.captcha : Styles.captchaError} onPress={async()=>{await this.setState({capshow:true}); this.captchaForm.show();}}>
                      {this.state.capshow==true ? (
                      <ConfirmGoogleCaptcha
                        ref={_ref => this.captchaForm = _ref}
                        siteKey={siteKey}
                        baseUrl={baseUrl}
                        languageCode='en'
                        onMessage={this.onMessage}
                      />)
                      :(
                        <Text style={{color:Utils.colorGray, fontSize:18}}>Captcha</Text>
                      )}
                   </TouchableHighlight>

                   <View style={{flexDirection:'row', marginTop:10, marginLeft:10, alignItems:'center'}}>
                     <CheckBox 
                       value={this.state.agree}
                       onValueChange={()=>this.setState({agree:!this.state.agree})}
                     />
                     <Text style={Styles.acceptLine}>I accept the <Text style={Styles.hyperLink}>T&C</Text> and <Text style={Styles.hyperLink}>Privacy policy</Text></Text>
                   </View>

                   <Text style={[Styles.loginButton, {width:'70%',alignSelf:'center', marginTop:10}]} onPress={()=>this.register()}>REGISTER</Text>

                   <Text style={Styles.loginLine} onPress={()=>this.props.navigation.navigate('Login')}>Already have an account? <Text style={Styles.hyperLogin}>LOGIN</Text></Text>           

               </View>
             </View>
          </View>
          ):(
          <View style={Styles.container}>
           <Image source={require('../../assets/img/logo.png')} style={Styles.logo}/>
              <View style={Styles.subBody}>
               <Text style={Styles.tagLine}>A LOW FEE P2P EXCHANGE FASTEST & SIMPLEST WAY TO BUY/SELL BITCOINS</Text>
              </View>
              <View style={Styles.buttonsView}>
                 <Text style={Styles.createButton} onPress={()=>this.setState({registerScreen:true})}>Create An Account</Text>
                 <Text style={Styles.loginButton} onPress={()=>this.props.navigation.navigate('Login')}>Login</Text>
              </View>
         </View>
        )}
        </ScrollView>
      </View>
    );
  }
}
