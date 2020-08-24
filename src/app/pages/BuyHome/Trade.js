

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Picker, CheckBox, AsyncStorage, BackHandler
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import Utils from '../Utils';
import WebAPi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import HTML from 'react-native-render-html';
import {socket} from '../../Common/WebApi';

export default class BuyTrade extends Component {


  constructor(props) {
    super(props);
      this.state={
        tradeId:'',
        _id:'', myName:'',
        role:'',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        paymentMethod:'', userName:'', tradeLimit:'', priceBtc:'', currency:'', location:'', paymentWindow:'', minLimit:0, maxLimit:0, terms:'',
        amount:'', validAmount:true, inputBtc:'', BTC:''
      }

      this.stopLoading=this.stopLoading.bind(this);
      this.getTrade=this.getTrade.bind(this);
      this.handleBack=this.handleBack.bind(this);
   }

   componentDidMount=async()=>{
     BackHandler.addEventListener('hardwareBackPress', this.handleBack);
     const tradeId = this.props.navigation.getParam('id', '1');
     const _id = await AsyncStorage.getItem(Utils._id);
     const userName = await AsyncStorage.getItem(Utils.userName);
     this.setState({tradeId:tradeId, _id:_id, myName:userName});
     this.getTrade(tradeId);
   }

   componentWillUnmount(){
     BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
   }

   handleBack(){
     this.props.navigation.goBack(null);
   }

   stopLoading(){
     this.setState({loading:false});
   }

   getTrade=async(tradeId)=>{
     this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'})
         // console.log('detail_trade/'+id)
         await WebAPi.getApi_trade('detail_trade/'+tradeId)
          .then(response => response.json())
            .then(json => {
               this.setState({loading:false});
                 // console.log('Response from tradeDetails===>', json);
                    if(json.responseCode==200){
                        // console.log('Modified json=====>', json.result)
                        if(json.result!=null)
                            this.setState({
                              paymentMethod:json.result.payment_method,
                              userName:json.result.user_name,
                              minLimit:json.result.min_transaction_limit,
                              maxLimit:json.result.max_transaction_limit,
                              currency:json.result.currency_type,
                              location:json.result.location,
                              paymentWindow:json.result.payment_time+' Min',
                              priceBtc:parseFloat(json.result.price_equation).toFixed(2),
                              terms:json.result.terms_of_trade,
                            });
                          else
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Something went wrong with this trade!'});
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                  console.log('error==>' , error)
                  this.setState({loading:true,
                                loadingTitle:'Alert',
                                loadingMessage:'Opps! '+error,
                      })
          });
   }
  
  openProfile(){
    this.props.navigation.navigate('UserDetails', {role:'user'})
  }

  validateAmount=async(amount)=>{
    
    this.setState({amount:amount, BTC:''});

    if(this.state.minLimit-1<amount && this.state.maxLimit+1>amount){
          const temp = parseInt(amount);
          var divided = temp/this.state.priceBtc;
          const btc = String(divided.toFixed(8));
          console.log('calculations==> price:', this.state.priceBtc, 'BTC==>', btc)
          this.setState({validAmount:true, BTC:btc});
    }else
      await this.setState({validAmount:false})
  }


  validateBtc=async(btc)=>{
    this.setState({BTC:btc, amount:''});
          const temp = parseInt(btc);
          var divided = temp*this.state.priceBtc;
          const amount = String(divided);
          this.setState({amount:amount, validAmount:true});
  }

  sendTradeRequest=async()=>{
    if(this.state.amount!==NaN && this.state.amount!=='' && this.state.amount!==0 && this.state.validAmount){
         this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Sending...'})
          const body = JSON.stringify({
                          adId:this.state.tradeId,
                          amount_in_currency:this.state.amount,
                          amount_of_cryptocurrency:this.state.BTC,
                          userId:this.state._id
                        })
          await WebAPi.postApi_trade('tradeExchangeRequest', body)
           .then(response => response.json())
              .then(json => {
                 this.setState({loading:false});
                   // console.log('Response from send request===>', json);
                      if(json.responseCode==200){
                          console.log('Modified json=====>', json.result);
                          var msg = "Buy trade request from " + json.result.trade_owner_name;
                          if(this.state.role=='Sell')
                            msg = "Sell trade request from " + json.result.trade_owner_name;

                          socket.emit('sendMessage', {
                            // receiverId: this.state.receiverId.toString(),
                            receiverId: [json.addOwnerId],
                            senderId: this.state._id.toString(),
                            senderName:json.result.trade_owner_name,
                            message: msg,
                            tradeId: json.result._id,
                            image: null,
                            notificationType: "chat",
                            type: "GROUP",
                            requestType: 'TRADE'
                          })
                          this.props.navigation.replace('SingleTrade', {tradeId:json.result._id});
                      }else{
                        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                      }
                  })
                  .catch(error => {
                    console.log('error==>' , error)
                    this.setState({loading:true,
                                  // loadingTitle:'Alert',
                                  loadingMessage:'Opps! '+error,
                        })
            });

    }else{
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Enter Valid Amount/BTC'})
    }
  }



  render() {
      const role = this.props.navigation.getParam('role', 'Buy');
        if(this.state.role!=role){
            this.setState({role:role});
         }

    return (
      <View style={Styles.body}>
       <Header title={this.state.role+' Bitcoin'} menuCheck="false" data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={Styles.container}>
            <View style={[Styles.itemBody, {marginTop:10}]}>
              <View style={Styles.row}>
                <Text style={Styles.tradeTextBold}>Payment Mode:</Text>
                <Text style={Styles.tradeText}>{this.state.paymentMethod}</Text>
                </View>
              <View style={Styles.row}>
                <Text style={Styles.tradeTextBold}>User:</Text>
                <Text style={Styles.tradeText}>{this.state.userName}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.tradeTextBold}>Trade Limts:</Text>
                <Text style={Styles.tradeText}>{this.state.minLimit} - {this.state.maxLimit}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.tradeTextBold}>Price/BTC:</Text>
                <Text style={Styles.tradeText}>{this.state.priceBtc}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.tradeTextBold}>currency type:</Text>
                <Text style={Styles.tradeText}>{this.state.currency}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.tradeTextBold}>Location:</Text>
                <Text style={Styles.tradeText}>{this.state.location}</Text>
              </View>
              <View style={Styles.row}>
                <Text style={Styles.tradeTextBold}>Payment window:</Text>
                <Text style={Styles.tradeText}>{this.state.paymentWindow}</Text>
              </View>
              <Text style={Styles.heading}>{this.state.role=='Buy' ? 'How much you want to buy?' : 'How may you wish to sell?'}</Text>
                <View style={Styles.row}>
                  <View style={[Styles.row, this.state.validAmount ? Styles.amountView : Styles.amountViewError]}>
                    <TextInput style={Styles.amountInput}
                      placeholder="0.00"
                      value={this.state.amount}
                      onChangeText={(amount)=>this.validateAmount(amount)}
                      keyboardType={'numeric'}
                     />
                    <View style={Styles.amountButton}>
                      <Text>{this.state.currency}</Text>
                    </View>
                  </View>
                  <View style={[Styles.row, Styles.amountView]}>
                    <TextInput style={Styles.amountBtc}
                      placeholder="0.00 BTC"
                      value={this.state.BTC}
                      onChangeText={(btc)=>this.validateBtc(btc)}
                      keyboardType={'numeric'}
                      />
                  </View>
                </View>
                {this.state.validAmount==false && (
                  <Text style={Styles.note}>Amount should be between min and max limit.</Text>
                )}
                <TouchableHighlight underlayColor='none' onPress={()=>{this.sendTradeRequest()}}>
                  <View style={Styles.submitButton}>
                    <Text style={{fontSize:Utils.subHeadSize}}>SEND TRADE REQUEST</Text>
                  </View>
                </TouchableHighlight>
            </View>
            <View style={[Styles.itemBody, {marginTop:0, marginBottom:20, paddingHorizontal:20}]}>
              <Text style={Styles.heading}>Terms of trade with {this.state.userName}</Text>
              <View style={Styles.longText}>
                <HTML html={this.state.terms} imagesMaxWidth={Dimensions.get('window').width}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}