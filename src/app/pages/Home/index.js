import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, TouchableHighlight, BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style';
import Header from '../Header';
import Footer from '../Footer';
import Utils from '../Utils';
import commonCss from '../Utils/commonCss';
import CustomDialog from '../CustomDialog';
import WebApi from '../../Common/WebApi';
// import PushNotification from 'react-native-push-notification';
import firebase  from '../Utils/firebase';
// import ZendeskChat from "react-native-zendesk-chat";
// ZendeskChat.init("d5387da4-a81e-46f5-ae0d-8bba0462fc45");

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
        selectedLanguage:'en'
      }
      this.closePopup=this.closePopup.bind(this);
      this.receiveBC=this.receiveBC.bind(this);
    }

   componentDidMount=async()=>{
    // console.log('token====>', JSON.stringify(tokenT));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     this.setState({_id:await AsyncStorage.getItem(Utils._id), receiveQR:await AsyncStorage.getItem(Utils.receiveQr), receiveAddress:await AsyncStorage.getItem(Utils.receiveWA).toString()});
     this.getWalletAddress();

      
        alert(JSON.stringify(FCMToken));
        console.log('FCM TOKEN====>', FCMToken);
  }

  componentDidUpdate(){
         this.updateLastActive();
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick(){
    BackHandler.exitApp();
    return true;
  }

   stopLoading(){
    if(this.state.loading)
      this.setState({loading:false});
  }
   receiveBC(){
     this.setState({receiveBC:true});
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
                    //  console.log('Response from getProfile===>',json.result.btc);
                        if(json.responseCode==200){
                            const data = json.result
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
                            this.setState({
                              receiveAddress:walletAdd,
                              receiveQR:qr
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
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
       <Header title="Home" menuCheck="true" rightIcon={true} data={this.props} style={Styles.header}/>
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

            <Image source ={require('../../assets/img/logo.png')} style={commonCss.logo} />
            <View style={{flexDirection:'row', alignSelf:'center', width:'95%' }}>
              <TouchableHighlight underlayColor='none'  onPress={()=>{this.props.navigation.navigate('BuyHome', {role:'Buy'})}}>
                <View style={{width:width/3}}>
                  <View style={Styles.imageBuyView}>
                  <Image source={require('../../assets/img/buy.jpg')} style={Styles.imageBuy}/>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none'  onPress={()=>{this.props.navigation.navigate('BuyHome', {role:'Sell'})}}>
                <View style={{width:width/3}}>
                  <View style={Styles.imageBuyView}>
                    <Image source={require('../../assets/img/sell.jpg')} style={Styles.imageBuy}/>
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none' onPress={()=>{this.props.navigation.navigate('SendHome')}}>
                <View style={{width:width/3}}>
                  <View style={Styles.imageBuyView}>
                    <Image source={require('../../assets/img/send.jpg')} style={Styles.imageBuy}/>
                  </View>
                </View>
              </TouchableHighlight>

            </View>
            <TouchableHighlight underlayColor='none' onPress={this.receiveBC}>
              <View style={[Styles.capsule, {backgroundColor:Utils.colorOrange}]}>
                <Text style={{fontSize:Utils.subHeadSize}}>RECEIVE BTC</Text>
                 <Image source={require('../../assets/img/qr.png')} style={Styles.qrImage}/>
              </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('CreateAd')}>
              <View style={Styles.capsule}>
              <Text style={{fontSize:Utils.subHeadSize}}>CREATE AD</Text>
              </View>
            </TouchableHighlight>

          </View>
        </ScrollView>
        <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('Zendesk')} style={[Styles.plusMsg, Styles.shadow]}>
          <View>
             <Text style={{fontSize:Utils.textSize+4, color:Utils.colorWhite}}>Help</Text>
          </View>
        </TouchableHighlight>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={'Home'}/>
      </View>
    );
  }
}


           // <Image source={require('../../assets/img/wallet.png')} style={Styles.plusMsgIcon}/>
