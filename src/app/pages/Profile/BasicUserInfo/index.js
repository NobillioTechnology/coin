import React, { Component } from 'react';
import {
  Text, View, TextInput, ScrollView, Dimensions, TouchableHighlight, CheckBox, AsyncStorage, BackHandler
} from 'react-native';
import Styles from './style'
import Header from '../../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../Footer';
import Utils from '../../Utils';
import CustomDialog from '../../CustomDialog';
import utils from '../../Utils';
import RNPickerSelect from 'react-native-picker-select';
import WebApi from '../../../Common/WebApi';
import ProgressBar from '../../ProgressBar';
import DropDown from '../../DropDown';

const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        _id:'',
        timeZone:'Select TimeZone',
        showMEReal:false,
        disableSensitive:false,
        enableWebNoti:false,
        sellingVacation:false,
        buyingVacation:false,
        smsNotiForTrade:false,
        smsNotiForPayment:false,
        smsNotiForEscrow:false,
        intro:'',

        loading:true,
        loadingTitle:'Please Wait',
        loadingMessage:'loading...',
        dropDown:false,
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
      this.props.navigation.goBack(null);
      return true;
    }

   stopLoading(){
     this.setState({loading:false});
   }

   chooseDropItem(item){
         this.setState({dropDown:false, timeZone:item.value});
    }

  closeDrop(){
      this.setState({dropDown:false});
  }

   basicUserInfo=async()=>{
      this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Updating...'});
       const body = JSON.stringify({
                        _id:this.state._id,
                        show_real_name:this.state.showMEReal,
                        disable_info_from_Email:this.state.disableSensitive,
                        enable_web_notification:this.state.enableWebNoti,
                        sell_vacation:this.state.sellingVacation,
                        buy_vacation:this.state.buyingVacation,
                        sms_notification_trade:this.state.smsNotiForTrade,
                        sms_notification_payment:this.state.smsNotiForPayment,
                        sms_notification_escrow:this.state.smsNotiForEscrow,
                        introduction:this.state.intro,
                        time_zone:this.state.timeZone,
                    })
     await WebApi.postApi_user('updateUserInfo', body)
             .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from basicUserInfo===>', json);
                        if(json.responseCode==200){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Updated successfully!'});
                        }else{
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loadiing:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
   }

   getProfile=async()=>{
     const body = JSON.stringify({
                     _id:this.state._id,
                   })
     await WebApi.postApi_user('userProfile', body)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from getProfile===>', json);
                        if(json.responseCode==200){
                            // alert(json.result.time_zone);
                            this.setState({timeZone:json.result.time_zone,
                                           showMEReal:json.result.show_real_name,
                                           disableSensitive:json.result.disable_info_from_Email,
                                           enableWebNoti:json.result.enable_web_notification,
                                           sellingVacation:json.result.sell_vacation,
                                           buyingVacation:json.result.buy_vacation,
                                           smsNotiForTrade:json.result.sms_notification_trade,
                                           smsNotiForPayment:json.result.sms_notification_payment,
                                           smsNotiForEscrow:json.result.sms_notification_escrow,
                                           intro:json.result.introduction,
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

  render() {

    return (
      <View style={Styles.body}>
       <Header title="Basic User Information" data={this.props} style={Styles.header}/>
       <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <DropDown
          closeDrop={this.closeDrop}
          dropdown={this.state.dropDown}
          items={Utils.timeZone}
          choose={this.chooseDropItem}
        />
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={[Styles.container,Styles.shadow]}>
              <Text style={Styles.text}>Time Zone</Text>
                <TouchableHighlight style={Styles.pickerView} onPress={()=>this.setState({dropDown:true})} underlayColor='none'>
                  <View style={{flexDirection:'row'}}>
                    <Text style={this.state.timeZone=='Select TimeZone' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.timeZone}</Text>
                    <Icon name='sort-down' style={Styles.dropIcon}/>
                  </View>
                </TouchableHighlight>

            <View style={Styles.radioView}>
                <Text style={Styles.radioText}>Security Options:</Text>
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.showMEReal} onValueChange={(showMEReal)=>this.setState({showMEReal})}/>
                <Text style={{flex:0.9}}>Show me as real name verified to other</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.disableSensitive} onValueChange={(disableSensitive)=>this.setState({disableSensitive})}/>
                <Text style={{flex:0.9}}>Disable sensitive information from email notification</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.enableWebNoti} onValueChange={(enableWebNoti)=>this.setState({enableWebNoti})}/>
                <Text style={{flex:0.9}}>Enable web notification</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.sellingVacation} onValueChange={(sellingVacation)=>this.setState({sellingVacation})}/>
                <Text style={{flex:0.9}}>Selling Vacation</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.buyingVacation} onValueChange={(buyingVacation)=>this.setState({buyingVacation})}/>
                <Text style={{flex:0.9}}>Buying Vacation</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.smsNotiForTrade} onValueChange={(smsNotiForTrade)=>this.setState({smsNotiForTrade})}/>
                <Text style={{flex:0.9}}>Send SMS notification for new trade contacts</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.smsNotiForPayment} onValueChange={(smsNotiForPayment)=>this.setState({smsNotiForPayment})}/>
                <Text style={{flex:0.9}}>Send SMS notification for new Online Payment</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
              <View style={Styles.radioView}>
                <CheckBox value={this.state.smsNotiForEscrow} onValueChange={(smsNotiForEscrow)=>this.setState({smsNotiForEscrow})}/>
                <Text style={{flex:0.9}}>Send SMS notification for new Online escrow released</Text>
                <Icon name='info' style={Styles.infoIcon} />
              </View>
            <View style={{marginTop:20, marginLeft:20}}>
                <Text style={Styles.radioText}>Introduction:</Text>
                <TextInput style={Styles.inputTextArea} 
                  value={this.state.intro}
                  onChangeText={(intro)=>this.setState({intro})}
                />
            </View>
            <TouchableHighlight underlayColor='none' onPress={()=>this.basicUserInfo()}>
              <View style={Styles.sendButton}>
                <Text style={{fontSize:Utils.subHeadSize}}>Submit</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}
