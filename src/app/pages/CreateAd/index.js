

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, CheckBox, BackHandler, ActivityIndicator, Modal,
  ImageBackground, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import RadioForm from 'react-native-simple-radio-button';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DropDown from '../DropDown';
import SearchableDropdown from 'react-native-searchable-dropdown';
import HTML from 'react-native-render-html';
import CheckBoxIos from 'react-native-check-box';

const width = Dimensions.get('window').width;

var radio_props = [
  {label: 'Sell Bitcoin   ', value: 'sell' },
  {label: 'Buy Bitcoin', value: 'buy' }
];

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        _id:'',
        loading:false, loadingTitle:'Please Wait', loadingMessage:'loading...',
        detailsTab:false, wantTo:'sell',
        country:'', validCountry:true,
        paymentList:[], paymentMode:'', paymentModeLabel:'', validPaymentMode:true,
        currency:'', validCurrency:true,
        margin:'', validMargin:true, priceBtc:'0.0000',currentPrice:'0.00',
        identified:false, smsVerify:false, trusted:false,
        minTxn:0, validMinTxn:true, maxTxn:0, validMaxTxn:true,
        tagList:[], tags:[],
        restrictList:[
              {label:'10', value:'10', color:'#000'},
              {label:'15', value:'15', color:'#000'},
              {label:'20', value:'20', color:'#000'},
              {label:'25', value:'25', color:'#000'},
              {label:'50', value:'50', color:'#000'},
              {label:'100', value:'100', color:'#000'},
        ],
        restricts:[], tt:'', validTt:true, time:0, validTime:true,
         dropDown:false, currentDrop:'', dropItems:[],
         terms:'', termsTab:false, temp:[],
         color:require('../../assets/img/bg.jpg'),
         img:[require('../../assets/img/bg.jpg'),
              require('../../assets/img/bg2.jpg'),
              require('../../assets/img/bg3.jpg'),
              require('../../assets/img/bg4.jpeg'),
              require('../../assets/img/bg5.jpg'),
              require('../../assets/img/bg6.jpeg')],     
         }

      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.stopLoading=this.stopLoading.bind(this);
      this.closeDrop=this.closeDrop.bind(this);
      this.chooseDropItem=this.chooseDropItem.bind(this);
   }

   componentDidMount=async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
    console.log('color from create Ad====>', color);
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
    const _id = await AsyncStorage.getItem(Utils._id);
    this.setState({_id:_id});
    this.getTerms();
    this.getPaymentList();
    this.getTagList();
    await this.priceCal();
    this.setState({currentPrice:this.state.priceBtc});
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick(){
      if(this.state.detailsTab==true){
        this.setState({detailsTab:false});
        return true;
      }else{
        this.props.navigation.goBack(null);
        return true;
      }
  }

  getTerms=async()=>{
    await WebApi.getPrivacyPolicy('AddCondition')
    .then(response => response.json())
      .then(json => {
          this.setState({loading:false});
            var data = json.succ.description;
            data = data.substring(4, data.length);
                 // console.log('Response from terms===>', data);
            data = data.substring(0, data.length-6);
                // console.log('Response from terms===>', data);
            data = '<body><p><dl>'+data+'</dl></p></body>';
            console.log('Response from terms===>', data);
              if(json.responseCode==200){
                  this.setState({terms:data, termsTab:true});
              }else{
                this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
              }
          })
          .catch(error => {
                console.log('error==>' , error)
                this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
          });
  }

  selectedCountry(val){
    this.setState({country:val.value, validCountry:true});
  }

  selectedCurrency=async(val)=>{
    await this.setState({currency:val.value, validCurrency:true, margin:''});
    this.priceCal();
  }

  selectedPaymentMthod(val){
      this.setState({paymentMode:val.value, paymentModeLabel:val.name, validPaymentMode:true});
  }

  getPaymentList=async()=>{
    await WebApi.getApi_trade('paymentMethodList')
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     // console.log('Response from paymentList===>', json);
                        if(json.responseCode==200){
                            const data = json.result
                            var paymentList = this.state.paymentList;
                            data.map((item)=>{
                              paymentList.push({name:item.name, value:item._id});
                              this.setState({
                                paymentList:paymentList
                              })
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

  getTagList=async()=>{
      await WebApi.getApi_trade('tagList')
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     // console.log('Response from TagList===>', json);
                        if(json.responseCode==200){
                            const data = json.result
                            data.map((item, index)=>{
                              const tagList = this.state.tagList;
                              tagList.push({label:item.tagName, value:item.tagName, color:'#000000'});
                              this.setState({
                                tagList:tagList
                              })
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

  validateMargin=async(margin)=>{
    await this.setState({margin:margin});
    if(margin>-101 && margin<101){
      this.setState({validMargin:true});
      this.priceCal();
    }
    else 
      this.setState({validMargin:false});
  }

  refineBtc(btc){
    console.log(btc);
    const dot = btc.indexOf('.');
    var beforeDot = btc.substring(0, dot);
    var afterDot = btc.substring(dot, btc.length);
    beforeDot = beforeDot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return beforeDot+afterDot;
  }

  priceCal=async()=>{
    this.setState({priceLoading:true});
    var crr = this.state.currency;
    if(crr=='')
      crr = 'USD';
    const body = JSON.stringify({
                  localCurrency:crr,
                  margin:this.state.margin
                })
    await WebApi.postApi_user('priceEquationWithMargin', body)
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                    //  console.log('Response from priceCal===>', json);
                        if(json.responseCode==200){
                            const data = json.result

                              this.setState({
                                calculated:parseFloat(data.price).toFixed(2),
                                priceBtc:this.refineBtc(String(parseFloat(data.price).toFixed(2))),
                                priceToSend:data.price,
                                priceLoading:false
                              })
                              if(this.state.margin=='')
                                this.setState({currentPrice:this.refineBtc(String(parseFloat(data.price).toFixed(2))), temp:data.price});

                                var earn = data.price-this.state.temp;
                                this.setState({earn:this.refineBtc(String(parseFloat(earn).toFixed(2)))});
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage, priceLoading:false});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! Internal Server Error', priceLoading:false});
                    });

  }

  stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }

  nextButton(){
    if(this.state.country!='' && this.state.validCountry){
      if(this.state.paymentMode!='' && this.state.validPaymentMode){
        if(this.state.currency!='' && this.state.validCurrency){
            this.setState({detailsTab:true});
        }else
          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Select a Valid Currency!', validCurrency:false});
      }else
        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Please Select A Payment Method!', validPaymentMode:false});
    }else
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Select a valid Country!', validCountry:false});
  }

  validateMaxLimit=async(max)=>{
    this.setState({maxTxn:parseInt(max)});
    if(max<this.state.minTxn){
      this.setState({validMaxTxn:false});
    }
    else
      this.setState({validMaxTxn:true});
  }

  addTag(tag, index){
    if(tag!==''){
    var tagList = this.state.tagList;
    var tags = this.state.tags;
    tags.push(tag);
    // console.log(index-1);
    tagList.splice(index, 1);
    this.setState({ tagList:tagList, tags:tags});
    // console.log('taglist===>', this.state.tagList, '\n', 'tags====>', this.state.tags);
    // console.log('taglist===>', tagList, '\n', 'tags====>', tags);
    }
  }

  removeTag(tag, index){
    if(tag!==''){
      var tagList = this.state.tagList;
      var tags = this.state.tags;
      tagList.push({label:tag, value:tag, color:'#000000'});
      tags.splice(index, 1);
      this.setState({tags:tags, tagList:tagList});
    }
  }

  addRestrict(val, index){
    if(val!=''){
      var restrictList = this.state.restrictList;
      var restricts = this.state.restricts;
      if(this.state.minTxn!='' && this.state.validMinTxn && this.state.maxTxn!='' && this.state.validMaxTxn){
        if(val>=this.state.minTxn && val<=this.state.maxTxn){
          restricts.push(val);
          restrictList.splice(index, 1);
          this.setState({restricts:restricts, restrictList:restrictList});
        }else
          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Restrict amount should be between min Txn limit and max Txn limit!'});
      }else
        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter Txn limits!', validMinTxn:false, validMaxTxn:false})
    }
  }

  removeRestrict(val, index){
    if(val!=''){
      var restrictList = this.state.restrictList;
      var restricts = this.state.restricts;
      restrictList.push({label:val, value:val, color:'#000'});
      restricts.splice(index, 1);
      this.setState({restricts:restricts, restrictList:restrictList});
    }
  }

   openDrop(dropType){
    //  if(dropType=='payment')
    //    this.setState({currentDrop:'payment',dropItems:this.state.paymentList, dropDown:true});
    //  else if(dropType=='currency')
    //    this.setState({currentDrop:'currency',dropDown:true, dropItems:Utils.currency});
     if(dropType=='restricts')
       this.setState({currentDrop:'restricts',dropDown:true, dropItems:this.state.restrictList});
     else if(dropType=='tag')
       this.setState({currentDrop:'tag', dropDown:true, dropItems:this.state.tagList});
     
  }
   chooseDropItem(item, index){
    //  if(this.state.currentDrop=='payment')
    //      this.setState({dropDown:false, paymentMode:item.value, paymentModeLabel:item.label});
    //  if(this.state.currentDrop=='currency')
    //      this.setState({dropDown:false, currency:item.value});
     if(this.state.currentDrop=='restricts'){
         this.setState({dropDown:false});
         console.log('index====>', index);
         this.addRestrict(item.value, index);
     }
     else if(this.state.currentDrop=='tag'){
         this.setState({dropDown:false});
         this.addTag(item.value, index);
     }
   }

  closeDrop(){
    this.setState({dropDown:false});
  }

  checkValid=async()=>{
    if(this.state.minTxn!==0 && this.state.validMinTxn){
      if(this.state.maxTxn!==0 && this.state.validMaxTxn){
        if(this.state.tt!='' && this.state.validTt){
          if(this.state.time>=30 && this.state.validTime){
            this.submitAd();
          }else
          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter valid set Payment Window!', validTime:false});
        }else
        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Please enter Terms of trade.', validTt:false});
      }else
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter valid Max Txn limit!', validMaxTxn:false});
    }else 
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter valid Min Txn limit!', validMinTxn:false});
  }

  submitAd=async()=>{
    var rule = 'You can only buy post';
    if(this.state.wantTo==='buy'){
      rule='You can only sell post';
    }
    const body = JSON.stringify({
                  addTag:this.state.tags,
                  currencyType:this.state.currency,
                  identfifed_people:this.state.identified,
                  location:this.state.country,
                  margin:this.state.margin,
                  maxTxnlimit:this.state.maxTxn,
                  minTxnlimit:this.state.minTxn,
                  paymentMethodId:this.state.paymentMode,
                  payment_time:this.state.time,
                  priceEquation:this.state.priceToSend,
                  restrictAmount:this.state.restricts,
                  ruleAndrequirement:rule,
                  sms_verification:this.state.smsVerify,
                  termTrade:this.state.tt,
                  trade_type:this.state.wantTo,
                  trusted_people:this.state.trusted,
                  userId:this.state._id
                })
    await WebApi.postApi_trade('create_trade_advertise', body)
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from create Ads===>', json);
                        if(json.responseCode==200){
                          this.setState({loading:true, loadingTitle:'Success', loadingMessage:'Advertisement has been created.', detailsTab:false});
                          this.props.navigation.navigate('Trade', {title:'Trade'});
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
      <ImageBackground source={this.state.color} style={{flex:1}}>
      <Header title="Create AD" menuCheck="false" data={this.props} style={Styles.header}/>
       <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
        <DropDown
          closeDrop={this.closeDrop}
          dropdown={this.state.dropDown}
          items={this.state.dropItems}
          choose={this.chooseDropItem}
        />
        <ScrollView keyboardShouldPersistTaps={'always'}>
          {this.state.detailsTab==false ? (
            <View style={Styles.container}>
              <View style={[Styles.head, {width:'95%', borderRadius:10, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:Utils.colorDarkBlue, height:40}]}>
                <Text style={{color:Utils.colorWhite, fontSize:Utils.headSize}}>Advertisement Rules And Requirements</Text>
              </View>
              <View style={Styles.radioView}>
                <Text style={Styles.radioText}>I want to   </Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  animation={true}
                  onPress={(value) => {this.setState({wantTo:value})}}
                  borderWidth={1}
                  buttonColor={'#000'}
                  buttonSize={10}
                  buttonOuterSize={25}
                />
              </View>

              <View style={[{flex:1, flexDirection:'row', width:'90%', alignSelf:'center', alignItems:'center', justifyContent:'center', marginTop:10}]}>
                <Text style={[{flex:1}]}>Location:</Text>
                <View style={[this.state.validCountry==false ? Styles.countryViewError : Styles.countryView, {width:'55%', alignItems:'center', justifyContent:'center'}]}>
                  <SearchableDropdown
                            style={[this.validCountry ? Styles.countryView : Styles.countryViewError, {flex:1}]}
                            onItemSelect={(item) => {this.selectedCountry(item)}}
                            onRemoveItem={(item) => {
                              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                              this.setState({ selectedItems: items });
                            }}
                            itemStyle={{
                              padding: 10,
                              marginTop: 2,
                              backgroundColor:Utils.colorDarkBlue,
                              borderColor: '#bbb',
                              borderWidth: 1,
                              borderRadius: 5,
                            }}
                            itemTextStyle={{color:Utils.colorWhite}}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={Utils.country}
                            defaultIndex={0}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Country",
                                value:this.state.country,
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40,
                                    textAlign:'center'
                                  },
                                onTextChange: text => this.setState({country:text})
                              }
                            }
                            listProps={
                              {
                                nestedScrollEnabled: true,
                              }
                            }
                        />
                      </View>
                  </View>
              <View style={Styles.securityView}>
                <Text style={Styles.radioText}>Security options:</Text>
                <View style={Styles.checkRow}>
                {Platform.OS=='ios' ?
                    (
                      <CheckBoxIos isChecked = {this.state.identified} onClick={()=>this.setState({identified:!this.state.identified})}/>
                      ):(
                  <CheckBox value={this.state.identified} onValueChange={(value)=>this.setState({identified:value})}/>
                      )}
                  <Text style={Styles.checkLabel}>Identity verification needed</Text>
                </View>
                <View style={Styles.checkRow}>
                {Platform.OS=='ios' ?
                  (
                  <CheckBoxIos isChecked = {this.state.smsVerify} onClick={()=>this.setState({smsVerify:!this.state.smsVerify})}/>
                  ):(
                  <CheckBox value={this.state.smsVerify} onValueChange={(value)=>this.setState({smsVerify:value})}/>
                )}
                  <Text style={Styles.checkLabel}>SMS verification needed</Text>
                </View>
                <View style={Styles.checkRow}>
                {Platform.OS=='ios' ?
                  (
                  <CheckBoxIos isChecked = {this.state.trusted} onClick={()=>this.setState({trusted:!this.state.trusted})}/>
                  ):(
                  <CheckBox value={this.state.trusted} onValueChange={(value)=>this.setState({trusted:value})}/>
                  )}
                  <Text style={Styles.checkLabel}>Only people who Trust my Profile</Text>
                </View>
              </View>

              <Image style={{width:'80%', height:2, backgroundColor:Utils.colorDarkBlue, marginVertical:20, alignSelf:'center'}}/>


              <View style={[{flex:1, flexDirection:'row', width:'90%', alignSelf:'center', alignItems:'center', justifyContent:'center', marginTop:10}]}>
                  <Text style={[Styles.radioText, {flex:1}]}>Payment Method:</Text>
                  <View style={[this.state.validPaymentMode==false ? Styles.countryViewError : Styles.countryView, {width:'55%', alignItems:'center', justifyContent:'center'}]}>
                    <SearchableDropdown
                            style={[this.state.validPaymentMode ? Styles.countryView : Styles.countryViewError, {flex:1}]}
                            onItemSelect={(item) => {this.selectedPaymentMthod(item)}}
                            onRemoveItem={(item) => {
                              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                              this.setState({ selectedItems: items });
                            }}
                            itemStyle={{
                              padding: 10,
                              marginTop: 2,
                              backgroundColor:Utils.colorDarkBlue,
                              borderColor: '#bbb',
                              borderWidth: 1,
                              borderRadius: 5,
                            }}
                            itemTextStyle={{color:Utils.colorWhite}}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={this.state.paymentList}
                            defaultIndex={0}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Payment Method",
                                value:this.state.paymentModeLabel,
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40,
                                    textAlign:'center'
                                  },
                                onTextChange: text => this.setState({paymentModeLabel:text})
                              }
                            }
                            listProps={
                              {
                                nestedScrollEnabled: true,
                              }
                            }
                        />
                    </View>
                </View>
                <View style={[{flex:1, flexDirection:'row', width:'90%', alignSelf:'center', alignItems:'center', justifyContent:'center', marginTop:20}]}>
                  <Text style={[Styles.radioText, {flex:1}]}>Currency:</Text>
                  <View style={[this.state.validCurrency==false ? Styles.countryViewError : Styles.countryView, {width:'55%', alignItems:'center', justifyContent:'center'}]}>
                    <SearchableDropdown
                            style={[this.state.validCurrency ? Styles.countryView : Styles.countryViewError, {flex:1}]}
                            onItemSelect={(item) => {this.selectedCurrency(item)}}
                            onRemoveItem={(item) => {
                              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                              this.setState({ selectedItems: items });
                            }}
                            itemStyle={{
                              padding: 10,
                              marginTop: 2,
                              backgroundColor:Utils.colorDarkBlue,
                              borderColor: '#bbb',
                              borderWidth: 1,
                              borderRadius: 5,
                            }}
                            itemTextStyle={{color:Utils.colorWhite}}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={Utils.currency}
                            defaultIndex={0}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Currency",
                                value:this.state.currency,
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40,
                                    textAlign:'center'
                                  },
                                onTextChange: text => this.setState({currency:text})
                              }
                            }
                            listProps={
                              {
                                nestedScrollEnabled: true,
                              }
                            }
                        />
                      </View>
                    </View>
                 <View style={[Styles.radioView, {width:'90%'}]}>
                  <Text style={[Styles.radioText, {flex:1}]}>Margin:</Text>
                  <View style={this.state.validMargin ? [Styles.inputText, {width:'55%', marginLeft:13}] : Styles.inputTextError}>
                    <TextInput style={[Styles.bitAddress]}
                      placeholder="0"
                      placeholderTextColor={Utils.colorGray}
                      value={this.state.margin}
                      onChangeText={(margin)=>this.validateMargin(margin)}
                    />
                    <Icon name="percent" style={Styles.copyIcon}/>
                  </View>
                </View>
                <View style={{alignSelf:'flex-end', marginTop:10, marginRight:20}}>
                <Text style={{color:Utils.colorDarkGray}}>Current Bitcoin market price in {this.state.currency} : {this.state.currentPrice}</Text>
                <Text style={{color:Utils.colorDarkGray}}>Your Bitcoin selling price : {this.state.priceBtc}</Text>
                <Text style={{color:Utils.colorDarkGray}}>How much you earn per one Bitcoin : {this.state.earn}</Text>
                </View>

                <View style={[Styles.radioView, {width:'90%'}]}>
                  <Text style={[Styles.radioText, {flex:1}]}>Price/BTC:</Text>
                  <View style={[Styles.inputText, { alignItems:'center', flexDirection:'row', width:'55%'}]}>
                    {this.state.priceLoading && (
                      <ActivityIndicator size={'small'}/>
                    )}
                    <Text style={[Styles.bitAddress, Platform.OS=='ios' ? {marginTop:0} :{}]}>  {this.state.priceBtc}</Text>
                  </View>
                </View>
                <TouchableHighlight underlayColor='none' onPress={()=>this.nextButton()} style={Styles.nextButton}>
                  <View>
                    <Text style={{color:Utils.colorWhite, fontSize:Utils.subHeadSize}}>Next</Text>
                  </View>
                </TouchableHighlight>
            </View>

            ):(
            <View style={Styles.container}>
              <View style={[Styles.head, {width:'95%', borderRadius:10, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:Utils.colorDarkBlue, height:40}]}>
                <Text style={Styles.heading}>More Information</Text>
              </View>
              <View style={Styles.radioView}>
                <Text style={Styles.detailsLabelText}>Min.transaction limit:</Text>
                <View style={[this.state.validMinTxn ? Styles.inputText : Styles.inputTextError, {flex:0.4}]}>
                  <TextInput style={Styles.bitAddress}
                    placeholder={this.state.price}
                    placeholderTextColor={Utils.colorGray}
                    keyboardType={'numeric'}
                    value={this.state.minTxn}
                    onChangeText={(min)=>this.setState({minTxn:parseInt(min), validMinTxn:true})}
                  />
                </View>
              </View>
              <View style={Styles.radioView}>
                <Text style={Styles.detailsLabelText}>Max.transaction limit:</Text>
                <View style={[this.state.validMaxTxn ? Styles.inputText : Styles.inputTextError, {flex:0.4}]}>
                  <TextInput style={Styles.bitAddress}
                    placeholder={this.state.price}
                    placeholderTextColor={Utils.colorGray}
                    keyboardType={'numeric'}
                    value={this.state.maxTxn}
                    onChangeText={(max)=>this.validateMaxLimit(max)}
                  />
                </View>
              </View>
              <View style={Styles.radioView}>
                <Text style={Styles.detailsLabelText}>Restrict amount to:</Text>
                <View style={Styles.inputTextDetails}>
                  <TouchableHighlight onPress={()=>this.openDrop('restricts')} underlayColor='none'>
                    <View style={{flexDirection:'row'}}>
                      <Text style={Styles.placeholder}>Select</Text>
                      <Icon name='sort-down' style={[Styles.dropIcon,{top:0}]}/>
                    </View>
                    </TouchableHighlight>
                </View>
              </View>
                {this.state.restricts.length>0 && (
                    this.state.restricts.map((item, index)=>{
                      return(
                        <View style={Styles.tagBox}>
                           <Text>{item}</Text>
                           <Icon name='times' style={Styles.cross} onPress={()=>this.removeRestrict(item, index)}/>
                        </View>
                      )
                    })
                )}

              <View style={Styles.radioView}>
              <Text style={Styles.detailsLabelText}>Terms of trade:</Text>
              </View>
              <TextInput
                style={this.state.validTt ? Styles.detailsInputArea : Styles.detailsInputAreaError}
                value={this.state.tt}
                onChangeText={(val)=>this.setState({tt:val, validTt:true})}
                multiline={true}
              />
              <View style={Styles.radioView}>
              <Text style={Styles.detailsLabelText}>Add tags:</Text>
              </View>
                <View style={[Styles.inputTextDetails, {width:'90%', alignSelf:'center', marginVertical:10}]}>
                  <TouchableHighlight onPress={()=>this.openDrop('tag')} underlayColor='none'>
                    <View style={{flexDirection:'row'}}>
                      <Text style={Styles.placeholder}>Select</Text>
                      <Icon name='sort-down' style={[Styles.dropIcon,{top:0}]}/>
                    </View>
                    </TouchableHighlight>
                </View>
                {this.state.tags.length>0 && (
                    this.state.tags.map((item, index)=>{
                      return(
                        <View style={Styles.tagBox}>
                           <Text>{item}</Text>
                           <Icon name='times' style={Styles.cross} onPress={()=>this.removeTag(item, index)}/>
                        </View>
                      )
                    })
                )}

              <View style={Styles.radioView}>
                <Text style={Styles.detailsLabelText}>Set payment window:</Text>
                <View style={Styles.inputTextDetails}>
                  <TextInput style={[Styles.bitAddress, {marginTop:0}]}
                    placeholder='30-360 minutes'
                    placeholderTextColor={Utils.colorDarkGray}
                    keyboardType={'numeric'}
                    value={this.state.time}
                    onChangeText={(time)=>this.setState({time:time, validTime:true})}
                  />
                </View>
              </View>

              <TouchableHighlight style={Styles.submitBotton} onPress={()=>this.checkValid()}>
                <Text style={{fontSize:Utils.subHeadSize}}>Save advertisement</Text>
              </TouchableHighlight>

            </View>
          )}
        </ScrollView>
        <View style={{flex:1}}>
        <Modal style={[Styles.dialogue]}
              visible={this.state.termsTab}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => {this.handleBackButtonClick();}}>
                <View style={Styles.dialogue}>
                  <View style={Styles.dialogueContainer}>
                      <ScrollView style={{flex:1, marginHorizontal:10, marginTop:20}}>
                        <View>
                            <Text style={{fontSize:Utils.subHeadSize+1, fontWeight:'bold', textAlign:'center'}}>Terms And Conditions</Text>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <HTML html={this.state.terms } />
                              {/* <WebView originWhitelist={['*']} source={{ html: this.state.terms  }}/> */}
                            </View>
                          </View>
                      </ScrollView>
                      <TouchableHighlight onPress={()=>this.setState({termsTab:false})} style={Styles.ok}>
                        <View>
                            <Text style={{fontSize:Utils.headSize}}>Accept</Text>
                        </View>
                      </TouchableHighlight>
                  </View>
              </View>
          </Modal>
        </View>
        </ImageBackground>
      </View>
    );
  }
}
