

import React, { Component } from 'react';
import {
  Text, View, TextInput, ScrollView, TouchableHighlight, BackHandler, ActivityIndicator, Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import {QRscanner} from 'react-native-qr-scanner';
import DropDown from '../DropDown';


export default class Home extends Component {


  constructor(props) {
    super(props);
      this.state={
        title:'Send Bitcoin',
        _id:'',
        balance:'',
        loading: false,
        loadingTitle:'Please Wait',
        loadingMessage:"Logining...",
        receivingAddress:'', validAddress:true, validAmount:true, validAmountBtc:true, validDesc:true,
        amountBtc:'', amount:'0.00', desc:'',
        scannerView: false, flashMode: false, zoom: 0.2, fee:'', dropDown:false, loaderA:false, loaderF:false,
        currency:'', currencySelector:false, currencyData:Utils.currency, validCurrency:true
      }
    this.stopLoading=this.stopLoading.bind(this);
    this.handleBack=this.handleBack.bind(this);
    this.closeDrop=this.closeDrop.bind(this);
    this.chooseDropItem=this.chooseDropItem.bind(this);
   }

  componentDidMount=async()=>{
     BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    this.setState({_id:await AsyncStorage.getItem(Utils._id)});
    this.getProfile();
  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack(){
    if(this.state.scannerView){
      this.setState({scannerView:false});
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

  getProfile=async()=>{
    this.setState({loading:true});
    const body = JSON.stringify({
                  _id:this.state._id
                })
    await WebApi.postApi_user('userProfile', body)
      .then(response => response.json())
        .then(json => {
             console.log('Response from getProfile===>', json);
                this.setState({loading:false});
                if(json.responseCode==200){
                  const data = json.result
                  this.setState({
                    balance:parseFloat(data.btc.total).toFixed(8),
                    fee:data.tradeTotalFee,
                    sendUpTp:data.conf_trades
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

  priceEquation=async(btc)=>{
      await this.setState({amountBtc:btc, validAmountBtc:true, loaderA:true, amount:''});
      if(this.state.currency==''){
        this.setState({loaderA:false, validCurrency:false, amount:'0.00'});
        return null;
      }

      const body = JSON.stringify({
                      btc:this.state.amountBtc,
                      localCurrency:this.state.currency,
                    })
      await WebApi.postApi_user('priceEquation', body)
      .then(response => response.json())
        .then(json => {
             console.log('Response from priceEquation===>', json);
                this.setState({loaderA:false});
                if(json.responseCode==200){
                  const data = json.result
                  this.setState({
                     amount:''+data.price.toFixed(2)
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

  getFee=async()=>{
    await this.setState({loaderF:true, fee:''});
    await WebApi.getApi_user('chnageTransactionAmount/'+this.state.receivingAddress)
        .then(response => response.json())
        .then(json => {
             console.log('Response from fee===>', json);
                this.setState({loaderF:false});
                if(json.responseCode==200){
                  const data = json.result
                  this.setState({
                     fee:data.toFixed(8)
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

  sendBTC=async()=>{
    if((this.state.receivingAddress!='') && (this.state.validAddress==true)){
      if(this.state.amountBtc!='' && this.state.validAmountBtc){
          
          await this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Sending...'});
          const body = JSON.stringify({
                          amount:this.state.amountBtc,
                          localCurrency:this.state.currency,
                          remark:this.state.desc,
                          sendTo:this.state.receivingAddress,
                          userId:this.state._id
                        })
          await WebApi.postApi_user('withdraw_amount', body)
          .then(response => response.json())
            .then(json => {
                 console.log('Response from sendBitCoin===>', json);
                    this.setState({loading:false});
                    if(json.responseCode==200){
                      const data = json.result
                      this.setState({
                        loading:true, loadingTitle:'Alert', loadingMessage:json.message,
                        amountBtc:'',currency:'', desc:'', receivingAddress:'', amount:'0.00000' 
                      });
                      // this.props.navigation.goBack(null);

                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.message});
                    }
                })
                .catch(error => {
                     console.log('error==>' , error)
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                });
      
      }else{
        this.setState({validAmountBtc:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid Amount!'});
      }
    }
    else{
      this.setState({validAddress:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid Receiving Address!'});
    }
    
  }

  validateBtcAddress=async(address)=>{
    await this.setState({receivingAddress:address});
    if(address.length>15){
      this.setState({validAddress:true});
      this.getFee();
    }
    else
      this.setState({validAddress:false});
    
  }

  startScan(){
    this.setState({scannerView:true});
  }

  bottomView = ()=>{
    return(
    <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
      <TouchableHighlight style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
        <Text style={{color:'#fff'}}>Flash</Text>
      </TouchableHighlight>
    </View>
    );
  }
  onRead = (res) => {
    console.log(res);
    if(res.data!=undefined){
      this.setState({scannerView:false, receivingAddress:res.data});
    }
  }

   chooseDropItem(item){
         this.setState({dropDown:false, currency:item.value});
    }

    closeDrop(){
      this.setState({dropDown:false});
  }

  selectCurrency=async(currency)=>{
    this.setState({currency:currency, currencySelector:true, countrySelector:false, validCurrency:true});
     var data = Utils.currency;
     var out = [];
    for (var i = 0; i<data.length; i++) {

    if(data[i].label.substring(0, currency.length)==currency)
        out.push(data[i]);
      }
     console.log(out)
     this.setState({currencyData:out});
  }

  selectedCurrency(val){
    this.setState({currency:val, currencySelector:false, validCurrency:true});
    this.priceEquation(this.state.amountBtc);
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
          items={Utils.currency}
          choose={this.chooseDropItem}
        />
        {this.state.scannerView && (
          <QRscanner 
            onRead={this.onRead} 
            renderBottomView={this.bottomView} 
            flashMode={this.state.flashMode} 
            zoom={this.state.zoom} 
            finderY={50}
            hintText="Scan Qr code for Wallet address"
            />
        )}
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={Styles.container}>
            <View style={Styles.head}>
              <Text style={Styles.heading}>Barcode Details</Text>
              <Icon name="chevron-down" style={Styles.rightIcon}/>
            </View>
            <View style={Styles.borderBody}>
              <View style={{flexDirection:'row', marginLeft:10}}>
                <Text style={Styles.textLabel}>In your Wallet:</Text>
                <Text style={[Styles.textValue, {fontWeight:'bold', color:Utils.colorBlack}]}>{this.state.balance} BTC</Text>
              </View>
              <View style={{flexDirection:'row', marginLeft:10, marginTop:5}}>
                <Text style={Styles.textLabel}>Transaction Fee:</Text>
                {this.state.loaderF && (
                  <ActivityIndicator size={'small'} />
                )}
                <Text style={[Styles.textValue, {fontWeight:'bold', color:Utils.colorBlack}]}>{this.state.fee} BTC</Text>
              </View>
              <View style={{flexDirection:'row', marginLeft:10, marginTop:5}}>
                <Text style={Styles.textLabel}>You send upto:</Text>
                <Text style={[Styles.textValue, {fontWeight:'bold', color:Utils.colorBlack}]}>{this.state.sendUpTp} BTC</Text>
              </View>
            </View>
            <Text style={Styles.textHeading}>Receiving Bitcion address:</Text>
            <View style={[this.state.validAddress ? Styles.borderBody : Styles.borderBodyError, {padding:-10, flexDirection:'row', alignItems:'center'}]}>
              <TextInput
                style={{height:40, paddingHorizontal:10, flex:0.9}}
                placeholder="Address"
                placeholderTextColor={Utils.colorGray}
                value={this.state.receivingAddress}
                onChangeText={(address)=>this.validateBtcAddress(address)}
              />
              <Icon name="camera" style={{flex:0.1, fontSize:Utils.headSize}} onPress={()=>this.startScan()}/>
            </View>  
            <Text style={Styles.textHeading}>Amount in Bitcoins:</Text>
            <View style={[this.state.validAmountBtc ? Styles.borderBody : Styles.borderBodyError, {padding:-10}]}>
              <TextInput
                style={{height:40}}
                placeholder="0.000BTC"
                placeholderTextColor={Utils.colorGray}
                value={this.state.amountBtc}
                onChangeText={(btc)=>this.priceEquation(btc)}
              />
            </View>  
            <Text style={Styles.textHeading}>Description:</Text>
            <View style={[this.state.validDesc ? Styles.borderBody : Styles.borderBodyError, {padding:-10}]}>
              <TextInput
                style={{height:40}}
                placeholder="Appears in the transaction list"
                placeholderTextColor={Utils.colorGray}
                value={this.state.desc}
                onChangeText={(desc)=>this.setState({desc:desc})}
              />
            </View>  

            <Text style={Styles.textHeading}>Amount:</Text>
              <View style={{flexDirection:'row'}}>
                <View style={[Styles.borderBody, {padding:-10, flex:0.5, alignItems:'center', justifyContent:'center', height:42, flexDirection:'row'}]}>
                {this.state.loaderA && (
                  <ActivityIndicator size={'small'} />
                )}
                <Text style={{fontSize:Utils.subHeadSize}}>{this.state.amount}</Text>
                </View>
                <View style={this.state.validCurrency ? Styles.pickerView : Styles.pickerViewError}>
                  <View style={{flexDirection:'row'}}>
                    <TextInput style={{paddingHorizontal:10, width:'100%'}}
                              placeholder='Select Currency'
                              onChangeText={(country)=>this.selectCurrency(country.toUpperCase())}
                              value={this.state.currency}
                              onFocus={() =>this.setState({currencySelector:true})}
                        />
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
              <TouchableHighlight underlayColor='none' onPress={()=>this.sendBTC()}>
                <View style={Styles.submit}>
                  <Text style={{fontSize:Utils.subHeadSize}}>Continue</Text>
                </View>
              </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}
