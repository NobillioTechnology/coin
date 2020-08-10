

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, AsyncStorage, BackHandler, Modal
} from 'react-native';
import Styles from './style'
import Header from '../../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../Footer';
import Utils from '../../Utils';
import CommonCss from '../../Utils/commonCss';
import CustomDialog from '../../CustomDialog';
import WebApi from '../../../Common/WebApi';
import ProgressBar from '../../ProgressBar';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import DropDown from '../../DropDown';


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

    const docList=[
                {label:'Any Government ID', value:'Any Government ID'},
                {label:'Passport', value:'Passport'},
                {label:'Electoral Photo Identity Card', value:'Electoral Photo Identity Card'},
          ]

export default class Home extends Component {


  constructor(props) {
    super(props);
      this.state={
        title:'Verification',
        _id:'',
        imageSelector:false, imageCount:0, countrySelector:false, countryData:Utils.country,
        loading:false,
        loadingTitle:'Please Wait', loadingMessage:'loading...',
        fName:'', lName:'', dob:'', country:'', docType:'Select Doc. Type', docId:'', file1Name:'Upload File(Scan copy of front side)', file1:'',
        file2Name:'Upload File(Scan copy of back side)', file2:'', file3Name:'Please upload your Photo holding your ID', file3:'', city:'', address:'', pinCode:'',
        validFName:true, validLName:true, validDob:true, validCountry:true, validDocType:true, validDocId:true,
        validFile1:true, validFile2:true, validFile3:true, validCity:true, validAddress:true, validPinCode:true,
        phone:'', validPhone:true, countryCode:'Select Country Code', validCountryCode:true, otpScreen:false,
        otp1:'', otp2:'', otp3:'', otp4:'',
        emailVerified:false,
        phoneVerified:false,
        dropDown:false, dropItems:[], currentDrop:''
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
      this.closeDrop=this.closeDrop.bind(this);
      this.chooseDropItem=this.chooseDropItem.bind(this);
    }

    componentDidMount=async()=>{
      BackHandler.addEventListener('hardwareBackPress', this.handleBack);
      const _id = await AsyncStorage.getItem(Utils._id);
      this.setState({_id:_id}); 
      await this.getProfile(_id);
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

   stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }

    getProfile=async(_id)=>{
        this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'})
         await WebApi.getProfile(_id)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     // console.log('Response from getProfile===>', json);
                        if(json.responseCode==200){
                            this.setState({
                              emailVerified:json.result.verified_email,
                              phoneVerified:json.result.verified_phone,
                              identityVerified:json.result.verified_upload_docs,
                            })
                        }else{
                           this.setState({
                             loading:true,
                             loadingTitle:'Alert',
                             loadingMessage:'Oops! '+json.responseMessage
                           })
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                           this.setState({
                             loading:true,
                             loadingTitle:'Alert',
                             loadingMessage:'Oops! Something Went Wrong!'
                           })
                    });
   }

   verification=async()=>{
     if(this.state.fName!=''){
       if(this.state.lName!=''){
         if(this.state.dob!=''){
           if(this.state.country!=''){
             if(this.state.docType!=''){
               if(this.state.docId!=''){
                 if(this.state.file1!=''){
                   if(this.state.file2!=''){
                     if(this.state.file3!=''){
                        if(this.state.city!=''){
                          if(this.state.address!=''){
                              if(this.state.pinCode!='' && this.state.pinCode.length>5){
                                  this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'uploading...'});
                                  const body = JSON.stringify({
                                                 _id:this.state._id,
                                                  first_name:this.state.fName,
                                                  last_name:this.state.lName,
                                                  date_of_birth:this.state.dob,
                                                  country:this.state.country,
                                                  doc_name:this.state.docType,
                                                  doc_id:this.state.docId,
                                                  frontView:this.state.file1,
                                                  backView:this.state.file2,
                                                  bothView:this.state.file3,
                                                  city:this.state.city,
                                                  address:this.state.address,
                                                  post_code:this.state.pinCode,
                                            })
                                  await WebApi.postApi_user('uploadKyc', body)
                                     .then(response => response.json())
                                        .then(json => {
                                           this.setState({loading:false});
                                             console.log('Response from verification===>', json);
                                                if(json.responseCode==200){
                                                 this.setState({
                                                   loading:true,
                                                   loadingTitle:'Alert',
                                                   loadingMessage:'Success!'
                                                 })
                                                }else{
                                                 this.setState({
                                                   loading:true,
                                                   loadingTitle:'Alert',
                                                   loadingMessage:'Oops! '+json.responseMessage
                                                 })
                                                }
                                            })
                                            .catch(error => {
                                                this.setState({loading:false});
                                                 console.log('error==>' , error)
                                                 this.setState({
                                                   loading:true,
                                                   loadingTitle:'Alert',
                                                   loadingMessage:'Something Went Wrong! Please contact to Admin'
                                                 })
                                            });

                              }else{
                                this.setState({
                                  validPinCode:false,
                                  loading:true, 
                                  loadingTitle:'Alert',
                                  loadingMessage:'Enter valid Pin Code!'
                                });
                              }
                          }else{
                             this.setState({
                                validAddress:false,
                                loading:true, 
                                loadingTitle:'Alert',
                                loadingMessage:'Enter a valid Address!'
                              });
                          }
                        }else{
                            this.setState({
                              validCity:false,
                              loading:true, 
                              loadingTitle:'Alert',
                              loadingMessage:'Enter a valid City!'
                            });
                        }
                     }else{
                        this.setState({
                          validFile3:false,
                          loading:true, 
                          loadingTitle:'Alert', 
                          loadingMessage:'Select your photo holding your ID!'
                        });
                     }
                   }else{
                      this.setState({
                        validFile2:false,
                        loading:true, 
                        loadingTitle:'Alert', 
                        loadingMessage:'Select scan copy of Back side!'
                      });
                   }
                 }else{
                    this.setState({
                      validFile1:false,
                      loading:true, 
                      loadingTitle:'Alert', 
                      loadingMessage:'Select scan copy of Front side!'
                    });
                 }
               }else{
                  this.setState({
                    validDocId:false,
                    loading:true, 
                    loadingTitle:'Alert', 
                    loadingMessage:'Enter a Valid Document Id!'
                  });
               }
             }else{
                this.setState({
                  validDocType:false,
                  loading:true, 
                  loadingTitle:'Alert', 
                  loadingMessage:'Select Doc. Type!'
                });
             }
           }else{
              this.setState({
                validCountry:false,
                loading:true, 
                loadingTitle:'Alert', 
                loadingMessage:'Select A Country!'
              });
           }
         }else{
           this.setState({
               validDob:false,
               loading:true, 
               loadingTitle:'Alert', 
               loadingMessage:'Select Your Date of birth!'
            });
         }
       }else{
         this.setState({
           validLName:false,
           loading:true, 
           loadingTitle:'Alert', 
           loadingMessage:'Enter Valid Last Name!'
         });
        }
     }else{
        this.setState({
          validFName:false, 
          loading:true, 
          loadingTitle:'Alert', 
          loadingMessage:'Enter Valid First Name!'
        });
      }
 }

 sendOtp=async()=>{
   if(this.state.countryCode!=''){
     if(this.state.phone!='' && this.state.validPhone){
       this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Sending...', otp1:'', otp2:'', otp3:'', otp4:''});
         await WebApi.sendOtpPhone(this.state.countryCode, this.state.phone)
            .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from sendOTP===>', json);
                        if(json.responseCode==200){
                         this.setState({
                             otpScreen:true,
                         })
                        }else{
                         this.setState({
                           loading:true,
                           loadingTitle:'Alert',
                           loadingMessage:'Oops! '+json.responseMessage
                         })
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({
                           loading:true,
                           loadingTitle:'Alert',
                           loadingMessage:'Oops! '+error
                         })
                    });

     }else
       this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter A Valid Phone Number !', validPhone:false});
   }else
     this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Select Country Code!', validCountryCode:false});
 }

 verifyOtp=async()=>{
   if(this.state.otp1!='' && this.state.otp2!='', this.state.otp3!='', this.state.otp4!=''){
       const otp = this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4;
       this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Sending...'});
         await WebApi.verifyOtp(this.state.countryCode, this.state.phone, otp)
            .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from verifyOtp===>', json);
                        if(json.responseCode==200){
                         this.setState({
                             otpScreen:false,
                             loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage
                         });
                         this.getProfile(this.state._id);
                        }else{
                         this.setState({
                           loading:true,
                           loadingTitle:'Alert',
                           loadingMessage:'Oops! '+json.responseMessage
                         })
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({
                           loading:true,
                           loadingTitle:'Alert',
                           loadingMessage:'Oops! '+error
                         })
                    });

   }else
     this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid Otp!'})
 }

 validatePhone=async(phone)=>{
   await this.setState({phone:phone});
   if(phone.length==10){
      this.setState({validPhone:true});
   }else
     this.setState({validPhone:false});
 }

  selectImage(count){
    if(!this.state.imageSelector)
      this.setState({imageSelector:true, imageCount:count});
  }

  resetImage(file){
    if(file==1){
        this.setState({
          imageSelector:false,
            file1: '',
            file1Name:'Upload File(Scan copy of front side)',
            validFile1:false
        });
    }else if(file==2){
      this.setState({
          imageSelector:false,
            file2: '',
            file2Name:'Upload File(Scan copy of back side)',
            validFile2:false
        });
    }else if(file==3){
      this.setState({
          imageSelector:false,
            file3:'',
            file3Name:'Please upload your Photo holding your ID',
            validFile3:false
        });
    }
  }

  launchCamera = (imageCount) => {
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
        
          if(imageCount==1){
              this.setState({
                file1: 'data:image/jpeg;base64,'+response.data,
                file1Name:response.fileName,
                validFile1:true
              });
          }else if(imageCount==2){
              this.setState({
                file2: 'data:image/jpeg;base64,'+response.data,
                file2Name:response.fileName,
                validFile2:true
              });
          }else if(imageCount==3){
              this.setState({
                file3: 'data:image/jpeg;base64,'+response.data,
                file3Name:response.fileName,
                validFile3:true
              });
          }
      }
    });

  }

  launchImageLibrary = (imageCount) => {
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
          if(imageCount==1){
              this.setState({
                file1: 'data:image/png;base64,'+response.data,
                file1Name:response.fileName,
                validFile1:true
              });
          }else if(imageCount==2){
              this.setState({
                file2: 'data:image/png;base64,'+response.data,
                file2Name:response.fileName,
                validFile2:true
              });
          }else if(imageCount==3){
              this.setState({
                file3: 'data:image/png;base64,'+response.data,
                file3Name:response.fileName,
                validFile3:true
              });
          }
        }
    });

  }

  selectCountry=async(country)=>{
    this.setState({country:country, validCountry:false, countrySelector:true});
     var data = Utils.country;
     var out = [];
    for (var i = 0; i<data.length; i++) {

    if(data[i].label.substring(0, country.length)==country)
        out.push(data[i]);
      }
     console.log(out)
     this.setState({countryData:out});
  }

  openDrop(dropType){
    if(dropType=='code')
      this.setState({dropDown:true, dropItems:Utils.countryCode, currentDrop:'code'});
    else if(dropType=='doc')
      this.setState({dropDown:true, dropItems:docList, currentDrop:'doc'});
  }

  chooseDropItem(item){
        if(this.state.currentDrop=='doc'){
           this.setState({dropDown:false, docType:item.value});
        }else if(this.state.currentDrop=='code'){
           this.setState({dropDown:false, countryCode:item.value});
        }
    }

  closeDrop(){
      this.setState({dropDown:false});
  }

  selectedCountry(val){
    this.setState({country:val, countrySelector:false, validCountry:true});
  }

  render() {
    return (
      <View style={Styles.body}>
       <Header title={this.state.title} menuCheck="false" data={this.props} style={Styles.header}/>
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
          items={this.state.dropItems}
        />
         <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={Styles.container}>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>Email Verified:</Text>
                {this.state.emailVerified==true ? (
                  <Text style={[Styles.textValue, {color:Utils.colorGreen, fontWeight:'bold'}]}>Yes</Text>
                ):(
                  <Text style={[Styles.textValue, {color:Utils.colorRed, fontWeight:'bold'}]}>No</Text>
                )}
              </View>
              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>Phone number Verified:</Text>
                {this.state.phoneVerified==true ? (
                  <Text style={[Styles.textValue, {color:Utils.colorGreen, fontWeight:'bold'}]}>Yes</Text>
                ):(
                  <Text style={[Styles.textValue, {color:Utils.colorRed, fontWeight:'bold'}]}>No</Text>
                )}
              </View>

              {this.state.phoneVerified==false && ( 
                <View>
                  <Text style={Styles.textLabel}>Verify your phone number to active backup method, increase the reputation of your account and get access to more advertisements.Choose your country code and enter your phone number</Text>
                  <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                    <Text style={Styles.textLabel}>Country Code:</Text>
                    <View style={this.state.validCountryCode==false ? Styles.pickerViewError : Styles.pickerView}>
                      <TouchableHighlight onPress={()=>this.openDrop('code')} underlayColor='none'>
                        <View style={{flexDirection:'row'}}>
                          <Text style={this.state.countryCode=='Select Country Code' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.countryCode}</Text>
                          <Icon name='sort-down' style={Styles.dropIcon}/>
                        </View>
                      </TouchableHighlight>
                      </View>    
                    </View>
                  <View style={{marginTop:20, flexDirection:'row', alignItems:'center'}}>
                    <Text style={Styles.textLabel}>Phone number:</Text>
                    <TextInput 
                      style={this.state.validPhone==false ? Styles.textValueInputError : Styles.textValueInput}
                      value={this.state.phone}
                      onChangeText={(phone)=>this.validatePhone(phone)}
                      keyboardType={'number-pad'}
                    />
                  </View>
                  <TouchableHighlight underlayColor='none' onPress={()=>this.sendOtp()}>
                    <View style={Styles.submitButton}>
                      <Text style={{fontSize:Utils.headSize}}>Send OTP</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}

              <View style={{marginVertical:10, flexDirection:'row'}}>
                <Text style={Styles.textLabel}>Identity Verified:</Text>
                {this.state.identityVerified==true ? (
                  <Text style={[Styles.textValue, {color:Utils.colorGreen, fontWeight:'bold'}]}>Yes</Text>
                ):(
                  <Text style={[Styles.textValue, {color:Utils.colorRed, fontWeight:'bold'}]}>No</Text>
                )}
              </View>
              <View style={{marginTop:20, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>First Name:</Text>
                <TextInput 
                  style={this.state.validFName==false ? Styles.textValueInputError : Styles.textValueInput}
                  value={this.state.fName}
                  onChangeText={async(fName)=>{ await this.setState({fName:fName, validFName:true})}}
                />
              </View>
              <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>Last Name:</Text>
                <TextInput
                  style={this.state.validLName==false ? Styles.textValueInputError : Styles.textValueInput}
                  value={this.state.lName}
                  onChangeText={async(lName)=>{ await this.setState({lName:lName, validLName:true})}}
                />
              </View>
              <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>Date of Birth:</Text>
                <View style={this.state.validDob==false ? Styles.pickerViewError : Styles.pickerView}>
                  <DatePicker                  
                    date={this.state.dob}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36,
                        borderColor:'transparent'
                      }
                    }}
                    onDateChange={(date) => {this.setState({dob: date})}}
                  />
                </View>
              </View>
              <Text style={[Styles.textLabel, {marginTop:15}]}>Select Country:</Text>
              <View style={this.state.validCountry==false ? Styles.countryViewError : Styles.countryView}>
               <TextInput style={{paddingHorizontal:15}} 
                          placeholder='Select Country' 
                          onChangeText={(country)=>this.selectCountry(country)}
                          value={this.state.country}
                          onFocus={() =>this.setState({countrySelector:true})}
               />
               </View>
              {this.state.countrySelector==true && (
                 <View>
                     <View style={{width:'100%', backgroundColor:Utils.colorWhite, marginVertical:15}}>
                      {this.state.countryData.map((item, index)=>{
                        return (
                          <View style={{width:'100%'}}>
                              <Text style={{color:Utils.colorBlack, paddingHorizontal:15, fontSize:Utils.subHeadSize}} onPress={()=>this.selectedCountry(item.value)}>{item.label}</Text>
                              <Image style={{width:'100%', height:1, backgroundColor:Utils.colorGray, marginVertical:10}} />
                          </View>
                        )
                      })}
                  </View>
                 </View>
                )}
              <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>Identity Document:</Text>
                <View style={this.state.validDocType==false ? Styles.pickerViewError : Styles.pickerView}>
                <TouchableHighlight onPress={()=>this.openDrop('doc')} underlayColor='none'>
                  <View style={{flexDirection:'row'}}>
                    <Text style={this.state.docType=='Select Doc. Type' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.docType}</Text>
                    <Icon name='sort-down' style={Styles.dropIcon}/>
                  </View>
                </TouchableHighlight>
                </View>    
              </View>
              <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>Document ID:</Text>
                <TextInput 
                  style={this.state.validDocId==false ? Styles.textValueInputError : Styles.textValueInput}
                  value={this.state.docId}
                  onChangeText={(docId)=>this.setState({docId:docId, validDocId:true})}
                />
              </View>
              <Text style={[Styles.textLabel, {marginTop:15}]}>* Only Jpeg, .png and jpg are acceptable:</Text>
              
              <TouchableHighlight underlayColor='none' onPress={()=>this.selectImage(1)}>
                <View style={this.state.validFile1==false ? Styles.fileViewError : Styles.fileView}>
                  <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorGray}}>{this.state.file1Name}</Text>
                  {this.state.file1!='' ? (
                    <Icon name='close' style={Styles.rightIcon} onPress={()=>this.resetImage(1)}/>
                  ):(
                    <Icon name='paperclip' style={Styles.rightIcon} />
                  )
                }
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none' onPress={()=>this.selectImage(2)}>
                <View style={this.state.validFile2==false ? Styles.fileViewError : Styles.fileView}>
                  <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorGray}}>{this.state.file2Name}</Text>
                  {this.state.file2!='' ? (
                    <Icon name='close' style={Styles.rightIcon} onPress={()=>this.resetImage(2)}/>
                  ):(
                    <Icon name='paperclip' style={Styles.rightIcon} />
                  )}
                </View>
              </TouchableHighlight>
 
              <TouchableHighlight underlayColor='none' onPress={()=>this.selectImage(3)}>
                <View style={this.state.validFile3==false ? Styles.fileViewError : Styles.fileView}>
                  <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorGray}}>{this.state.file3Name}</Text>
                  {this.state.file3!='' ? (
                    <Icon name='close' style={Styles.rightIcon} onPress={()=>this.resetImage(3)}/>
                  ):(
                    <Icon name='paperclip' style={Styles.rightIcon} />
                  )}
                </View>
              </TouchableHighlight>

              <View style={{marginTop:15, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>City:</Text>
                <TextInput 
                  style={this.state.validCity==false ? Styles.textValueInputError : Styles.textValueInput}
                  value={this.state.city}
                  onChangeText={(city)=>this.setState({city:city, validCity:true})}
                />
              </View>
              <Text style={[Styles.textLabel, {marginTop:15, marginBottom:10}]}>Address:</Text>
              <TextInput 
                style={this.state.validAddress==false ? Styles.textValueInputError : Styles.textValueInput}
                value={this.state.address}
                onChangeText={(address)=>this.setState({address:address, validAddress:true})}
              />
              <View style={{marginTop:15, flexDirection:'row', alignItems:'center'}}>
                <Text style={Styles.textLabel}>Post/Zip code:</Text>
                <TextInput 
                  style={this.state.validPinCode==false ? Styles.textValueInputError : Styles.textValueInput}
                  value={this.state.pinCode}
                  onChangeText={(pinCode)=>{
                    this.setState({pinCode:pinCode});
                    if(pinCode.length>5){
                      this.setState({validPinCode:true});
                    }else
                      this.setState({validPinCode:false});
                  }}
                />
              </View>
              <TouchableHighlight underlayColor='none' onPress={()=>this.verification()}>
                <View style={Styles.submitButton}>
                  <Text style={{fontSize:Utils.headSize}}>Submit</Text>
                </View>
              </TouchableHighlight>
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
        {this.state.otpScreen==true && (
         <View>
           <Modal style={CommonCss.dialogue}
            isVisible={this.state.otpScreen}
            transparent={true}
            animationType={"fade"}
            onRequestClose={()=>this.setState({otpScreen:false})}
            >
             <View style={CommonCss.dialogue}>
              <View style={Styles.dialogueContainer}>
                  <Icon name="close" style={Styles.close} onPress={()=>this.setState({otpScreen:!this.state.otpScreen})}/>
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
                    <TouchableHighlight underlayColor='none' onPress={()=>this.sendOtp()} style={Styles.phoneVeriButton}>
                      <Text>Resend</Text>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>
           </Modal>
         </View>
        )}
      </View>
    );
  }
}
