import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, TouchableHighlight, Modal, BackHandler
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import CommonCss from '../Utils/commonCss';
import ImagePicker from 'react-native-image-picker';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DropDown from '../DropDown';
import RNZendeskChat from 'react-native-zendesk-v2';

const key='WwrUlEnUJ6pyIOyi5W8h50sQ6D8IHFzL';
// let options = {
//       title: 'Select Image',
//       customButtons: [
//         { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        imageSelector:false,
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'loading...',
        file:'', fileName:'Upload file (optional)', validFile:true,
        email:'13badbola@gmail.com', validEmail:true, msg:'', validMsg:true,
        dropDown:false, zen:false,
        name:'sanjeev kumar', validName:true,
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
    }

    componentDidMount=async()=>{
      let user={"full_name":"sanjeev kumar", "mobile_phone":"7500063621", "email":'13badbola@gmail.com'}
      BackHandler.addEventListener('hardwareBackPress', this.handleBack);
//       ZendeskChat.init("d5387da4-a81e-46f5-ae0d-8bba0462fc45");
      RNZendeskChat.initChat('mobile_sdk_client_e9b76db55dae8aa13b01');

      RNZendeskChat.init({
        key: key,
        appId: 'f5002ba6211504109e91be20fb64508b85799cf007bfe5d3',
        url: "https://moderatorcb.zendesk.com",
        clientId: "mobile_sdk_client_e9b76db55dae8aa13b01",
      });

      // RNZendeskChat.initChat('mobile_sdk_client_e9b76db55dae8aa13b01');
      RNZendeskChat.setUserIdentity({
        name: this.state.name,
        email: this.state.email,
      });

      RNZendeskChat.startChat({
        name: user.full_name,
        email: user.email,
        phone: user.mobile_phone,
        tags: ['tag1', 'tag2'],
        department: "Your department",
        // chatOnly:true,
        botName:'coinbaazar'
      });

      RNZendeskChat.showHelpCenter({
        withChat: true, // add this if you want to use chat instead of ticket creation
        disableTicketCreation: false // add this if you want to just show help center and not add ticket creation
      })
    }

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    handleBack(){
     if(this.state.imageSelector){
         this.setState({imageSelector:false});
         return true;
       }else{
          this.props.navigation.goBack(null);
          return true;
      }
    }

   validateEmail=async(email)=>{
     await this.setState({email:email});
     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (reg.test(email) === true)
       await this.setState({validEmail:true});
      else
       await this.setState({validEmail:false});
   }

   stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }
  selectImage(){
    if(!this.state.imageSelector)
      this.setState({imageSelector:true});
  }

  resetImage(){
        this.setState({
          imageSelector:false,
            file: '',
            fileName:'Upload File(Scan copy of front side)',
            validFile:false
        });
  }

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    if(this.state.imageSelector==true)
      this.setState({imageSelector:false});

    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
          this.handleBackButtonClick();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
          this.handleBackButtonClick();
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
          this.handleBackButtonClick();
      } else {
                this.setState({
                file: 'data:image/png;base64,'+response.data,
                // fileName:response.fileName,
              });
          }
    });

  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

     if(this.state.imageSelector==true)
      this.setState({imageSelector:false});

    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
              this.setState({
                file: 'data:image/png;base64,'+response.data,
                // fileName:response.fileName,
              });
        }
    });

  }

  send=async()=>{
    if(this.state.name!=''){
      if(this.state.email!='' && this.state.validEmail){
          if(this.state.msg!=''){
            if(this.state.captchaDone){
                this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Sending...'});
            

                
                    }else{
                      this.setState({validCaptcha:false});
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Completed Captcha!'});          
                    }
          }else{
            this.setState({validMsg:false});
            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter Message!'});
          }
      }else{
        this.setState({validEmail:false});
        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter a valid Email!'});
      }
    }else{
      this.setState({validName:false});
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter your Name!'});
    }

  }

  render() {
    
    return (
      null
    );
  }
}
