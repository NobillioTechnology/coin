import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, ImageBackground,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../../Header';
import Utils from '../../Utils';
import utils from '../../Utils';
import commonCss from '../../Utils/commonCss';
import ProgressBar from '../../ProgressBar';
import WebApi from '../../../Common/WebApi';
import Icon from 'react-native-vector-icons/FontAwesome';
const width = Dimensions.get('window').width;

export default class Home extends Component {

  state={
    
  }

  constructor(props) {
    super(props);
      this.state={
        role:'', loading:false, loadingTitle:'Please Wait', loadingMessage:'Updating...', _id:'',
        oldPass:'', newPass:'', confirmPass:'', email:'', visiOld:true, visiNew:true, visiCon:true,
        validOldPass:true, validNewPass:true, validConfirmPass:true, validEmail:true,
        color:require('../../../assets/img/bg.jpg'),
        img:[require('../../../assets/img/bg.jpg'),
        require('../../../assets/img/bg2.jpg'),
        require('../../../assets/img/bg3.jpg'),
        require('../../../assets/img/bg4.jpeg'),
        require('../../../assets/img/bg5.jpg'),
        require('../../../assets/img/bg6.jpeg')],     
      }
      this.state.role=this.props.navigation.state.params.role
     this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
     await this.setState({_id: await AsyncStorage.getItem(Utils._id)});

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

   }


  stopLoading(){
    this.setState({loading:false});
  }

  validateEmail=async(email)=>{
     await this.setState({email:email});
     const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if (reg.test(email) === true)
       await this.setState({validEmail:true});
      else
       await this.setState({validEmail:false});
   }

   valididateOldPass=async(pass)=>{
     await this.setState({oldPass:pass});
     if(this.state.oldPass.length>7){
         this.setState({validOldPass:true});
       }
      else{
         this.setState({validOldPass:false});
        }
   }
   valididateNewPass=async(pass)=>{
     await this.setState({newPass:pass});
     if(this.state.newPass.length>7){
         this.setState({validNewPass:true});
         const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
         if(reg.test(pass)===true){
           this.setState({validNewPass:true, errorMsg:''});
         }else{
           this.setState({validNewPass:false, errorMsg:'* Too easy, please include at least 1 capital letter , digit and special symbol'});
         }
       }
      else{
         this.setState({validNewPass:false, errorMsg:'* Please enter atleast 8 character'});
        }
   }
  valididateConfirmPass=async(pass)=>{
     await this.setState({confirmPass:pass});
     if(this.state.confirmPass.length>5 && this.state.confirmPass===this.state.newPass){
         this.setState({validConfirmPass:true});
       }
      else{
         this.setState({validConfirmPass:false});
        }
  }

  changePassword=async()=>{
     if(this.state.oldPass!='' && this.state.validOldPass){
       if(this.state.newPass!=''&& this.state.validNewPass){
           if(this.state.confirmPass!='' && this.state.validConfirmPass){
               this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Changing passsword...'});
               const body = JSON.stringify({
                               _id:this.state._id,
                               password:this.state.oldPass,
                               newPassword:this.state.newPass
                           })
             await WebApi.postApi_user('updatePassword1', body)
             .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from changePassword===>', json);
                        if(json.responseCode==200){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Updated successfully'});
                        }else{
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error}); 
                   });
           }else{
             this.setState({validConfirmPass:false, loading:true, loadingTitle:'Alert', loadingMessage:'Password did not match!'});
           }
       }else{
         this.setState({validNewPass:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter valid new password!'});
       }
     }else{
       this.setState({validOldPass:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter valid old password!'});
     }
  }

  accountDeletion=async()=>{
    if(this.state.oldPass!='' && this.state.validOldPass){
      this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Requesting...'});
      const body = JSON.stringify({
                      _id:this.state._id,
                      password:this.state.oldPass
                    })
      await WebApi.postApi_user('account_deletion_request', body)
        .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from accountDeletion===>', json);
                        if(json.responseCode==200){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Requested successfully'});
                        }else{
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         this.setState({loading:false});
                         console.log('error==>' , error)
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! Something Went Wrong!'});
                    });
    }else{
      this.setState({validOldPass:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter Your Password!'});
    }
  }


  changeEmail=async()=>{
    if(this.state.oldPass!='' && this.state.validOldPass){
       if(this.state.email!='' && this.state.validEmail){
           this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Updating...'});
           const body = JSON.stringify({
                          _id:this.state._id,
                          email:this.state.email,
                          password:this.state.oldPass
                       })
           await WebApi.postApi_user('changeEmail', body)
               .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from changeEmail===>', json);
                        if(json.responseCode==200){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Requested successfully'});
                        }else if(json.responseCode==401){
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Email belongs to other account, Try new one!'});                        
                        }
                        else{
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Something Went Wrong! Please contact Administration'});
                        }
                    })
                    .catch(error => {
                         this.setState({loading:false});
                         console.log('error==>' , error)
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });

       }else{
         this.setState({validEmail:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter a valid Email!'});
       }
    }else{
      this.setState({validOldPass:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid Password!'});
    }
  }



  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title={this.state.role} data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={Styles.container}>
            {this.state.role=='Change Email'  &&(
              <View style={[Styles.cardView, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow]}>
                <Text style={Styles.textHeading}>Email Address Details</Text>
                <Image style={{height:1, width:'90%', backgroundColor:Utils.colorGray, alignSelf:'center', margin:10}}/>
                <View style={Styles.borderView}>
                  <Text style={Styles.textLabel}>Your Password:</Text>
                  <TextInput 
                    style={this.state.validOldPass==false ? Styles.textInputError : Styles.textInput}
                    value={this.state.oldPass}
                    onChangeText={(oldPass)=>this.valididateOldPass(oldPass)}
                    secureTextEntry={this.state.visiOld}
                    />
                  <Icon name={this.state.visiOld ? "eye": "eye-slash"} style={Styles.iconForPassword} onPress={()=>this.setState({visiOld:!this.state.visiOld})}/>
                  <Text style={Styles.textLabel}>New Email ID:</Text>
                  <TextInput 
                    style={this.state.validEmail==false ? Styles.textInputError : Styles.textInput}
                    value={this.state.email}
                    onChangeText={(email)=>this.validateEmail(email)}
                    />

                  <TouchableHighlight underlayColor='none' onPress={()=>this.changeEmail()}>
                    <View style={Styles.sendButton}>
                      <Text style={{fontSize:Utils.subHeadSize}}>Change Email</Text>
                    </View>
                  </TouchableHighlight>  
                </View>
              </View>
            )}
            {this.state.role=='Change Password'  &&(
              <View style={[Styles.cardView, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow]}>
                <Text style={Styles.textHeading}>Password Detail</Text>
                <Image style={{height:1, width:'90%', backgroundColor:Utils.colorGray, alignSelf:'center', margin:10}}/>
                <View style={Styles.borderView}>
                  <Text style={Styles.textLabel}>Old Password:</Text>
                  <TextInput 
                    style={this.state.validOldPass==false ? Styles.textInputError : Styles.textInput}
                    value={this.state.oldPass}
                    onChangeText={(oldPass)=>this.valididateOldPass(oldPass)}
                    secureTextEntry={this.state.visiOld}
                    />
                  <Icon name={this.state.visiOld ? "eye": "eye-slash"} style={Styles.iconForPassword} onPress={()=>this.setState({visiOld:!this.state.visiOld})}/>
                </View>
                <View>
                  <Text style={Styles.textLabel}>New Password:</Text>
                  <TextInput
                    style={this.state.validNewPass==false ? Styles.textInputError : Styles.textInput}
                    value={this.state.newPass}
                    onChangeText={(pass)=>this.valididateNewPass(pass)}
                    secureTextEntry={this.state.visiNew}
                    />
                    <Icon name={this.state.visiNew ? "eye": "eye-slash"} style={Styles.iconForPassword} onPress={()=>this.setState({visiNew:!this.state.visiNew})}/>
                    {this.state.errorMsg!='' && (
                      <Text style={{color:Utils.colorRed, marginHorizontal:20}}>{this.state.errorMsg}</Text>
                    )}
                  </View>
                  <View>
                  <Text style={Styles.textLabel}>Confirm Password:</Text>
                  <TextInput 
                    style={this.state.validConfirmPass==false ? Styles.textInputError : Styles.textInput}
                    value={this.state.confirmPass}
                    onChangeText={(pass)=>this.valididateConfirmPass(pass)}
                    secureTextEntry={this.state.visiCon}
                    />
                  <Icon name={this.state.visiCon ? "eye": "eye-slash"} style={Styles.iconForPassword} onPress={()=>this.setState({visiCon:!this.state.visiCon})}/>
                  <TouchableHighlight underlayColor='none' onPress={()=>this.changePassword()}>  
                    <View style={Styles.sendButton}>
                      <Text style={{fontSize:utils.subHeadSize}}>Change Password</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            )}
            {this.state.role=='Account Deletion'  &&(
              <View style={[commonCss.cardView, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow]}>
                <Text style={Styles.textHeading}>Your Password:</Text>
                <Image style={{height:1, width:'90%', backgroundColor:Utils.colorGray, alignSelf:'center', marginTop:10}}/>
                <View style={[Styles.borderView, {marginVertical:20}]}>
                  <TextInput 
                    style={this.state.validOldPass==false ? Styles.textInputError : Styles.textInput}
                    value={this.state.oldPass}
                    secureTextEntry={true}
                    onChangeText={(oldPass)=>this.valididateOldPass(oldPass)}
                    />
                </View>
              </View>
            )}
            {this.state.role=='Account Deletion'  &&(
                <TouchableHighlight underlayColor='none' onPress={()=>this.accountDeletion()} style={{position:'absolute', bottom:10}}>
                  <View style={[Styles.sendButton]}>
                    <Text style={{fontSize:Utils.subHeadSize}}>Request Admin for Account Deletion</Text>
                  </View>
                </TouchableHighlight>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
      </View>
    );
  }
}
