import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, TouchableHighlight, CheckBox, Modal, Platform, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../../Utils';
import WebApi from '../../../Common/WebApi';
import ProgressBar from '../../ProgressBar';
import Adapter from './Adapter';
import ImagePicker from 'react-native-image-picker';
import CheckBoxIos from 'react-native-check-box';


export default class Home extends Component {


  constructor(props) {
    super(props);
      this.state={
        title:'User Details',
        _id:'',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'Loading...',
        userProfile:require('../../../assets/img/userMale.jpeg'),
        email:'',
        phone:'',
        kycStatus:'',
        lastActive:'',
        userName:'',
        verifiedPhone:false,
        verifiedEmail:false,
        feedbackScore:'',
        confirmTrade:'',
        firstPurchase:'',
        trusted:false,
        me:false,
        tradeData:[],
        imageSelector:false,
        fileData:'',
        fileUri: '',
        selectImage:true,
        color:require('../../../assets/img/bg.jpg'),
        img:[require('../../../assets/img/bg.jpg'),
        require('../../../assets/img/bg2.jpg'),
        require('../../../assets/img/bg3.jpg'),
        require('../../../assets/img/bg4.jpeg'),
        require('../../../assets/img/bg5.jpg'),
        require('../../../assets/img/bg6.jpeg')],     
    }
    this.stopLoading=this.stopLoading.bind(this);
    this.buyButton=this.buyButton.bind(this);
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
        const _id = await this.props.navigation.getParam('_id', '');
          const userId = await AsyncStorage.getItem(Utils._id);
          const userName = await AsyncStorage.getItem(Utils.userName);
          if(_id==userId)
            await this.setState({me:true});

          await this.setState({_id:_id, userId:userId, userName:userName});
          console.log(_id);
          this.getProfile();
  }

  stopLoading(){
    if(this.state.loading){
      this.setState({loading:false});
    }
  }

  getProfile=async()=>{
      this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
      await WebApi.getProfile(this.state._id)
           .then(response => response.json())
                .then(json => {
                    //  console.log('Response from getProfile===>', json);
                      this.setState({loading:false});
                        if(json.responseCode==200){
                          this.feedbackScore();
                          this.getOtherTrades();
                          const lastActive = new Date(json.result.lastActive).toUTCString();
                            // console.log('BlockedBy===>',json.result.blocked_by);
                          const blockedBy = json.result.blocked_by;
                            blockedBy.map((item)=>{
                              if(item.name==this.state.userName)
                                this.setState({blocked:true});                           
                            })

                          const trustedByMe = json.result.trusted_by;
                            trustedByMe.map((item)=>{
                              if(item.name==this.state.userName)
                                this.setState({trusted:true});                           
                            })
                          this.setState({
                            email:json.result.email,
                            phone:json.result.phone_number,
                            kycStatus:json.result.kyc_status,
                            lastActive:lastActive,
                            userName:json.result.user_name,
                            verifiedPhone:json.result.verified_phone,
                            verifiedEmail:json.result.verified_email,
                            feedbackScore:json.result.feedback_score,
                            userProfile:{uri:(json.result.profilePic)},
                            confirmTrade:json.result.conf_trades,
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

  feedbackScore=async()=>{
      await WebApi.postApi_feedback('feedbackScore', JSON.stringify({userId:this.state._id}))
      .then(async response => await response.json())
      .then(async json => {
          //  console.log('Response from filter trade===>', json.result);
              if(json.responseCode==200){
                  if(json.responseMessage=='Data found successfully'){
                    this.setState({feedbackScore:'(+'+json.feedbackScore.positive+'/ -'+json.feedbackScore.negative+')'})
                  // console.log('feedback=====>', item)
                }
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

  getOtherTrades=async()=>{
    await WebApi.postApi_trade('userDetails', JSON.stringify({userId:this.state._id}))
    .then(response => response.json())
    .then(json => {
        //  console.log('Response from get Other Trade===>', json);
          this.setState({loading:false});   
         if(json.responseCode==200){
              var tradeData = this.state.tradeData;
              json.result.map((item, index)=>{
                if(index>0)
                    tradeData.push(item);
                  this.setState({tradeData:tradeData});
                  // console.log(this.state.tradeData);
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

  trustUser=async()=>{
    this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
    var status = 'trust';
    if(this.state.trusted)
      status='untrust';
    const body = JSON.stringify({
                  name:this.state.userName,
                  status:status,
                  userId:this.state.userId
                  })
     await WebApi.postApi_trade('trust_others', body)
           .then(response => response.json())
                .then(json => {
                    this.setState({loading:false});
                    //  console.log('Response from trust===>', json);
                        if(json.responseCode==200){
                          this.setState({
                            trusted:!this.state.trusted
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

  blockUser=async()=>{
    this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
    var status = 'block';
      if(this.state.blocked)
        status='unblock';
    const body = JSON.stringify({
                  name:this.state.userName,
                  status:status,
                  userId:this.state.userId
                  })
     await WebApi.postApi_trade('blocked_others', body)
           .then(response => response.json())
                .then(json => {
                    this.setState({loading:false});
                    //  console.log('Response from block===>', json);
                        if(json.responseCode==200){
                          this.setState({
                             blocked:!this.state.blocked
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

  buyButton(id){
    this.props.navigation.navigate('BuyTrade', { id:id, role:'Buy'});
  }
  
  resetImage(){
    this.setState({
      imageSelector:false,
        fileData: '',
        fileUri: '',
        fileName:'Upload File',
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

    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
          // this.handleBackButtonClick();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
          // this.handleBackButtonClick();
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
          // this.handleBackButtonClick();
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response.fileName));
        this.setState({
          filePath: response,
          fileData: 'data:image/jpeg;base64,' + response.data,
          userProfile:{uri:response.uri},
          fileName:response.fileName,
          selectImage:true
        });
        if(this.state.imageSelector==true)
        this.setState({imageSelector:false});
        this.uploadImage();  
        console.log('fileData======================>', this.state.fileData.substring(this.state.fileData.length-50, this.state.fileData.length));
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
          // this.handleBackButtonClick();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
          // this.handleBackButtonClick();
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
          // this.handleBackButtonClick();
      } else {
        const source = { uri: response.uri };
        this.setState({
          filePath: response,
          fileData: 'data:image/jpeg;base64,'+response.data,
          userProfile:{uri:response.uri},
          selectImage:true,
        });
        this.setState({imageSelector:false});
        this.uploadImage();
        console.log('fileData======================>', this.state.fileData.substring(0, 50));
      }
    });
  }

  uploadImage=async()=>{
        this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
         await WebApi.uploadProfile(this.state.fileData)
            .then(response => response.json())
              .then(json => {
                   this.setState({loading:false});
                     console.log('Response from uploadProfile===>', json);
                        if(json.responseCode==200){
                            this.setState({selectImage:false, loading:true, loadingTitle:'Success', loadingMessage:'Updated successfully'});
                            this.resetImage();
                        }else{
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error from uploadProfile==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });

  }


  render() {
   
    return (
      <View style={Styles.body}>
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title={this.state.title} menuCheck="false" data={this.props} style={Styles.header}/>
       <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={Styles.container}>
            {this.state.trusted && (
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name='star' style={Styles.star}/>
                  <Text style={Styles.trustingLine}>Already Trusting You</Text>
              </View>
              )}
            <View style={{flexDirection:'row', marginVertical:10}}>
              <TouchableHighlight style={{borderRadius:45,flex:0.25}} onPress={()=>{if(this.state.me)this.setState({imageSelector:true})}} underlayColor='none'>
                <Image source={this.state.userProfile} style={Styles.profilePicture} />
              </TouchableHighlight>
              <Text style={Styles.userName}>{this.state.userName}</Text>
              <View style={{flex:0.3}}>
                {!this.state.me && (
                  <View>
                    <TouchableHighlight style={Styles.trustButton}
                      onPress={()=>this.trustUser()}
                      >
                      <Text>{this.state.trusted ? 'Untrust' : 'Trust'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={Styles.blockButton}
                      onPress={()=>this.blockUser()}
                      >
                      <Text>{this.state.blocked ? 'Unblock' : 'Block'}</Text>
                    </TouchableHighlight>
                  </View>
                )}
              </View>
            </View>
              <View style={{flexDirection:'row', marginVertical:10}}>
                <Text style={Styles.textLabel}>No. of confirmed trade:</Text>
                <Text style={Styles.textValue}>{this.state.confirmTrade}</Text>
              </View>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>Feedback score:</Text>
                <Text style={Styles.textValue} onPress={()=>this.props.navigation.navigate('Feedback', {'_id':this.state._id})}>{this.state.feedbackScore} <Text style={{color:Utils.colorBlue}}>See Feedback</Text></Text>
              </View>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>First purchase:</Text>
                <Text style={Styles.textValue}>{this.state.firstPurchase}</Text>
              </View>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>Account created:</Text>
                <Text style={Styles.textValue}>2020-2-13 12:20:21</Text>
              </View>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>Last seen:</Text>
                <Text style={Styles.textValue}>{this.state.lastActive}</Text>
              </View>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>Language:</Text>
                <Text style={Styles.textValue}>English</Text>
              </View>
              <View style={{marginVertical:10, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>Email:</Text>
                <View style={{flexDirection:'row', flex:0.5, alignItems:'center'}}>
                 {Platform.OS=='ios' ?
                  (
                  <CheckBoxIos isChecked = {this.state.verifiedEmail} disabled={true}/>
                  ):(<CheckBox value={this.state.verifiedEmail} disabled={true}/>
                  )}
                  {this.state.me && (
                    <Text style={[Styles.textLabelCheck, {width:'90%'}]}>{this.state.email}</Text>
                  )}
                  </View>
              </View>
              <View style={{marginVertical:10, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>Phone number:</Text>
                <View style={{flexDirection:'row', flex:0.5, alignItems:'center'}}>
                 {Platform.OS=='ios' ?
                  (
                  <CheckBoxIos isChecked = {this.state.verifiedPhone} disabled={true}/>
                  ):(
                  <CheckBox value={this.state.verifiedPhone} disabled={true}/>
                  )}
                  {this.state.me && (
                    <Text style={Styles.textLabelCheck}>{this.state.phone}</Text>
                  )}
                  </View>
              </View>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>KYC status:</Text>
                <Text style={Styles.textValue}>{this.state.kycStatus}</Text>
              </View>

              <View style={{marginVertical:15}}>
                  <Text style={{fontSize:Utils.headSize, fontWeight:'bold', alignSelf:'center', marginVertical:10}}>Other Advertisement By {this.state.userName}</Text>
                  <View>
                      {this.state.tradeData.map((item)=>{
                        return (
                          <Adapter
                            username={item.user_name}
                            tags={item.add_tags}
                            price={parseFloat(item.price_equation).toFixed(2) +' '+ item.currency_type}
                            limit = {item.min_transaction_limit+' - '+item.max_transaction_limit+' '+item.currency_type}
                            paymentMethod= {item.payment_method}
                            id={item._id}
                            buyButton={this.buyButton}
                          />
                        )
                      })}
                  </View>
              </View>
          </View>
        </ScrollView>
        {this.state.imageSelector==true && (
         <View>
           <Modal style={Styles.dialogue}
            isVisible={this.state.imageSelector}
            transparent={true}
            animationType={"fade"}
            onRequestClose={()=>this.setState({imageSelector:false})}
            >
             <View style={Styles.dialogue}>
              <View style={Styles.dialogueContainer}>
                  <Text style={Styles.dialogCamera} onPress={this.launchCamera}>Camera</Text>
                  <Image style={{width:280, height:1, backgroundColor:Utils.colorGray}} />
                  <Text style={Styles.dialogCamera} onPress={this.launchImageLibrary}>Gallery</Text>
                  <Image style={{width:280, height:1, backgroundColor:Utils.colorGray}} />
                  <Text style={Styles.dialogueCancel}
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
