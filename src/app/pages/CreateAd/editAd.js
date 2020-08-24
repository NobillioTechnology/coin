

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, CheckBox, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import RadioForm from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DropDown from '../DropDown';
import SearchableDropdown from 'react-native-searchable-dropdown';

const width = Dimensions.get('window').width;

var radio_props = [
  {label: 'Sell Bitcoin   ', value: 'sell' },
  {label: 'Buy Bitcoin', value: 'buy' }
];

export default class Home extends Component {

  constructor(props){
    super(props);
      this.state={
        _id:'', adId:'',
        loading:false, loadingTitle:'Please Wait', loadingMessage:'loading...',
        detailsTab:false, wantTo:'sell', radioInit:0,
        country:'', validCountry:true, countryIndex:0,
        paymentList:[], paymentMode:'', paymentModeLabel:'', validPaymentMode:true, paymentIndex:0,
        currency:'', validCurrency:true, currencyIndex:0,
        margin:0, validMargin:true, priceBtc:'0.0000',
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
      }

      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.stopLoading=this.stopLoading.bind(this);
       this.closeDrop=this.closeDrop.bind(this);
      this.chooseDropItem=this.chooseDropItem.bind(this);
      this.getAd=this.getAd.bind(this);

      this.getData();
      const con = this.props.navigation.getParam('con', 'China');
      Utils.country.map((item, index)=>{
        if(item.value==con)
          this.state.countryIndex=index;
      })

      const pay = this.props.navigation.getParam('pay', 'gift');
      console.log(pay);
      this.state.paymentList.map((item, index)=>{
        if(item.value==pay)
          this.state.paymentIndex=index;
      })
      const curr = this.props.navigation.getParam('curr', 'INR');
      Utils.currency.map((item, index)=>{
        if(item.value==curr)
          this.state.currencyIndex=index;
      })

  }

  getData=async()=>{
    const _id = await AsyncStorage.getItem(Utils._id);
    const adId = await this.props.navigation.getParam('id', '');
    this.state._id = _id;
    this.state.adId = adId; 
    await this.getPaymentList();
    await this.getAd();
  }

 componentDidMount=async()=>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        const _id = await AsyncStorage.getItem(Utils._id);
        await this.getTagList();
        // const adId = await this.props.navigation.getParam('id', '');
        // await this.setState({_id:_id, adId:adId});
        // await this.getAd();

        console.log('con Index ===>', this.state.countryIndex, 'country', this.state.country);
        console.log('curr Index ===>', this.state.currencyIndex, 'currency', this.state.currency);
        console.log('pay Index ===>', this.state.paymentIndex, 'payment', this.state.paymentModeLabel);
  }

  // radioForm=React.createRef();

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

  selectedPaymentMthod(val){
    this.state.paymentList.map((item=>{
      if(item.value==val)
      this.setState({paymentMode:val, paymentModeLabel:item.label, paymentMethodSelector:false, validPaymentMode:true});
    }))

  }

  selectedCountry(val){
    console.log(JSON.stringify( val));
    this.setState({country:val.value, validCountry:true});
  }

  selectedCurrency(val){
    console.log(JSON.stringify( val));
    this.setState({currency:val.value, validCurrency:true});
  }

  getPaymentList=async()=>{
      this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
      await WebApi.getApi_trade('paymentMethodList')
      .then(response => response.json())
                .then(json => {
                     // console.log('Response from paymentList===>', json);
                        if(json.responseCode==200){
                            const data = json.result
                            data.map((item, index)=>{
                              const paymentList = this.state.paymentList;
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
                   // this.setState({loading:false});
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
    if(margin>0 && margin<100){
      this.setState({validMargin:true});
      await this.priceCal();
    }
    else this.setState({validMargin:false});
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
    const body = JSON.stringify({
                  localCurrency:this.state.currency,
                  margin:this.state.margin
                })
    await WebApi.postApi_user('priceEquationWithMargin', body)
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from paymentList===>', json.result.price);
                        if(json.responseCode==200){
                            const data = json.result
                              this.setState({
                                priceBtc:data.price,
                                poriceToShow:this.refineBtc(String(parseFloat(data.price).toFixed(2)))
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

  stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }

  nextButton(){
    if(this.state.country!='' && this.state.validCountry){
      if(this.state.paymentModeLabel!='' && this.state.validPaymentMode){
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
    console.log('value====>',val, 'minTxn===>',this.state.minTxn, 'maxTxn====>', this.state.maxTxn);
    if(val!=''){
      var restrictList = this.state.restrictList;
      var restricts = this.state.restricts;
      if(this.state.minTxn!='' && this.state.validMinTxn && this.state.maxTxn!='' && this.state.validMaxTxn){
        if(val>=this.state.minTxn || val<=this.state.maxTxn){
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

 getAd=async()=>{
       // this.setState({loading:true, loadingTitle:'Please Wait'});
       await WebApi.getApi_trade('detail_trade/'+this.state.adId)
        .then(response => response.json())
          .then(json => {
             this.setState({loading:false});
               console.log('Response from edit trade===>', json);
                  if(json.responseCode==200){
                      // console.log('Modified json=====>', json.result.docs)
                      const data = json.result;
                      if(data.type_of_trade_original=='sell')
                         this.refs.radioForm.updateIsActiveIndex(0)
                      else
                         this.refs.radioForm.updateIsActiveIndex(1)

                         this.state.paymentList.map((item)=>{
                           if(item.name==data.payment_method)
                            this.setState({paymentMode:item.value, paymentModeLabel:item.name});
                         })
                      this.setState({
                        currency:data.currency_type,
                        country:data.location,
                        margin:String(data.margin),
                        maxTxn:String(data.max_transaction_limit),
                        minTxn:String(data.min_transaction_limit),
                        paymentModeLabel:data.payment_method,
                        time:String(data.payment_time),
                        priceBtc:data.price_equation,
                        poriceToShow:this.refineBtc(parseFloat(data.price_equation).toFixed(2)),
                        restricts:data.restrict_amount,
                        identified:data.security_options.identfifed_people,
                        smsVerify:data.security_options.sms_verification,
                        trusted:data.security_options.trusted_people,
                        wantTo:data.type_of_trade_original,
                        tt:data.terms_of_trade,
                        tags:data.add_tags,
                      })
                      // this.validateMargin(data.margin);

                      // console.log(this.state.location, JSON.stringify(Utils.country));

                  }else{
                    this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                  }
              })
          .catch(error => {
              console.log('error==>' , error)
              this.setState({refreshing:false, loading:true, loadingMore:false,
                            loadingTitle:'Alert',
                            loadingMessage:'Oops! '+error,
              })
          });
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
    var rule = 'You can only buy psot';
    if(this.state.wantTo==='buy'){
      rule='You can only sell post';
    }
    const body = JSON.stringify({
                  adId:this.state.adId,
                  addTag:this.state.tags,
                  currency:this.state.currency,
                  identfifed_people:this.state.identified,
                  location:this.state.country,
                  margin:this.state.margin,
                  maxTxnlimit:this.state.maxTxn,
                  minTxnlimit:this.state.minTxn,
                  method_of_payment:this.state.paymentMode,
                  paymentMethodId:this.state.paymentMode,
                  payment_time:this.state.time,
                  priceEquation:this.state.priceBtc,
                  restrictAmount:this.state.restricts,
                  ruleAndrequirement:rule,
                  sms_verification:this.state.smsVerify,
                  termTrade:this.state.tt,
                  trade_type:this.state.wantTo,
                  trusted_people:this.state.trusted,
                })
    await WebApi.postApi_trade('update_ad', body)
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from update Ads===>', json);
                        if(json.responseCode==200){
                          // console.log('response message=====>', json.responseMessage);
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:''+json.responseMessage, detailsTab:false});
                          this.props.navigation.goBack(null);
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
  }

   openDrop(dropType){
     if(dropType=='payment')
       this.setState({currentDrop:'payment',dropItems:this.state.paymentList, dropDown:true});
     else if(dropType=='currency')
       this.setState({currentDrop:'currency',dropDown:true, dropItems:Utils.currency});
     else if(dropType=='restricts')
       this.setState({currentDrop:'restricts',dropDown:true, dropItems:this.state.restrictList});
     else if(dropType=='tag')
       this.setState({currentDrop:'tag', dropDown:true, dropItems:this.state.tagList});
     
  }
   chooseDropItem(item, index){
     if(this.state.currentDrop=='payment')
         this.setState({dropDown:false, paymentMode:item.value, paymentModeLabel:item.label});
     else if(this.state.currentDrop=='currency')
         this.setState({dropDown:false, currency:item.value});
     else if(this.state.currentDrop=='restricts'){
         this.setState({dropDown:false});
         console.log('index====>', index, 'value===>', item.value);
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


  render() {
   // if(this.props.navigation.state.key=='Icon')
    //  console.log('min_transaction_limit====>', this.state.minTxn);

    return (
      <View style={Styles.body}>
       <Header title="Edit Ad" menuCheck="false" data={this.props} style={Styles.header}/>
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
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          {this.state.detailsTab==false ? (
            <View style={Styles.container}>
              <View style={[Styles.head, {width:'95%', borderRadius:10, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:Utils.colorDarkBlue, height:40}]}>
                <Text style={[Styles.heading, {borderRadius:5}]}>Advertisement Rules And Requirements</Text>
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
                  ref={'radioForm'}
                />
              </View>

              <View style={[{flex:1, flexDirection:'row', width:'90%', alignSelf:'center', alignItems:'center', justifyContent:'center', marginTop:10}]}>
                <Text style={[{flex:1}]}>Location:</Text>
                <View style={[this.state.validCountry==false ? Styles.countryViewError : Styles.countryView, {width:'55%', alignItems:'center', justifyContent:'center'}]}>
                  <SearchableDropdown
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
                            defaultIndex={this.state.countryIndex}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Country",
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40,
                                    textAlign:'center'
                                  },
                                onTextChange: text => console.log(text)
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
                  <CheckBox value={this.state.identified} onValueChange={(value)=>this.setState({identified:value})}/>
                  <Text style={Styles.checkLabel}>Identified people only</Text>
                </View>
                <View style={Styles.checkRow}>
                  <CheckBox value={this.state.smsVerify} onValueChange={(value)=>this.setState({smsVerify:value})}/>
                  <Text style={Styles.checkLabel}>SMS verification needed</Text>
                </View>
                <View style={Styles.checkRow}>
                  <CheckBox value={this.state.trusted} onValueChange={(value)=>this.setState({trusted:value})}/>
                  <Text style={Styles.checkLabel}>Trusted people only</Text>
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
                            itemsContainerStyle={{ maxHeight: 240 }}
                            items={this.state.paymentList}
                            defaultIndex={this.state.paymentIndex}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Payment Method",
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40,
                                    textAlign:'center'
                                  },
                                onTextChange: text => console.log(text)
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
                            defaultIndex={this.state.currencyIndex}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Currency",
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40,
                                    textAlign:'center'
                                  },
                                onTextChange: text => console.log(text)
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
                  <View style={this.state.validMargin ? [Styles.inputText, {width:'55%'}] : Styles.inputTextError}>
                    <TextInput style={Styles.bitAddress}
                      placeholder="0"
                      placeholderTextColor={Utils.colorGray}
                      value={this.state.margin}
                      onChangeText={(margin)=>this.validateMargin(margin)}
                    />
                    <Icon name="percent" style={Styles.copyIcon}/>
                  </View>
                </View>

                <View style={[Styles.radioView, {width:'90%'}]}>
                  <Text style={[Styles.radioText, {flex:1}]}>Price/BTC:</Text>
                  <View style={[Styles.inputText, {justifyContent:'center', width:'55%'}]}>
                    <Text style={Styles.bitAddress}>{this.state.poriceToShow}</Text>
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
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={Styles.placeholder}>Select</Text>
                      <Icon name='sort-down' style={[Styles.dropIcon,{position:'absolute', right:5, top:0}]}/>
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
                      <Icon name='sort-down' style={[Styles.dropIcon,{position:'absolute', right:5, top:0}]}/>
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
                  <TextInput style={Styles.bitAddress}
                    placeholder='30-360 minutes'
                    placeholderTextColor={Utils.colorGray}
                    keyboardType={'numeric'}
                    value={this.state.time}
                    onChangeText={(time)=>this.setState({time:time, validTime:true})}
                  />
                </View>
              </View>

              <Image style={{width:'70%', height:2, backgroundColor:Utils.colorDarkBlue, marginTop:35, alignSelf:'center'}}/>

              <TouchableHighlight style={[Styles.submitBotton, {marginTop:35}]} onPress={()=>this.checkValid()}>
                <Text style={{fontSize:Utils.subHeadSize}}>Save advertisement</Text>
              </TouchableHighlight>

            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
