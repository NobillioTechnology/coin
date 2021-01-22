import React, { Component } from 'react';
import {
  Text, View, TextInput, ScrollView, TouchableHighlight, BackHandler, ActivityIndicator, ImageBackground, Platform, Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import commonCss from '../Utils/commonCss';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import {QRscanner} from 'react-native-qr-scanner';
import DropDown from '../DropDown';
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class Home extends Component {


  constructor(props) {
    super(props);
      this.state={
        title:'Send Bitcoin',
        _id:'',
        balance:'',
        loading: false,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        receivingAddress:'', validAddress:true, validAmount:true, validAmountBtc:true, validDesc:true,
        amountBtc:'', amount:'', desc:'',
        scannerView: false, flashMode: false, zoom: 0.2, fee:'', dropDown:false, loaderA:false, loaderF:false,
        currency:'', currencySelector:false, currencyData:Utils.currency, validCurrency:true,
        otpView:false, otp:'', validOtp:true,
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
     BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
        this.setState({loaderA:false, validCurrency:false, amount:''});
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
                  if(data.price!=0)
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
                        loading:true, loadingTitle:'Success', loadingMessage:'Withdrawal successful',
                        amountBtc:'',currency:'', desc:'', receivingAddress:'', amount:'0.00000' 
                      });
                      // this.props.navigation.goBack(null);

                    }else if(json.responseCode==301){
                      this.setState({otpView:true});
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
    var data =  Utils.currency;
    var out = [];
    this.setState({currency:currency, currencySelector:true, countrySelector:false, paymentMethodSelector:false, validCurrency:false});
    // for (var i = 0; i<data.length; i++) {
    //     if(data[i].label.substring(0, currency.length)==currency.toUpperCase())
    //     out.push(data[i]);
    //   }
    //   console.log('Item====>after filter', currency.toUpperCase(), out);

      data.find((item)=>{
        let fltMethod= item.label.toLowerCase().match(currency.toLowerCase())
        if(fltMethod!=null){
          out.push(item);
        }
      })
  
      await this.setState({currencyData:out});
  }

  selectedCurrency(val){
    this.setState({currency:val.value, currencySelector:false, validCurrency:true});
    this.priceEquation(this.state.amountBtc);
  }

 refineBtc(btc){
    const dot = btc.indexOf('.');
    var beforeDot = btc.substring(0, dot);
    var afterDot = btc.substring(dot, btc.length);
    beforeDot = beforeDot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return beforeDot+afterDot;
  }

  verifyOtp=async()=>{
    await this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Verifying...'});
    const body = JSON.stringify({
                    amount:this.state.amountBtc,
                    otp:this.state.otp,
                    localCurrency:this.state.currency,
                    remark:this.state.desc,
                    sendTo:this.state.receivingAddress,
                    userId:this.state._id
                  })
    await WebApi.postApi_user('withdrawVerification', body)
    .then(response => response.json())
      .then(json => {
           console.log('Response from sendBitCoin===>', json);
              this.setState({loading:false});
              if(json.responseCode==200){
                const data = json.result
                this.setState({
                  loading:true, loadingTitle:'Success', loadingMessage:'Withdrawal successful',
                  otpView:false, otp:'',
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
  }

  handleAmountChange=async(txt)=>{
    this.setState({amount:txt});
    if(this.state.currency!=''){
      this.getBTC(txt);
    }else{
      this.setState({validCurrency:false});
    }
  }

  getBTC=async(amount)=>{

		var body = JSON.stringify({
			"localCurrency":this.state.currency,
			"margin": ""
		  });
		await WebApi.postApi_user("priceEquationWithMargin", body)
      .then(response => response.json())
      .then(json => {
        console.log('response from getBTC====>', json);
			  if (json.responseCode == 200) {
          var priceNow = json.result.price;
          var amountBtc = (amount/priceNow).toFixed(8);
          console.log('BTC after calculation', amountBtc);
					this.setState({amountBtc:amountBtc+''});
        }else{
          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
        }
			})
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
          <View style={[Styles.container, Platform.OS=='ios' ? {marginBottom:260} :{}]}>
          <View style={[Styles.head, {width:'95%', borderRadius:5, alignSelf:'center', alignItems:'center', justifyContent:'center'}]}>
              <Text style={Styles.heading}>Barcode Details</Text>
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
            <Text style={Styles.textHeading}>Receiving Bitcoin address:</Text>
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
                style={{height:40, paddingHorizontal:10}}
                placeholder="0.000BTC"
                placeholderTextColor={Utils.colorGray}
                value={this.state.amountBtc}
                onChangeText={(btc)=>this.priceEquation(btc)}
              />
            </View>  
            <Text style={Styles.textHeading}>Description:</Text>
            <View style={[this.state.validDesc ? Styles.borderBody : Styles.borderBodyError, {padding:-10}]}>
              <TextInput
                style={{height:40, paddingHorizontal:10}}
                placeholder="Appears in the transaction list"
                placeholderTextColor={Utils.colorGray}
                value={this.state.desc}
                onChangeText={(desc)=>this.setState({desc:desc})}
              />
            </View>  

            <Text style={Styles.textHeading}>Amount:</Text>
              <View style={{flexDirection:'row', alignSelf:'center', width:'97%'}}>
                <View style={[Styles.borderBody, {height:45, marginBottom:0, flex:0.5, alignItems:'center', justifyContent:'center', flexDirection:'row'}]}>
                {this.state.loaderA && (
                  <ActivityIndicator size={'small'} />
                )}
                <TextInput 
                  style={{fontSize:Utils.subHeadSize, width:'100%', height:50}}
                  value={this.refineBtc(this.state.amount)}
                  placeholder={"Enter Amount"}
                  onChangeText={(txt)=>this.handleAmountChange(txt)}
                  />
                </View>
                <View style={this.state.validCurrency ? Styles.pickerView : Styles.pickerViewError}>
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
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40
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
              <TouchableHighlight underlayColor='none' onPress={()=>this.sendBTC()} style={Styles.submit}>
                <View >
                  <Text style={{fontSize:Utils.subHeadSize}}>Continue</Text>
                </View>
              </TouchableHighlight>
          </View>
        </ScrollView>

        {this.state.otpView==true && ( 
              <Modal style={[commonCss.dialogue]}
                  visible={this.state.otpView}
                  transparent={true}
                  animationType={"fade"}
                  onRequestClose={()=>this.setState({otpView:false})}>
                <View style={commonCss.dialogue}>
                  <View style={[Styles.dialogueContainer, {marginTop:-70}]}>
                  <Icon name="close" style={Styles.close} onPress={()=>this.setState({otpView:false})}/>
                  <Text style={Styles.phoneVeriLine}>Please Verify</Text>
                  <Text style={{fontSize:Utils.textSize, marginTop:20, marginHorizontal:10, textAlign:'center'}}>To withdraw your funds, please enter authentication code that you have received on your registered email address.</Text>
                  <Text style={{fontSize:Utils.headSize, fontWeight:'bold', marginTop:10}}>Submit Email OTP</Text>
                  <View style={{flexDirection:'row', marginTop:20}}>
                    <TextInput
                      style={this.state.validOtp ? Styles.borderBody : [Styles.borderBody, {borderColor:Utils.colorRed, borderWidth:2}]}
                      placeholder='******'
                       maxLength={6}
                       value={this.state.otp}
                       onChangeText={(text) => { this.setState({otp:text}); if(text.length===6){this.setState({validOtp:true})}else this.setState({validOtp:false})}}
                       keyboardType={'numeric'}
                      />
                  </View>
                  <View style={{flexDirection:'row', marginBottom:20}}>
                    <TouchableHighlight underlayColor='none' onPress={()=>this.verifyOtp()} style={Styles.submit}>
                        <Text>OK</Text>
                    </TouchableHighlight>
                    {/* <TouchableHighlight underlayColor='none' onPress={()=>this.sendBTC()} style={Styles.submit}>
                      <Text>Resend</Text>
                    </TouchableHighlight> */}
                  </View>

                  </View>
                </View>
              </Modal>
              )}
      </ImageBackground>
      </View>
    );
  }
}
