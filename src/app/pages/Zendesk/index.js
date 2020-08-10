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

const key='d5387da4-a81e-46f5-ae0d-8bba0462fc45';
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
        email:'', validEmail:true, msg:'', validMsg:true,
        dropDown:false, zen:false,
        name:'', validName:true,
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
    }

    componentDidMount=async()=>{
      let user={"full_name":"sanjeev kumar", "mobile_phone":"7500063621", "email":'13badbola@gmail.com'}
      BackHandler.addEventListener('hardwareBackPress', this.handleBack);
//       ZendeskChat.init("d5387da4-a81e-46f5-ae0d-8bba0462fc45");
      RNZendeskChat.init({
        key: key,
        appId: key,
        url: "https://www.coinbaazar.com/api/v1/",
        clientId: "",
      });

      RNZendeskChat.initChat('d5387da4-a81e-46f5-ae0d-8bba0462fc45');
      // RNZendeskChat.setUserIdentity({
      //   name: this.state.name,
      //   email: this.state.email,
      // });

      // RNZendeskChat.startChat({
      //   name: user.full_name,
      //   email: user.email,
      //   phone: user.mobile_phone,
      //   tags: ['tag1', 'tag2'],
      //   department: "Your department",
      //   chatOnly:false,
      //   botName:'hello'
      // });

      RNZendeskChat.showHelpCenter({
        withChat: false, // add this if you want to use chat instead of ticket creation
        // disableTicketCreation: false // add this if you want to just show help center and not add ticket creation
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
      <View style={Styles.body}>
       <Header title="Leave us a message" menuCheck="false" data={this.props} style={Styles.header}/>
         <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
          <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={[Styles.container,Styles.shadow]}>
            {/* <RNZendeskChat /> */}
            <View style={Styles.radioView}>
              <Text style={Styles.radioText}>Your Name (Optional):</Text>
                <View style={this.state.validName ? Styles.pickerView : Styles.pickerViewError}>
                <TextInput style={{paddingHorizontal:10}}
                  placeholder={'Enter your name'}
                  value={this.state.name}
                  onChangeText={(name)=>this.setState({name:name, validName:true})}
                />
                </View>
            </View>
            <View style={Styles.radioView}>
                <Text style={Styles.radioText}>Email Address:</Text>
                <View style={this.state.validEmail==false ? Styles.inputTextError : Styles.inputText}>
                  <TextInput
                    value={this.state.email}
                    onChangeText={(email)=>this.validateEmail(email)}
                  />
                </View>
              </View>

            <View style={{marginTop:20, marginLeft:20}}>
                <Text style={Styles.radioText}>{this.state.zen ? 'How can we help you?' :'Message Here:'}</Text>
                <TextInput 
                  style={this.state.validMsg==false ? Styles.inputTextAreaError : Styles.inputTextArea}
                  value={this.state.msg}
                  onChangeText={(text)=>this.setState({msg:text, validMsg:true})}
                  multiline={true}
                 />
            </View>

            <View style={{marginTop:20, marginLeft:20}}>
                <Text style={Styles.radioText}>Attach Document:</Text>
                <TouchableHighlight underlayColor='none' onPress={()=>this.selectImage()}>
                  <View style={Styles.detailRow}>
                    <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorGray}}>{this.state.fileName}</Text>
                    <Icon name={this.state.file!='' ? 'close' : 'paperclip'} style={Styles.rightIcon} onPress={()=>this.resetImage()}/>
                </View>
                </TouchableHighlight>
            </View>  
            <TouchableHighlight underlayColor='none' onPress={()=>this.send()}>
              <View style={Styles.sendButton}>
                <Text style={{fontSize:Utils.headSize}}>Send</Text>
              </View>
            </TouchableHighlight>
            {/* <ReactZenDeskChat appID="d5387da4-a81e-46f5-ae0d-8bba0462fc45" /> */}
          </View>
        </ScrollView>
        {this.state.imageSelector==true && (
         <View>
           <Modal style={CommonCss.dialogue}
            isVisible={this.state.imageSelector}
            transparent={true}
            animationType={"fade"}
            onRequestClose={()=>this.setState({imageSelector:false})}
            >
             <View style={CommonCss.dialogue}>
              <View style={CommonCss.dialogueContainer}>
                  <Text style={CommonCss.dialogCamera} onPress={()=>this.launchCamera(this.state.imageCount)}>Camera</Text>
                  <Image style={{width:280, height:1, backgroundColor:Utils.colorGray}} />
                  <Text style={CommonCss.dialogCamera} onPress={()=>this.launchImageLibrary(this.state.imageCount)}>Gallery</Text>
                  <Image style={{width:280, height:1, backgroundColor:Utils.colorGray}} />
                  <Text style={CommonCss.dialogueCancel}
                    onPress={()=>this.setState({imageSelector:!this.state.imageSelector})}
                  >Close</Text>
                </View>
              </View>
            </Modal>
         </View>
        )}
      </View>
    );
  }
}
