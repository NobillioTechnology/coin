import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, TouchableHighlight, BackHandler, Platform, ImageBackground, Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style';
import Header from '../Header';
import Footer from '../Footer';
import Utils from '../Utils';
import commonCss from '../Utils/commonCss';
import CustomDialog from '../CustomDialog';
import WebApi from '../../Common/WebApi';
import firebase  from '../Utils/firebase';
import RNZendeskChat from 'react-native-zendesk-v2';
import LinearGradient from 'react-native-linear-gradient';

const key='WwrUlEnUJ6pyIOyi5W8h50sQ6D8IHFzL';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

var FCMToken = {};
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
          FCMToken=token;
          console.log("Token:=====>", token);
        },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        // console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      onRegistrationError: function(err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      senderID: "418967897304",

      popInitialNotification: true,
      requestPermissions: true,
  });

const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        receiveBC:false, 
        popupShown:false,
        receiveAddress:'',
        receiveQR:'https://fullstackworld.com/storage/images/UL8ojQAm8dUqkUdtFTSNqwnLSc9NIZRi4UQIOdym.png',
        selectedLanguage:'en',
        isWaiting:false,
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
        require('../../assets/img/bg2.jpg'),
        require('../../assets/img/bg3.jpg'),
        require('../../assets/img/bg4.jpeg'),
        require('../../assets/img/bg5.jpg'),
        require('../../assets/img/bg6.jpeg')],
        vari:'bg'
       }
      this.closePopup=this.closePopup.bind(this);
      this.receiveBC=this.receiveBC.bind(this);
    }

   componentDidMount=async()=>{
    // console.log('token====>', JSON.stringify(tokenT));
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

    console.log(this.state.vari);
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     this.setState({_id:await AsyncStorage.getItem(Utils._id), receiveQR:await AsyncStorage.getItem(Utils.receiveQr), receiveAddress:await AsyncStorage.getItem(Utils.receiveWA).toString()});
      // console.log('id from getProfile====>', this.state._id);
     await this.getWalletAddress();
     this.updateLastActive();
     this.getApis();
        // alert(JSON.stringify(FCMToken));
        // console.log('FCM TOKEN====>', FCMToken);  
  }

  startZendesk(){
    RNZendeskChat.initChat('mobile_sdk_client_e9b76db55dae8aa13b01');

    RNZendeskChat.init({
      key: key,
      appId: 'f5002ba6211504109e91be20fb64508b85799cf007bfe5d3',
      url: "https://moderatorcb.zendesk.com",
      clientId: "mobile_sdk_client_e9b76db55dae8aa13b01",
    });

    // RNZendeskChat.initChat('mobile_sdk_client_e9b76db55dae8aa13b01');
    RNZendeskChat.setUserIdentity({
      name: this.state.userName,
      email: this.state.email,
    });

    RNZendeskChat.startChat({
      name: this.state.userName,
      email: this.state.email,
      phone: this.state.phone,
      tags: ['tag1', 'tag2'],
      department: "Your department",
      // chatOnly:true,
      botName:'coinbaazar'
    });

    RNZendeskChat.showHelpCenter({
      withChat: true, // add this if you want to use chat instead of ticket creation
      // disableTicketCreation: false // add this if you want to just show help center and not add ticket creation
    })
  }

  UNSAFE_componentWillReceiveProps=async()=>{
    // console.log('receive params:'+this.props.navigation.getParam(reload, ''));
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
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.getWalletAddress();
    this.setState({updatedData:true});
  }

  componentDidUpdate=async()=>{
    if(!this.state.isWaiting){
        setTimeout(async()=>{
          // this.getWalletAddress();
      const color = await AsyncStorage.getItem(Utils.colorUniversal);
      const userName = await AsyncStorage.getItem(Utils.userName);
      console.log(color, userName);
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
      this.getWalletAddress();
      this.setState({isWaiting:false});
    }, 2000);
    this.setState({isWaiting:true});
  }

  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick(){
    Alert.alert(
      'Exit Coinbaazar',
      'Are you sure want to leave Coinbaazar?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Exit', onPress: () => BackHandler.exitApp()}
      ],
      { cancelable: false }
    );
    return true;
  }

   stopLoading(){
    if(this.state.loading)
      this.setState({loading:false});
  }
   receiveBC(){
    this.setState({receiveBC:true});
    this.getApis();
   }

   getApis=async()=>{
    await WebApi.getApi_user('transferToAdminAccount/'+this.state.receiveAddress+'/'+this.state._id)
    .then(response => response.json())
      .then(json => {
          console.log('Response from trasfer to admin===>', json);
          if(json.responseCode==200){
           
          }else{
            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
          }
      })
      .catch(error => {
          console.log('error==>' , error)
          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
      });

  await WebApi.getApi_user('deposits_save/'+this.state.receiveAddress+'/'+this.state._id)
  .then(response => response.json())
    .then(json => {
        console.log('Response from deposite save===>', json);
        if(json.responseCode==200){

        }else{
          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
        }
    })
    .catch(error => {
        console.log('error==>' , error)
        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
    });        
   }

   // trans=async(text)=>{
   //   const {Translate} = require('@google-cloud/translate').v2;
   //   const translate = new Translate('translate-api-242605');
   //   const [translation] = await translate.translate(text, this.state.selectedLanguage);     
    
   //   console.log(`Text: ${text}`);
   //   console.log(`Translation: ${translation}`);   
   //   return translation;
   // }

 closePopup(){
    this.setState({popupShown:false, receiveBC:false});
  }

  updateLastActive=async()=>{
    const body = JSON.stringify({
                    userId:this.state._id,
                  })
    await WebApi.postApi_user('updateLastActive', body)
           .then(response => response.json())
                .then(json => {
                   // this.setState({loading:false});
                     // console.log('Response from updating last seen===>', json);
                        if(json.responseCode==200){

                        }else{
                          // this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });

  }

  getWalletAddress=async()=>{
    const body = JSON.stringify({
                    _id:this.state._id,
                  })
    await WebApi.postApi_user('userProfile', body)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                    //  console.log('Response from getProfile===>', json.result);
                        if(json.responseCode==200){
                            const data = json.result
                            var qr = 'https://fullstackworld.com/storage/images/UL8ojQAm8dUqkUdtFTSNqwnLSc9NIZRi4UQIOdym.png';
                            if(data.qrCodeUrlAddress!='')
                              qr = data.qrCodeUrlAddress;
                              var walletAdd = '';
                              if(typeof(data.btc.addresses[0].addr)==='string')
                              walletAdd = data.btc.addresses[0].addr;
                            AsyncStorage.setItem(Utils.receiveQr, qr);
                            AsyncStorage.setItem(Utils.receiveWA, walletAdd);
                            this.setState({
                              receiveAddress:walletAdd,
                              receiveQR:qr,
                              userName:data.user_name,
                              email:data.email,
                              phone:data.phone_number
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

  startChat(){
    ZendeskChat.startChat({
      name: user.full_name,
      email: user.email,
      phone: user.mobile_phone,
      tags: ["tag1", "tag2"],
      department: "Your department",
      // The behaviorFlags are optional, and each default to 'true' if omitted
      behaviorFlags: {
        showAgentAvailability: true,
        showChatTranscriptPrompt: true,
        showPreChatForm: true,
        showOfflineForm: true,
      },
      // The preChatFormOptions are optional & each defaults to "optional" if omitted
      preChatFormOptions: {
        name: !user.full_name ? "required" : "optional",
        email: "optional",
        phone: "optional",
        department: "required",
      },
      localizedDismissButtonTitle: "Dismiss",
    });
  }

  render() {

    return (
      <View style={Styles.body}>
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title="Home" menuCheck="true" rightIcon={false} data={this.props} style={Styles.header}/>
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>

            {this.state.receiveBC==true && (
              <CustomDialog
                title="Receive Bitcoins"
                address={this.state.receiveAddress}
                qr={this.state.receiveQR}
                actionPer={this.closePopup}
             />
            )}
            <Image source ={require('../../assets/img/logo.png')} style={Styles.logo} />
            <View style={{flexDirection:'row', alignSelf:'center', width:'95%' }}>
              <TouchableHighlight underlayColor='none'  onPress={()=>{this.props.navigation.navigate('BuyHome', {role:'Buy'})}}>
                <View style={{width:width/3}}>
                  <View style={Styles.imageBuyView}>
                  <Image source={require('../../assets/img/buy.png')} style={Styles.imageBuy}/>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none'  onPress={()=>{this.props.navigation.navigate('BuyHome', {role:'Sell'})}}>
                <View style={{width:width/3}}>
                  <View style={Styles.imageBuyView}>
                    <Image source={require('../../assets/img/sell.png')} style={Styles.imageBuy}/>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('SendHome')}}>
                <View style={{width:width/3}}>
                  <View style={Styles.imageBuyView}>
                    <Image source={require('../../assets/img/send.png')} style={Styles.imageBuy}/>
                  </View>
                </View>
              </TouchableHighlight>

            </View>
            <TouchableHighlight underlayColor='none' onPress={this.receiveBC}>
              {/* <View style={[Styles.capsule, {backgroundColor:Utils.colorDarkBlue, marginTop:50, borderWidth:1, borderColor:Utils.colorGreen}]}> */}
              <LinearGradient colors={[Utils.colorWhite, Utils.colorBlue ]} style={{marginTop:50, height:50,justifyContent:'center', alignItems:'center', borderRadius:25, paddingHorizontal:55}}>
                <Text style={{fontSize:Utils.subHeadSize}}>RECEIVE BTC</Text>
                 <Image source={require('../../assets/img/qr.png')} style={Styles.qrImage}/>
              </LinearGradient>
              {/* </View> */}
            </TouchableHighlight>

            <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('CreateAd')}>
            <LinearGradient colors={[Utils.colorWhite, Utils.colorDarkBlue]} style={{marginTop:20, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, paddingHorizontal:60}}>
            {/* <View style={[Styles.capsule, {backgroundColor:Utils.colorGreen, borderWidth:1, borderColor:Utils.colorDarkBlue}]}> */}
              <Text style={{fontSize:Utils.subHeadSize}}>CREATE AD</Text>
            {/* </View>  */}
              </LinearGradient>
            </TouchableHighlight>

          </View>
        </ScrollView>
        <TouchableHighlight underlayColor='none' onPress={()=>this.startZendesk()} style={[Styles.plusMsg, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow]}>
          <View>
             <Text style={{fontSize:Utils.textSize+4, color:Utils.colorWhite}}>Help</Text>
          </View>
        </TouchableHighlight>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={'Home'}/>
        </ImageBackground>
      </View>
    );
  }
}