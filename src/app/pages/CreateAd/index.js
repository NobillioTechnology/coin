

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, CheckBox, BackHandler, ActivityIndicator, Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import RadioForm from 'react-native-simple-radio-button';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DropDown from '../DropDown';


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
        countryData:Utils.country,
        country:'', validCountry:true,countrySelector:false,
        paymentList:[],payListWeb:[], paymentMode:'',paymentModeLabel:'', validPaymentMode:true,
        currency:'', currencySelector:false, currencyData:Utils.currency, validCurrency:true,
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
         termsTab:false, temp:[],
      }

      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.stopLoading=this.stopLoading.bind(this);
      this.closeDrop=this.closeDrop.bind(this);
      this.chooseDropItem=this.chooseDropItem.bind(this);
   }

   componentDidMount=async()=>{
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    const _id = await AsyncStorage.getItem(Utils._id);
    this.setState({_id:_id});
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

  selectCountry=async(country)=>{
    console.log('country text====>',country);
    this.setState({country:country, validCountry:false, countrySelector:true, currencySelector:false, paymentMethodSelector:false});
     var data = Utils.country;
     var out = [];
    for (var i = 0; i< data.length; i++) {
    if(data[i].label.substring(0, country.length)==country)
        out.push(data[i]);
      }
     // console.log(out)
     this.setState({countryData:out});
  }

  selectedCountry(val){
    this.setState({country:val, countrySelector:false, validCountry:true});
  }

  selectCurrency=async(currency)=>{
    var data =  Utils.currency;
    var out = [];
    this.setState({currency:currency, currencySelector:true, countrySelector:false, paymentMethodSelector:false, validCurrency:false});
    for (var i = 0; i<data.length; i++) {
        if(data[i].label.substring(0, currency.length)==currency.toUpperCase())
        out.push(data[i]);
      }
      console.log('Item====>after filter', currency.toUpperCase(), out);
      this.setState({currencyData:out});
  }

  selectedCurrency(val){
    this.setState({currency:val, currencySelector:false, validCurrency:true});
    // this.priceEquation(this.state.amountBtc);
  }

  selectPayMethod=async(val)=>{
    this.setState({paymentList:this.state.payListWeb});
    var data =  this.state.payListWeb;
    var out = [];
    this.setState({paymentMode:val, paymentModeLabel:val, paymentMethodSelector:true, countrySelector:false, currencySelector:false, validPaymentMode:false});
    for (var i = 0; i<data.length; i++) {
        if(data[i].label.substring(0, val.length)==val)
            out.push(data[i]);
      }
    //  console.log(out)
     this.setState({paymentList:out});
  }

  selectedPaymentMthod(val){
    this.state.paymentList.map((item=>{
      if(item.value==val)
      this.setState({paymentMode:val, paymentModeLabel:item.label, paymentMethodSelector:false, validPaymentMode:true});
    }))

  }

  getPaymentList=async()=>{
    await WebApi.getApi_trade('paymentMethodList')
      .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     // console.log('Response from paymentList===>', json);
                        if(json.responseCode==200){
                            const data = json.result
                            data.map((item, index)=>{
                              const paymentList = this.state.payListWeb;
                              paymentList.push({label:item.name, value:item._id, color:'#000000'});
                              this.setState({
                                payListWeb:paymentList,
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

  priceCal=async()=>{
    this.setState({priceLoading:true});
    var crr = this.state.currency;
    if(crr=='')
    crr = 'INR';
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
                                priceBtc:String(parseFloat(data.price).toFixed(2)),
                                priceLoading:false
                              })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage, priceLoading:false});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error, priceLoading:false});
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
          if(this.state.time!==0 && this.state.validTime){
            this.submitAd();
          }else
          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter set valid Payment Window!', validTime:false});
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
                  addTag:this.state.tags,
                  currencyType:this.state.currency,
                  identfifed_people:this.state.identified,
                  location:this.state.country,
                  margin:this.state.margin,
                  maxTxnlimit:this.state.maxTxn,
                  minTxnlimit:this.state.minTxn,
                  paymentMethodId:this.state.paymentMode,
                  payment_time:this.state.time,
                  priceEquation:this.state.priceBtc,
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
              <Text style={Styles.heading}>Advertisement Rules And Requirements</Text>
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
              <View style={Styles.radioView}>
                <Text style={Styles.radioText}>Location:</Text>
                <View style={this.state.validCountry==false ? Styles.countryViewError : Styles.countryView}>
                       <TextInput style={{paddingHorizontal:15, width:'100%'}} 
                            placeholder='Select Country' 
                            onChangeText={(country)=>{this.selectCountry(country);}}
                            value={this.state.country}
                            onFocus={() =>this.setState({countrySelector:true})}
                            // autoFocus={true}
                       />
                       {/* <Icon name='sort-down' style={Styles.dropIcon}/> */}
                   </View>
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

              <View style={Styles.securityView}>
                <Text style={Styles.radioText}>Security options:</Text>
                <View style={Styles.checkRow}>
                  <CheckBox value={this.state.identified} onValueChange={(value)=>this.setState({identified:value})}/>
                  <Text style={Styles.checkLabel}>Identity verification needed</Text>
                </View>
                <View style={Styles.checkRow}>
                  <CheckBox value={this.state.smsVerify} onValueChange={(value)=>this.setState({smsVerify:value})}/>
                  <Text style={Styles.checkLabel}>SMS verification needed</Text>
                </View>
                <View style={Styles.checkRow}>
                  <CheckBox value={this.state.trusted} onValueChange={(value)=>this.setState({trusted:value})}/>
                  <Text style={Styles.checkLabel}>Only people who Trust my Profile</Text>
                </View>
              </View>
              <View style={Styles.radioView}>
                <Text style={Styles.radioText}>Payment Method:</Text>
                <View style={this.state.validPaymentMode ? Styles.countryView : Styles.countryViewError}>
                <View style={{flexDirection:'row'}}>
                    <TextInput style={{paddingHorizontal:10, width:'100%'}}
                              placeholder='Select Payment Method'
                              onChangeText={(text)=>this.selectPayMethod(text)}
                              value={this.state.paymentModeLabel}
                              onFocus={() =>this.setState({paymentMethodSelector:true})}
                        />
                    {/* <Text style={this.state.currency=='Select currency' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.currency}</Text> */}
                    {/* <Icon name='sort-down' style={Styles.dropIcon}/> */}
                  </View>
                  </View>
                </View>
                <ScrollView style={{width:'100%'}} keyboardShouldPersistTaps={'always'}>
                    <View>
                        {this.state.paymentMethodSelector==true && (
                          <View>
                            <View style={{width:'100%', backgroundColor:Utils.colorWhite, marginVertical:10, paddingTop:10}}>
                              {this.state.paymentList.map((item, index)=>{
                                return (
                                  <View style={{width:'100%'}}>
                                    <Text style={{color:Utils.colorBlack, paddingHorizontal:15, fontSize:Utils.subHeadSize}} onPress={()=>this.selectedPaymentMthod(item.value)}>{item.label}</Text>
                                    <Image style={{width:'100%', height:1, backgroundColor:Utils.colorGray, marginVertical:10}} />
                                  </View>
                                )
                              })}
                            </View>
                          </View>
                        )}
                    </View>
                  </ScrollView>
                <View style={Styles.radioView}>
                <Text style={Styles.radioText}>Currency:</Text>
                <View style={this.state.validCurrency ? Styles.pickerView : Styles.pickerViewError}>
                  <View style={{flexDirection:'row'}}>
                    <TextInput style={{paddingHorizontal:10, width:'100%'}}
                              placeholder='Select Currency'
                              onChangeText={(text)=>this.selectCurrency(text)}
                              value={this.state.currency}
                              onFocus={() =>this.setState({currencySelector:true})}
                        />
                    {/* <Text style={this.state.currency=='Select currency' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.currency}</Text> */}
                    {/* <Icon name='sort-down' style={Styles.dropIcon}/> */}
                  </View>
                </View>
              </View>
              <ScrollView style={{width:'100%'}} keyboardShouldPersistTaps={'always'}>
                    <View>
                        {this.state.currencySelector==true && (
                          <View>
                            <View style={{width:'100%', backgroundColor:Utils.colorWhite, marginVertical:10, paddingTop:10}}>
                              {this.state.currencyData.map((item, index)=>{
                                return (
                                  <View style={{width:'100%'}}>
                                    <Text style={{color:Utils.colorBlack, paddingHorizontal:15, fontSize:Utils.subHeadSize}} onPress={()=>this.selectedCurrency(item.value)}>{item.label}</Text>
                                    <Image style={{width:'100%', height:1, backgroundColor:Utils.colorGray, marginVertical:10}} />
                                  </View>
                                )
                              })}
                            </View>
                          </View>
                        )}
                    </View>
                  </ScrollView>

                 <View style={Styles.radioView}>
                  <Text style={Styles.radioText}>Margin:</Text>
                  <View style={this.state.validMargin ? Styles.inputText : Styles.inputTextError}>
                    <TextInput style={Styles.bitAddress}
                      placeholder="0"
                      placeholderTextColor={Utils.colorGray}
                      value={this.state.margin}
                      onChangeText={(margin)=>this.validateMargin(margin)}
                      keyboardType={"number-pad"}
                    />
                    <Icon name="percent" style={Styles.copyIcon}/>
                  </View>
                </View>
                <View style={{marginLeft:'25%', marginTop:10}}>
                <Text style={{color:Utils.colorGray}}>Current Bitcoin market price : {this.state.currentPrice}</Text>
                <Text style={{color:Utils.colorGray}}>Your Bitcoin selling price : {this.state.priceBtc}</Text>
                <Text style={{color:Utils.colorGray}}>How much you earn per one Bitcoin : {(this.state.priceBtc-this.state.currentPrice).toFixed(2)}</Text>
                </View>

                <View style={Styles.radioView}>
                  <Text style={Styles.radioText}>Price/BTC:</Text>
                  <View style={[Styles.inputText, { alignItems:'center', flexDirection:'row'}]}>
                    {this.state.priceLoading && (
                      <ActivityIndicator size={'small'}/>
                    )}
                    <Text style={Styles.bitAddress}>  {this.state.priceBtc}</Text>
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
              <Text style={Styles.heading}>More Information</Text>
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
                  <TextInput style={Styles.bitAddress}
                    placeholder='30-360 minutes'
                    placeholderTextColor={Utils.colorGray}
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
                            <Text style={{fontSize:Utils.subHeadSize+1, fontWeight:'bold', textAlign:'center'}}>Advertisement Rules And Requirements</Text>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>Please click on Transfer bonds button in Dashboard once you create ad , Currently bond value is zero, its just introduced to make sure advertisers are not creating spam ads.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>The Advertisers will be charged 1 % on each completed trade transactions on Coinbaazar.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>The price is final once a trade transaction is open, exception will be made only if there is an absolutely clear mistake in pricing.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>Buying and Selling on behalf of someone else shall be avoided. i.e. Middlemen etc.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>Your payment details must be specified in the advertisement or in the trade chat. All transactions and communication must happen on Coinbaazar platform.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>Please note payment methods marked as High risk, have significant risk of fraud. Coinbaazar wants to warn you about these payment modes .</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>You must ensure ID verification of your trading partners when you are using high risk and high value payments.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>You must disable your ad/ads if you are not ready for trade or You want to go offline.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>In case of any help/assistance while creating ad , please ask the live chat support.</Text>
                            </View>
                            <View style={{flexDirection:'row', marginVertical:10}}>
                              <Text style={{fontSize:18}}>֍ </Text>
                              <Text style={Styles.dropItem}>Coinbaazar with its transparent and multi utility efficiency system covers a lot more than what other payment systems have to offer. Traders from different countries can exchange their Bitcoin currency through their Coinbaazar wallet.</Text>
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
      </View>
    );
  }
}
