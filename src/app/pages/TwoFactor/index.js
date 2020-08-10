

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, Modal, BackHandler, AsyncStorage
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import RadioForm from 'react-native-simple-radio-button';
import utils from '../Utils';
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
        otpFactor:false,
        googleFactor:false,
        googleSecret:'',
        googleQrImage:'https://fullstackworld.com/storage/images/UL8ojQAm8dUqkUdtFTSNqwnLSc9NIZRi4UQIOdym.png',
        googleOtp:'',
        loading:true,
        loadingTitle:'Please Wait',
        loadingMessage:'loading...'
      }
      this.flipDialog=this.flipDialog.bind(this);
      this.closeDialog=this.closeDialog.bind(this);
      this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
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
                     console.log('Response from getProfile===>', json);
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
                     console.log('Response from getGoogleFactor===>', json);
                        if(json.responseCode==200){
                            // alert(json.result.time_zone);
                            var qr = 'https://fullstackworld.com/storage/images/UL8ojQAm8dUqkUdtFTSNqwnLSc9NIZRi4UQIOdym.png';
                            if(json.data.qrCodeUrlAddress!='')
                              qr = json.data.qrCodeUrlAddress;

                            this.setState({
                                       googleSecret:json.data.secret,
                                       googleQrImage:qr,
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

   setGoogleFactor=async()=>{
      if (this.state.googleOtp!=''){
          this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'loading...'});   
           await WebApi.setGoogleFactor(this.state.googleOtp)
              .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                    console.log('Response from getGoogleFactor===>', json);
                    if(json.responseCode==200){
                        // alert(json.result.time_zone);
                        this.setState({
                                   dialog:false,
                                   loading:true,
                                   loadingTitle:'Alert',
                                   loadingMessage:json.responseMessage
                               })
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                     console.log('error==>' , error)
                     this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                });
      }else{
        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid OTP!'});
      }
   }



  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
       <Header title="Two-Factor Autentication" menuCheck="false" data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          {this.state.dialog==true && (
            <View style={Styles.itemBodyDialog}>
              <Modal style={[Styles.dialogue]}
                visible={this.state.dialog}
                transparent={true}
                animationType={"fade"}
                onRequestClose={ () => { this.flipDialog()}}>
                   <View style={Styles.dialogue}>
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
                      <Image source={{uri:this.state.googleQrImage}} style={Styles.qr}/>

                      <Text style={[Styles.dialogSubtitle, {fontSize:14, marginTop:10, textAlign:'center'}]}>SecretKey: {this.state.googleSecret}</Text>

                      <Text style={[Styles.dialogSubtitle, {fontSize:14, marginLeft:20, marginTop:20, fontWeight:'bold'}]}>Authentication code</Text>

                      <View style={Styles.bitAddressView}>
                        <TextInput style={Styles.bitAddress}
                          value={this.state.googleOtp}
                          onChangeText={(otp)=>this.setState({googleOtp:otp})}
                        />
                        <Icon name="copy" style={Styles.copyIcon}/>
                      </View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setGoogleFactor()} style={[Styles.submit]}>
                        <View>
                          <Text>ACTIVE</Text>
                        </View>
                      </TouchableHighlight>
                    </View>           
                  </View>
              </Modal>
            </View>
          )}
          <View style={Styles.container}>
            <View style={{alignSelf:'center', justifyContent:'center', width:width, height:height-150}}>
              <View style={[Styles.itemBody,Styles.shadow, {alignSelf:'center'}]}>
                <Text style={{alignSelf:'center', margin:10}}>OTP Two-factor authentication is</Text>
                <TouchableHighlight underlayColor='none' onPress={()=>this.setOtpFactor()}>
                  <View style={this.state.otpFactor==false ? Styles.buttonRed : Styles.buttonGreen}>
                    {this.state.otpFactor==false ? (
                      <Text style={Styles.disbleText}>DISABLED AUTHENTICATOR</Text>
                      ):(
                       <Text>ENABLED AUTHENTICATOR</Text>
                      )
                    }
                  </View>
                </TouchableHighlight>
              </View>
              <View style={[Styles.itemBody,Styles.shadow, {alignSelf:'center'}]}>
                <Text style={{alignSelf:'center', margin:10}}>Google Two-factor authentication is</Text>
                <TouchableHighlight underlayColor='none' onPress={()=>{this.flipDialog()}}>
                  <View style={this.state.googleFactor==false ? Styles.buttonRed : Styles.buttonGreen}>
                    {this.state.googleFactor==false ? (
                      <Text style={Styles.disbleText} >DISABLED AUTHENTICATOR</Text>
                      ):(
                      <Text>ENABLED AUTHENTICATOR</Text>
                      )
                    }
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation}/>
      </View>
    );
  }
}
