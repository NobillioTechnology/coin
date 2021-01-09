import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, Modal, BackHandler, Platform,
  ImageBackground
} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import CommonCss from '../Utils/commonCss';
import ImagePicker from 'react-native-image-picker';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DropDown from '../DropDown';
import ConfirmGoogleCaptcha from 'react-native-recaptcha-v2-enhanced';
const siteKey = '6LfoW5kUAAAAANJBVkOkyyjm_OLB7NlCKpdJLo7c';
const baseUrl = 'https://uat.coinbaazar.com/api/v1';

let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        imageSelector:false,
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'loading...',
        file:'', fileName:'Upload file (optional)',validFile:true,
        subject:'Select', validSubject:true, email:'', validEmail:true, msg:'', validMsg:true,
        dropDown:false, zen:false,
        name:'', validName:true,
        captcha:true, validCaptcha:true, captchaDone:false,
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
            require('../../assets/img/bg2.jpg'),
            require('../../assets/img/bg3.jpg'),
            require('../../assets/img/bg4.jpeg'),
            require('../../assets/img/bg5.jpg'),
            require('../../assets/img/bg6.jpeg')],     
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
      this.closeDrop=this.closeDrop.bind(this);
      this.chooseDropItem=this.chooseDropItem.bind(this);
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

      BackHandler.addEventListener('hardwareBackPress', this.handleBack);
      const _id = await AsyncStorage.getItem(Utils._id);
      this.setState({_id:_id});
    }

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidUpdate=async()=>{
      if(!this.state.isWaiting){
          setTimeout(async()=>{
        const color = await AsyncStorage.getItem(Utils.colorUniversal);
        console.log(color);
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
        this.setState({isWaiting:false});
      }, 2000);
      this.setState({isWaiting:true});
    }
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
     if(this.state.loadingTitle=='Success')
       this.props.navigation.navigate('Home');
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
      quality:1, 
      maxWidth: 1000, 
      maxHeight: 1000,
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
                fileName:response.fileName,
              });
          }
    });

  }

  launchImageLibrary = () => {
    let options = {
      quality:1, 
      maxWidth: 1000, 
      maxHeight: 1000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

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
                fileName:'Attached',
                imageSelector:false,
              });
        }
    });

  }

   chooseDropItem(item){
       this.setState({dropDown:false, subject:item.value, validSubject:true});
  }

  closeDrop(){
    this.setState({dropDown:false});
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
       }}}

  send=async()=>{
    if(this.state.subject!='Select'){
      if(this.state.email!='' && this.state.validEmail){
          if(this.state.msg!=''){
            if(this.state.captchaDone){
                this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Sending...'});
                
              await WebApi.contactUs(this.state.subject, this.state.msg, this.state.email, this.state.file)
                .then(response => response.json())
                  .then(json => {
                    this.setState({loading:false});
                      console.log('Response from contactUs===>', json);
                          if(json.responseCode==200){
                            this.setState({loading:true, loadingTitle:'Success', loadingMessage:json.responseMessage});
                           }else{
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                          }
                      })
                      .catch(error => {
                          this.setState({loading:false});
                          console.log('error==>' , error)
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:error});
                      });

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
      this.setState({validSubject:false});
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Select Subject!'});
    }

  }

  render() {
   console.log(this.props.navigation.state.key)
    
    return (
      <View style={Styles.body}>
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title="Contact Us" menuCheck="true" data={this.props} style={Styles.header}/>
         <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
          <DropDown
            closeDrop={this.closeDrop}
            dropdown={this.state.dropDown}
            choose={this.chooseDropItem}
            items={[
                    {label:'Account Issue', value:'Account Issue'},
                    {label:'Admin', value:'Admin'},
                ]}
          />
          <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={[Styles.container, Platform.OS=='ios' ? [Styles.shadowIos, {marginBottom:250}] : Styles.shadow]}>
            <View style={Styles.radioView}>
              <Text style={Styles.radioText}>Subject:</Text>
              <TouchableHighlight style={this.state.validSubject==false ? Styles.pickerViewError : Styles.pickerView} onPress={()=>this.setState({dropDown:true})} underlayColor='none'>
                <View style={{flexDirection:'row'}}>
                  <Text style={this.state.subject=='Select' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.subject}</Text>
                  <Icon name='sort-down' style={Styles.dropIcon}/>
                </View>
              </TouchableHighlight>
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
                <Text style={Styles.radioText}>Message Here:</Text>
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
            <TouchableHighlight underlayColor='none' onPress={()=>{if(this.state.zen)this.zendesk(); else this.send()}}>
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
      </ImageBackground>
      </View>
    );
  }
}
