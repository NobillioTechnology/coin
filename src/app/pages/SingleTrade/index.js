import React, { Component } from 'react';
import {
  Text, View, TextInput, Image, ScrollView, TouchableHighlight, BackHandler, Modal, Dimensions, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import CountDown from 'react-native-countdown-component';
import WebApi from '../../Common/WebApi';
import {socket} from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import RadioForm from 'react-native-simple-radio-button';
import HTML from 'react-native-render-html';
import ImagePicker from 'react-native-image-picker';
import Footer from '../Footer';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var radio_props = [
  {label: 'Incorrect trade amount', value: 'Incorrect trade amount' },
  {label: 'Seller did not respond', value: 'Seller did not respond' },
  {label: 'Trade terms did not match', value: 'Trade terms did not match' },
  {label: 'Reason not listed', value: 'Reason not listed' },
];

var radioForFeed = [
  {label: 'Positive   ', value: 'positive' },
  {label: 'neutral   ', value: 'neutral' },
  {label: 'negative', value: 'negative' }
];


export default class SingleTrade extends Component {


  constructor(props) {
    super(props);

      this.state={
        _id:'',
        title:'Trade',
        status:'pending',
        timer: 120,
        timerState:false,
        tradeId:'',
        loading:true,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        uniqueTradeId:'', selling:'', amount:'', currency:'', adId:'', paymentMethod:'', exchangeRate:'', tradeStatus:'', disputReason:'',
        remainingTime:0, ad_id:'', paidStatus:false, tradeOwner:'', myName:'', terms:'', shownTerms:false,
        sellerId:'', tradeType:'', receiverId:'', chats:[],
        cancelModal:false, reason:'Incorrect trade amount', customReason:false, validCustomReason:true, dispute:false,
        fileData:'',fileName:'Upload', selectImage:false, reasonD:false, disputeReason:'', validDisputReason:true,
        imageMode:false,
        paidButton:true, ownerId:'', 
        feedType:'positive', feedbackMsg:'', feedbackForm:false,
      }
      this.startTimer=this.startTimer.bind(this);
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
   }

   componentDidUpdates=async()=>{
    await socket.connect();
    // await socket.emit('initChat',{userId:this.state._id});
   }

   refineBtc(btc){
    // console.log(btc);
    const dot = btc.indexOf('.');
    var beforeDot = btc.substring(0, dot);
    var afterDot = btc.substring(dot, btc.length);
    beforeDot = beforeDot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return beforeDot+afterDot;
  }
   componentDidMount=async()=>{
     BackHandler.addEventListener('hardwareBackPress', this.handleBack);
     const tradeId = this.props.navigation.getParam('tradeId', '1');
     await this.setState({tradeId:tradeId, _id:await AsyncStorage.getItem(Utils._id)});
     await socket.connect();
    //  await socket.on('connect', () => {
    //  console.log("socket connected")
     await socket.emit('initChat',{userId:this.state._id})
    //  })

     await this.getChatHistory();
     console.log('Trade id from privious=====>', tradeId);
     await this.getTradeDetails(tradeId);
        if(this.state.tradeType=='buy')
          this.setState({receiverId:this.state.buyerId});
        else
         this.setState({receiverId:this.state.sellerId})

    // if(this.props.navigation.getParam('from', 'trade')=='noti'){

    //   console.log('recId====>', this.props.navigation.getParam('recId', ''));
    //   console.log('senId====>', this.props.navigation.getParam('senId', ''));
    //   console.log('tradeId====>', this.props.navigation.getParam('tradeId', ''));
    //   socket.emit('currentlyChatting', {
    //     // receiverId: this.state.receiverId.toString(),
    //     receiverId: this.props.navigation.getParam('recId', ''),
    //     senderId: this.props.navigation.getParam('senId', ''),
    //     tradeId: this.state.tradeId,
    //     //  notificationType:"chat",
    //      type:'GROUP'

    // })
    // }

      socket.on('receivemessage', (res) => {
            // alert("hello")
            console.log('response from receive msg====>', res.message);
            this.getChatHistory();
            this.getTradeDetails(this.state.tradeId);
      });
      socket.on('reloadPage',(resp)=>{
        console.log('result from socket page reload====>',resp.result);
              this.getTradeDetails(this.state.tradeId);
      })

      socket.on('connect_error', (err) => {
      console.log(err)
    })

    socket.on('disconnect', () => {
      console.log("Disconnected Socket!");
      socket.connect();
    })
 
   }

   componentWillUnmount(){
     BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
   }

   handleBack(){
     if(this.props.navigation.getParam('from')=='all'){
        this.props.navigation.replace('AllTrade', {'refresh':true});
        return true;
     }else if(this.props.navigation.getParam('from')=='noti'){
        this.props.navigation.navigate('Notification', {'from':'trade'});
        return true;
     }
     else{
       this.props.navigation.goBack(null);
       return true;
     }
   }

   stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }

   getChatHistory=async()=>{
    // await socket.emit('initChat',{userId:this.state._id})
     const body = JSON.stringify({
                tradeId: this.state.tradeId,
                userId: this.state._id
              });
      await WebApi.postApi_trade('chatHistory', body)
      .then(response => response.json())
      .then(json => {
          //  console.log('Response from chat History===>', json);
              if(json.responseCode==200){
                this.setState({chats:json.result});
              }else{
                  this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                }
      })
      .catch(error => {
        console.log('error==>' , error)
        this.setState({loading:true,
                      loadingTitle:'Alert',
                      loadingMessage:'Oops! Internal Server Error!',
            })
      })
    }

    sendMessage=async()=>{
      // await socket.emit('initChat',{userId:this.state._id})
      if(this.state.fileData!='' && this.state.selectImage){
        if(this.state.message=='')
        await this.setState({message:' '});
        await this.setState({loader:true});
        await socket.emit('sendMessage', {
          receiverId: this.state.receiverId,
          senderId: this.state._id,
          message: this.state.message,
          tradeId: this.state.tradeId,
          image: this.state.fileData,
          senderName:this.state.myName,
          notificationType: "chat",
          type: "GROUP"
        })

      }
      else if(this.state.message!=''){
          await this.setState({loader:true});
          const body = {
              receiverId:this.state.receiverId,
              senderId: this.state._id,
              message: this.state.message,
              tradeId: this.state.tradeId,
              //image: null,
              senderName:this.state.myName,
              notificationType: "chat",
              type: "GROUP"
            }
          await socket.emit('sendMessage', body);
        // alert(body);
        }
        await this.getChatHistory();
        this.setState({loader:false, message:'', fileData:'', fileName:'Upload'});

    }

    sendFeedback=async()=>{
      this.setState({loader:true});
      const body = JSON.stringify({
        feedbackFrom:this.state._id,
        feedbackTo:this.state.ownerId,
        feedbackType:this.state.feedType,
        tradeId:this.state.tradeId
      })
await WebApi.postApi_feedback('addFeedback', body)
.then(response => response.json())
.then(json => {
  this.setState({paidButton:true});
    console.log('Response from feedback===>', json);
       if(json.responseCode==200){
           // console.log('Modified json=====>', json.result)
           if(json.result!==null){
             this.setState({feedbackForm:false, loading:true, loadingTitle:'Success', loadingMessage:json.responseMessage});
           }
       }else{
         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
       }
   })
   .catch(error => {
     console.log('error==>' , error)
     this.setState({loading:true,
                   loadingTitle:'Alert',
                   loadingMessage:'Oops! Internal Server Error!',
         })
    });

    }

   getTradeDetails=async(tradeId)=>{
     const body = JSON.stringify({
                     tradeId:tradeId,
                   })
        //  console.log(tradeId);
         await WebApi.postApi_trade('treadeDetails', body)
          .then(response => response.json())
            .then(json => {
               this.setState({loading:false});
                //  console.log('Response from tradeDetails===>', json.result);
                    if(json.responseCode==200){
                        if(json.result!==null){
                          var selling = json.result.amount_of_cryptocurrency;
                          selling= Number.parseFloat((selling=='') ? 0 : selling).toFixed(8);

                          var ownerId = json.result.seller[0].seller_id;
                          if(json.result.trade_type=='sell')
                            ownerId = json.result.buyer[0].buyer_id;

                          this.setState({
                            timer:json.result.payment_window_time,
                            uniqueTradeId:json.result.uniqueId,
                            selling:selling,
                            amount:json.result.amount_in_currency,
                            currency:json.result.currency_type,
                            adId:json.result.addUniqueId,
                            paymentMethod:json.result.payment_method,
                            exchangeRate:parseFloat(json.result.exchangeRate).toFixed(2),
                            tradeStatus:json.result.status,
                            remainingTime:json.result.remainingPaymentTime,
                            ad_id:json.result.advertisement_id,
                            paidStatus:json.result.paid_status,
                            tradeOwner:json.result.advertisement_owner_name,
                            myName:json.result.trade_owner_name,
                            sellerId:json.result.seller[0].seller_id,
                            buyerId:json.result.buyer[0].buyer_id,
                            tradeType:json.result.trade_type,
                            disputReason:json.result.disputeReason,
                            ownerId:ownerId,
                          });
                          if(parseInt(json.result.remainingPaymentTime)>0){
                            this.startTimer(this.state.remainingTime);
                            // alert(json.result.remainingPaymentTime);
                          }
                        }
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
          .catch(error => {
            console.log('error==>' , error)
            this.setState({loading:true,
                          loadingTitle:'Alert',
                          loadingMessage:'Oops! Internal Server Error!',
                })
          });
         await WebApi.getApi_trade('detail_trade/'+this.state.ad_id)
          .then(response => response.json())
            .then(json => {
               this.setState({loading:false});
                //  console.log('Response from tradeDetails==2====>', json);
                    if(json.responseCode==200){
                        this.setState({terms:json.result.terms_of_trade});
                        // alert(this.state.terms);
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
          .catch(error => {
            console.log('error==>' , error)
            this.setState({loading:true,
                          loadingTitle:'Alert',
                          loadingMessage:'Oops! Internal Server Error!',
                })
          });
        }

   havePaid=async()=>{
      if(this.state.paidButton){
         this.setState({loading:true, paidButton:false});
         const body = JSON.stringify({
                     advertisementId:this.state.ad_id,
                     notificationType:'ihavepaid',
                     paid_status:true,
                     request_status:'Paid',
                     status:'PAID',
                     tradeId:this.state.tradeId
                   })
         await WebApi.postApi_trade('iHavePaidTrade', body)
          .then(response => response.json())
            .then(json => {
               this.setState({paidButton:true});
                 console.log('Response from havePaid===>', json);
                    if(json.responseCode==200){
                        // console.log('Modified json=====>', json.result)
                        if(json.result!==null){
                          this.setState({
                            timer:json.result.payment_window_time,
                            uniqueTradeId:json.result.uniqueId,
                            selling:json.result.amount_of_cryptocurrency,
                            amount:json.result.amount_in_currency,
                            currency:json.result.currency_type,
                            adId:json.result.addUniqueId,
                            paymentMethod:json.result.payment_method,
                            exchangeRate:json.result.exchangeRate,
                            tradeStatus:json.result.status,
                            remainingTime:json.result.remainingPaymentTime,
                            ad_id:json.result.advertisement_id,
                            paidStatus:json.result.paid_status,
                            tradeOwner:json.result.advertisement_owner_name,
                            myName:json.result.trade_owner_name
                          });
                          this.startTimer(this.state.remainingTime);
                          var name = this.state.myName;
                          if(this.state.tradeType=='sell')
                            name=this.state.tradeOwner;
                          socket.emit('sendMessage', {
                            // receiverId: this.state.receiverId.toString(),
                            receiverId: [`${this.state.receiverId}`],
                            senderId: this.state._id.toString(),
                            message: "Paid request successfully from " + name,
                            tradeId: this.state.tradeId,
                            image: null,
                            notificationType: "",
                            senderName:this.state.myName,
                            type: "GROUP"
                        })
                        }
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                  console.log('error==>' , error)
                  this.setState({loading:true,
                                loadingTitle:'Alert',
                                loadingMessage:'Oops! Internal Server Error!',
                      })
                 });
        }
   }

   releaseBTC(){
       this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Releasing...'});
       console.log('trade id====>', this.state.ad_id);
        var body = JSON.stringify({
            "tradeId": this.state.tradeId,
            "received_status": "true",
            "request_status": "Complete",
            "status": "COMPLETE"
        })
        WebApi.postApi_trade('paymentReceived', body)
          .then(response => response.json())
            .then(json => {
              //  this.setState({loading:false});
                 console.log('Response from releaseBTC===>', json);
                    if(json.responseCode==200){
                        // console.log('Modified json=====>', json.result)
                        var name = this.state.tradeOwner;
                        if(this.state.tradeType=='sell')
                          name = this.state.myName;
                        if(json.result!==null){
                          socket.emit('sendMessage', {
                            receiverId: [`${this.state.receiverId}`],
                            senderId: this.state._id.toString(),
                            message: "BTC is released from " + name,
                            tradeId: this.state.tradeId,
                            image: null,
                            notificationType: "",
                            senderName:this.state.myName,
                            type: "GROUP"
                        });
                        // this.getTradeDetails(this.tradeId);

                        }
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                  console.log('error==>' , error)
                  this.setState({loading:true,
                                loadingTitle:'Alert',
                                loadingMessage:'Oops! Internal Server Error!',
                      })
          });
    }

  cancelTrade=async()=>{
    if(this.state.paidButton){
        this.setState({paidButton:false, cancelModal:false, loading:true, loadingTitle:'Please Wait', loadingMessage:'Cancelling...'});
        const body = JSON.stringify({
                      advertisementId:this.ad_id,
                      reason:this.state.reason,
                      tradeId:this.state.tradeId
                    });
        await WebApi.postApi_trade('cancelTrade', body)
        .then(response => response.json())
            .then(json => {
               this.setState({paidButton:true});
                 console.log('Response from havePaid===>', json);
                    if(json.responseCode==200){
                        // console.log('Modified json=====>', json.result)
                        if(json.result!==null){
                          this.getTradeDetails(this.state.tradeId);
                          socket.emit('sendMessage', {
                            receiverId: this.state.receiverId.toString(),
                            // receiverId: [`${this.state.receiverId}`],
                            senderId: this.state._id.toString(),
                            message: 'Trade is cancelled from ' + this.state.myName,
                            tradeId: this.state.tradeId,
                            image: null,
                            notificationType: "",
                            senderName:this.state.myName,
                            type: "GROUP"
                        });
                        // this.props.navigation.goBack(null);
                        }
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                  console.log('error==>' , error)
                  this.setState({loading:true,
                                loadingTitle:'Alert',
                                loadingMessage:'Oops! Internal Server Error!',
                      });
                })
    }else
      this.setState({validCustomReason:false});
  }

   startTimer=async(ms)=>{
     if(this.state.timerState!=true){
        await this.setState({timerState:true, timer:ms});
      }
   }
   onTimeOut(){
    this.setState({timerState:false});
    this.getTradeDetails(this.state.tradeId);
    if(this.state.paidStatus)
      this.setState({dispute:true});
      // alert('Time out');
   }
   launchImageLibrary = () => {
      let options = {
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
          console.log('response', JSON.stringify(response.fileName));
          this.setState({
            filePath: response,
            fileData: 'data:image/jpeg;base64,'+response.data,
            fileUri: response.uri,
            fileName:response.fileName,
            selectImage:true,
          });
          console.log('fileData======================>', this.state.fileData.substring(this.state.fileData.length-50, this.state.fileData.length));
        }
      });

  }

  dispute=async()=>{
    if(this.state.disputeReason!='' && this.state.paidButton){
      this.setState({paidButton:false, reasonD:false, loading:true, loadingTitle:'Please Wait', loadingMessage:'Disputing...'});
      const body = JSON.stringify({
        disputeReason:this.state.disputeReason,
        dispute_status:'true',
        notificationType:'dispiteTrade',
        request_status: "Dispute",
        status: "DISPUTE",
        tradeId:this.state.tradeId
      });
        await WebApi.postApi_trade('disputeTrade', body)
        .then(response => response.json())
        .then(json => {
        this.setState({paidButton:true});
          console.log('Response from dispute===>', json);
          if(json.responseCode==200){
                  // console.log('Modified json=====>', json.result)
                  socket.emit('sendMessage', {
                    // receiverId: this.state.receiverId.toString(),
                    receiverId: [`${this.state.receiverId}`],
                    senderId: this.state._id.toString(),
                    message: 'Trade is disputed from ' + this.state.myName+' '+this.state.disputeReason,
                    tradeId: this.state.tradeId,
                    image: null,
                    notificationType: "",
                    senderName:this.state.myName,
                    type: "GROUP"
                });
                    this.assignToAdmin(this.tradeId);
                    // this.getTradeDetails(this.state.tradeId);
              }else{
                this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
              }
          })
          .catch(error => {
            console.log('error==>' , error)
            this.setState({loading:true,
                          loadingTitle:'Alert',
                          loadingMessage:'Oops! Internal Server Error!',
                });
          })

    }else
      this.setState({validDisputReason:false});
  }

  assignToAdmin=async(id)=>{
    const body = JSON.stringify({tradeId:id});
    await WebApi.postApi_escrow('assignTradeToManager', body);
  }

  render() {

    return (
      <View style={Styles.body}>
       <Header title={this.state.title} menuCheck="false" data={this.props} style={Styles.header} handleBack={this.handleBack}/>
       <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
        <ScrollView style={{flex:1}} keyboardShouldPersistTaps={'always'}>
          <View style={Styles.container}>
            <View style={{marginBottom:15, backgroundColor:Utils.colorWhite}}>
              <Text style={[Styles.heading, {alignSelf:'center', width:'90%'}]}>Trade ID {this.state.uniqueTradeId} :{this.state.ownerId==this.state._id ? 'Selling' : 'Buying'} {this.state.selling} bitcoins for {this.state.amount} {this.state.currency}</Text>
              <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Buying from advertisement {this.state.adId} with ({this.state.currency}) at the exchange rate of {this.refineBtc(this.state.exchangeRate)} {this.state.currency}/BTC</Text>
              <View style={[Styles.borderView, {flexDirection:'row'}]}>
                <Text style={Styles.itemlebalBold}>Trade Status: </Text>
                {this.state.tradeStatus=='PENDING' && (
                  <Text style={{color:Utils.colorOrange, textDecorationLine:'underline', fontWeight:'bold'}}>{this.state.tradeStatus}</Text>
                )}
                {this.state.tradeStatus=='CANCEL' && (
                  <Text style={{color:Utils.colorRed, textDecorationLine:'underline', fontWeight:'bold'}}>{this.state.tradeStatus}</Text>
                )}
                {this.state.tradeStatus=='COMPLETE' && (
                  <Text style={{color:Utils.colorBlue, textDecorationLine:'underline', fontWeight:'bold'}}>{this.state.tradeStatus}</Text>
                )}
                {this.state.tradeStatus=='PAID' && (
                  <Text style={{color:Utils.colorGreen, textDecorationLine:'underline', fontWeight:'bold'}}>{this.state.tradeStatus}</Text>
                )}
                {this.state.tradeStatus=='DISPUTE' && (
                  <Text style={{color:Utils.colorOrange, textDecorationLine:'underline', fontWeight:'bold'}}>{this.state.tradeStatus}</Text>
                )}
              </View>
              {/* {this.state.tradeStatus=='DISPUTE' && (
                <View style={{flexDirection:'row', width:'90%', alignSelf:'center', alignItems:'center', marginBottom:10}}>
                  <Text style={Styles.itemlebalBold}>Dispute Reason: </Text>
                  <Text style={[Styles.subHeading, {marginTop:0}]}>{this.state.disputReason}</Text>
                </View>
              )} */}
              </View>
              {(() => {
                if(this.state.tradeStatus === 'PAID' || this.state.tradeStatus ==='PENDING'){
                  return(
                      <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                        <Text style={[Styles.heading, {marginTop:20}]}>Payment Confirmation</Text>
                            {this.state.tradeType=='sell' ? (
                              <View>
                                  {this.state.paidStatus===false ? (
                                    <View>
                                     {this.state._id==this.state.sellerId ? (
                                       <View>
                                        <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Only click the "Release Btc" button when you are sure you have received the payment from the buyer. As clicking this button will immediately transfer bitcoin from escrow to the buyer's wallet. Once Bitcoins are released, it cannot be taken back or reversed.</Text>
                                        <TouchableHighlight underlayColor='none' onPress={()=>this.releaseBTC()}>
                                          <View style={[Styles.borderView, Styles.buttonGreen]}>
                                            <Text style={Styles.buttonGreen}>Release BTC</Text>
                                          </View>
                                        </TouchableHighlight>
                                        </View>
                                       ):(
                                        <View>
                                          <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Once you have made payment make sure you click on "I have paid" button. Otherwise the trade will get timed out and gets cancelled automatically and bitcoins will return to the vendor.</Text>
                                          <TouchableHighlight underlayColor='none' onPress={()=>this.havePaid()}>
                                            <View style={[Styles.borderView, Styles.buttonGreen]}>
                                              <Text style={Styles.buttonGreen}>I have paid</Text>
                                            </View>
                                          </TouchableHighlight>
                                          <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                                          <Text style={[Styles.heading, {marginTop:20}]}>Having Trading issue?</Text>
                                          <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can always cancel the trade if it was started by mistake, or if you don't meet the requirements mentioned in the trade instructions.</Text>
                                        
                                          <TouchableHighlight style={[Styles.borderView, Styles.buttonRed, {backgroundColor:Utils.colorRed}]} onPress={()=>this.cancelTrade()}>
                                            <Text style={[Styles.buttonRed, {}]}>Cancel Trade</Text>
                                          </TouchableHighlight>
                                        </View>
                                      </View>
                                        )}
                                    </View>
                                    ):(
                                      <View>
                                      {this.state._id==this.state.sellerId ? (
                                        <View>
                                          <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Only click the "Release Btc" button when you are sure you have received the payment from the buyer. As clicking this button will immediately transfer bitcoin from escrow to the buyer's wallet. Once Bitcoins are released, it cannot be taken back or reversed.</Text>
                                          <TouchableHighlight underlayColor='none' onPress={()=>this.releaseBTC()}>
                                            <View style={[Styles.borderView, Styles.buttonGreen]}>
                                             <Text style={Styles.buttonGreen}>Release BTC</Text>
                                            </View>
                                          </TouchableHighlight>
                                          {!this.state.timerState && (
                                            <View style={{marginTop:0}}>
                                              <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can report a dispute if you think your trade partner is not paying you or replying you. Some payment methods might take several days to confirm payment. Please open dispute if you have made the payment and there is an issue from your partner.</Text>
                                              <TouchableHighlight style={[Styles.borderView, Styles.buttonRed]} underlayColor='none' onPress={()=>this.setState({reasonD:true})}>
                                                <Text style={{color:Utils.colorWhite}}>Dispute</Text>
                                              </TouchableHighlight>
                                            </View>
                                            )}
                                        </View>
                                        ):(
                                        <View>
                                            {!this.state.timerState ? (
                                              <View>
                                                  <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can report a dispute if you think your trade partner is not paying you or replying you. Some payment methods might take several days to confirm payment. Please open dispute if you have made the payment and there is an issue from your partner.</Text>
                                                  <TouchableHighlight style={[Styles.borderView, Styles.buttonRed]} underlayColor='none' onPress={()=>this.setState({reasonD:true})}>
                                                    <Text style={Styles.buttonRed}>Dispute</Text>
                                                  </TouchableHighlight>
                                              </View>
                                            ):(
                                            <View>
                                              <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Once you have made payment make sure you click on "I have paid" button. Otherwise the trade will get timed out and gets cancelled automatically and bitcoins will return to the vendor.</Text>
                                              <TouchableHighlight style={[Styles.borderView, Styles.buttonGreen]} underlayColor='none'>
                                                <Text style={Styles.buttonGreen}>Paid</Text>
                                              </TouchableHighlight>                                              
                                            </View>
                                            )}
                                              <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                                                <Text style={[Styles.heading, {marginTop:20}]}>Having Trading issue?</Text>
                                                <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can always cancel the trade if it was started by mistake, or if you don't meet the requirements mentioned in the trade instructions.</Text>
                                              
                                                <TouchableHighlight style={[Styles.borderView, Styles.buttonRed, {backgroundColor:Utils.colorRed}]} onPress={()=>this.cancelTrade()}>
                                                  <Text style={[Styles.buttonRed, {}]}>Cancel Trade</Text>
                                                </TouchableHighlight>
                                              </View>
                                        </View>
                                         )}
                                     </View>
                                   )}
                                </View>
                            ):(
                                <View>
                                  {this.state.paidStatus===false ? (
                                    <View>
                                     {this.state._id!=this.state.buyerId ? (
                                       <View>
                                        <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Only click the "Release Btc" button when you are sure you have received the payment from the buyer. As clicking this button will immediately transfer bitcoin from escrow to the buyer's wallet. Once Bitcoins are released, it cannot be taken back or reversed.</Text>
                                        <TouchableHighlight underlayColor='none' onPress={()=>this.releaseBTC()}>
                                          <View style={[Styles.borderView, Styles.buttonGreen]}>
                                            <Text style={Styles.buttonGreen}>Release BTC</Text>
                                          </View>
                                        </TouchableHighlight>
                                        </View>
                                       ):(
                                         <View>
                                         <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Once you have made payment make sure you click on "I have paid" button. Otherwise the trade will get timed out and gets cancelled automatically and bitcoins will return to the vendor.</Text>
                                         <TouchableHighlight underlayColor='none' onPress={()=>this.havePaid()}>
                                            <View style={[Styles.borderView, Styles.buttonGreen]}>
                                              <Text style={Styles.buttonGreen}>I have paid</Text>
                                            </View>
                                          </TouchableHighlight>
                                          <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                                              <Text style={[Styles.heading, {marginTop:20}]}>Having Trading issue?</Text>
                                              <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can always cancel the trade if it was started by mistake, or if you don't meet the requirements mentioned in the trade instructions.</Text>
                                            
                                              <TouchableHighlight style={[Styles.borderView, Styles.buttonRed, {backgroundColor:Utils.colorRed}]} onPress={()=>this.cancelTrade()}>
                                                <Text style={[Styles.buttonRed, {}]}>Cancel Trade</Text>
                                              </TouchableHighlight>
                                            </View>
                                          </View>
                                        )}
                                        
                                    </View>
                                    ):(
                                      <View style={{}}>
                                     {this.state._id!=this.state.buyerId ? (
                                        <View>
                                        <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Only click the "Release Btc" button when you are sure you have received the payment from the buyer. As clicking this button will immediately transfer bitcoin from escrow to the buyer's wallet. Once Bitcoins are released, it cannot be taken back or reversed.</Text>
                                          <TouchableHighlight underlayColor='none' onPress={()=>this.releaseBTC()}>
                                            <View style={[Styles.borderView, Styles.buttonGreen]}>
                                              <Text style={{}}>Release BTC</Text>
                                            </View>
                                          </TouchableHighlight>
                                          {!this.state.timerState && (
                                              <View style={{marginTop:0}}>
                                                <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can report a dispute if you think your trade partner is not paying you or replying you. Some payment methods might take several days to confirm payment. Please open dispute if you have made the payment and there is an issue from your partner.</Text>
                                                <TouchableHighlight style={[Styles.borderView, Styles.buttonRed]} underlayColor='none' onPress={()=>this.setState({reasonD:true})}>
                                                  <Text style={{color:Utils.colorWhite}}>Dispute</Text>
                                                </TouchableHighlight>
                                              </View>
                                          )}
                                         </View>
                                       ):(
                                        <View>
                                          {!this.state.timerState ? (
                                            <View>
                                              <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can report a dispute if you think your trade partner is not paying you or replying you. Some payment methods might take several days to confirm payment. Please open dispute if you have made the payment and there is an issue from your partner.</Text>
                                              <TouchableHighlight style={[Styles.borderView, Styles.buttonRed]} underlayColor='none' onPress={()=>this.setState({reasonD:true})}>
                                                <Text style={Styles.buttonRed}>Dispute</Text>
                                              </TouchableHighlight>
                                            </View>
                                            ):(
                                            <View>
                                              <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Once you have made payment make sure you click on "I have paid" button. Otherwise the trade will get timed out and gets cancelled automatically and bitcoins will return to the vendor.</Text>
                                              <View style={[Styles.borderView, Styles.buttonGreen]}>
                                                <Text style={Styles.buttonGreen}>Paid</Text>
                                              </View>
                                            </View>
                                          )}
                                            <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                                              <Text style={[Styles.heading, {marginTop:20}]}>Having Trading issue?</Text>
                                              <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can always cancel the trade if it was started by mistake, or if you don't meet the requirements mentioned in the trade instructions.</Text>
                                            
                                              <TouchableHighlight style={[Styles.borderView, Styles.buttonRed, {backgroundColor:Utils.colorRed}]} onPress={()=>this.cancelTrade()}>
                                                <Text style={[Styles.buttonRed, {}]}>Cancel Trade</Text>
                                              </TouchableHighlight>
                                            </View>
                                        </View>
                                        )}
                                      </View>
                                  )}
                                </View>
                            )}
                              {this.state.timerState==true && (
                                <View style={{alignSelf:'flex-start', marginLeft:20, marginTop:-15, marginBottom:10}}>
                                <CountDown
                                  until={this.state.timer+10}
                                  size={15}
                                  onFinish={() => {this.onTimeOut()}}
                                  digitStyle={{marginHorizontal:-5}}
                                  digitTxtStyle={{color: Utils.colorGreen, marginBottom:-20}}
                                  timeToShow={['D',':','H',':', 'M']}
                                  timeLabels={{d:'DD', h:'HH', m: 'MM'}}
                                  onChange={(time)=>{console.log(time)}}
                                />
                                </View>
                              )}
                       </View>
                      )}
                })()}
                {this.state.tradeStatus=='DISPUTE' && (
                   <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                      <Text style={[Styles.heading, {marginTop:20}]}>Payment Confirmation</Text>
                      <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Once you have made payment make sure you click on "I have paid" button. Otherwise the trade will get timed out and gets cancelled automatically and bitcoins will return to the vendor.</Text>
                      <TouchableHighlight underlayColor='none'>
                        <View style={[Styles.borderView, Styles.buttonRed,{backgroundColor:Utils.colorRed+33}]}>
                          <Text style={[Styles.buttonRed,{backgroundColor:'', color:Utils.colorRed}]}>Trade Disputed</Text>
                        </View>
                      </TouchableHighlight>
                  
                         <View>
                                {this.state._id==this.state.sellerId ? (
                                  <View>
                                    <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Once you have made payment make sure you click on "I have paid" button. Otherwise the trade will get timed out and gets cancelled automatically and bitcoins will return to the vendor.</Text>
                                    <TouchableHighlight underlayColor='none' onPress={()=>this.releaseBTC()}>
                                      <View style={[Styles.borderView, Styles.buttonGreen]}>
                                        <Text style={Styles.buttonGreen}>Release BTC</Text>
                                      </View>
                                    </TouchableHighlight>
                                  </View>
                                ):(
                                  <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                                    <Text style={[Styles.heading, {marginTop:20}]}>Having Trading issue?</Text>
                                    <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can always cancel the trade if it was started by mistake, or if you dont meet the requirements mentioned in the trade instructions.</Text>
                                  
                                    <TouchableHighlight style={[Styles.borderView, Styles.buttonRed, {backgroundColor:Utils.colorRed}]} onPress={()=>this.cancelTrade()}>
                                      <Text style={[Styles.buttonRed, {}]}>Cancel Trade</Text>
                                    </TouchableHighlight>
                                  </View>
                                )}
                           </View>

                  </View>
                )}
                {this.state.tradeStatus=='COMPLETE' && (
                  <View>
                    <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                        <Text style={[Styles.heading, {marginTop:20}]}>Payment Confirmation</Text>
                        <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>Once you have made payment make sure you click on "I have paid" button. Otherwise the trade will get timed out and gets cancelled automatically and bitcoins will return to the vendor.</Text>
                        <TouchableHighlight underlayColor='none'>
                          <View style={[Styles.borderView, Styles.buttonRed,{backgroundColor:Utils.colorBlue+33, borderColor:Utils.colorBlue}]}>
                            <Text style={[Styles.buttonRed,{backgroundColor:'', color:Utils.colorBlue}]}>Trade COMPLETED</Text>
                          </View>
                        </TouchableHighlight>
                    </View>
                    {this.state.feedbackForm && (
                      <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                        <Text style={[Styles.heading, {marginTop:20}]}>Please Leave a feedback for {this.state._id==this.state.ownerId ? this.state.myName : this.state.tradeOwner}</Text>
                        <RadioForm
                          radio_props={radioForFeed}
                          initial={0}
                          formHorizontal={false}
                          animation={true}
                          onPress={(value) => {this.setState({feedType:value})}}
                          borderWidth={1}
                          buttonColor={Utils.colorGreen}
                          selectedButtonColor={Utils.colorGreen}
                          buttonSize={10}
                          buttonOuterSize={25}
                          style={{alignSelf:'center', width:'90%', marginTop:10}}
                          labelStyle={{fontSize: Utils.subHeadSize+1}}
                        />
                        <TextInput
                          style={[Styles.borderView, {flex:0.8, marginTop:10, paddingLeft:10}]}
                          placeholder="Enter your feedback here (optional)"
                          onChangeText={(msg)=>this.setState({feedbackMsg:msg})}
                          value={this.state.feedbackMsg}
                          />
                        <TouchableHighlight underlayColor='none'
                            style={[Styles.submitButton, {flex:0.2, marginLeft:5}]} onPress={()=>this.sendFeedback()}>
                            {this.state.loader ? (<ActivityIndicator size={'small'} color={Utils.colorBlack}/>):(
                            <Text>Send</Text>
                            )}
                        </TouchableHighlight>
                      </View>
                      )}
                  </View>
                )}
                {this.state.tradeStatus=='CANCEL' && (
                  <View style={[Styles.itemBody, {marginTop:10, marginBottom:10}]}>
                    <Text style={[Styles.heading, {marginTop:20}]}>Having Trading issue?</Text>
                    <Text style={[Styles.subHeading, {alignSelf:'center', width:'90%'}]}>You can always cancel the trade if it was started by mistake, or if you don't meet the requirements mentioned in the trade instructions.</Text>
                   
                    <TouchableHighlight style={[Styles.borderView, Styles.buttonRed, {backgroundColor:Utils.colorRed+33}]}>
                      <Text style={[Styles.buttonRed, {backgroundColor:'', color:Utils.colorRed}]}>Trade cancelled</Text>
                    </TouchableHighlight>
                  </View>
                  )}
                    <View style={[Styles.itemBody, {marginTop:10, marginBottom:20}]}>
                      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text style={[Styles.heading, {flex:0.8, marginTop:-10}]}>Send message to {this.state._id==this.state.ownerId ? this.state.myName : this.state.tradeOwner}</Text>
                        <TouchableHighlight style={[Styles.borderView, Styles.submitButton, {borderWidth:0, width:'35%'}]}
                            onPress={()=>this.setState({shownTerms:true})}
                          >
                          <Text>Terms Of Trade</Text>
                        </TouchableHighlight>
                      </View>
                      <ScrollView style={{height:250}}
                      nestedScrollEnabled={true}
                      ref={ref => {this.scrollView = ref}}
                      onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                      >
                        {this.state.chats.map((item)=>{
                              var time = new Date(item.time).toString();
                              var date = time.substring(4, 21);
                          return (
                            <View>
                              {item.colorType == "ADMIN" && (
                                <View>
                                  <View style={[Styles.myMessage, {backgroundColor:'#F78971'}]}>
                                    <Text>{item.message}</Text>
                                  </View>
                                  <Text style={Styles.myMessageTime}>{date}</Text>
                                </View>
                              )}
                              {item.senderId==this.state._id ? (
                                <View>
                                  <View style={[Styles.myMessage]}>
                                    {item.image!=undefined ? (
                                      <TouchableHighlight onPress={()=>this.setState({imageMode:true, imageModeUri:item.image})}>
                                        <Image source={{uri:item.image}} style={{width:width/4, height:width/4}}/>
                                      </TouchableHighlight>
                                    ):(
                                    <Text>{item.message}</Text>
                                    )}
                                  </View>
                                  <Text style={Styles.myMessageTime}>{date}</Text>
                              </View>
                              ):(
                                <View style={{flexWrap:'wrap'}}>
                                  <View style={[Styles.otherMessage]}>
                                  {item.image!=undefined ? (
                                    <TouchableHighlight onPress={()=>this.setState({imageMode:true, imageModeUri:item.image})}>
                                      <Image source={{uri:item.image}} style={{width:width/4, height:width/4}}/>
                                    </TouchableHighlight>
                                    ):(
                                    <Text>{item.message}</Text>
                                    )}
                                  </View>
                                  <Text style={Styles.otherMessageTime}>{date}</Text>
                              </View>
                              )}
                            </View>
                          )
                        })}
                      </ScrollView>
                        <View style={{marginTop:10, flexDirection:'row', width:'90%', alignSelf:'center'}}>
                          <TextInput
                            style={[Styles.borderView, {flex:0.8, marginTop:0, paddingLeft:10}]}
                            placeholder="Enter your message here"
                            onChangeText={(msg)=>this.setState({message:msg})}
                            value={this.state.message}
                            />
                          <TouchableHighlight underlayColor='none'
                            style={[Styles.submitButton, {flex:0.2, marginLeft:5}]} onPress={()=>this.sendMessage()}>
                            {this.state.loader ? (<ActivityIndicator size={'small'}/>):(
                            <Text>Send</Text>
                            )}
                          </TouchableHighlight>
                        </View>
                      <TouchableHighlight underlayColor='none' style={[Styles.borderView, {alignItems:'flex-start'}]}
                        onPress={()=>this.launchImageLibrary()}
                      >
                        <View style={{width:'100%'}}>
                          <Text style={{marginLeft:20, marginRight:25}}>{this.state.fileName}</Text>
                          <Icon name='paperclip' style={{position:'absolute', right:10, fontSize:20}}/>
                        </View>
                      </TouchableHighlight>
                    </View>
            </View>
        </ScrollView>
        <Modal style={[Styles.dialogue]}
            visible={this.state.cancelModal}
            transparent={true}
            animationType={"fade"}
            onRequestClose={ () => { this.setState({cancelModal:false})}}>
               <View style={Styles.dialogue}>
                <View style={Styles.dialogueContainer}>
                    <Icon name='times' style={{position:'absolute', right:10, top:10, fontSize:20}} onPress={()=>this.setState({cancelModal:false})}/>
                    <Text style={Styles.dialogTitle}>Please select the reason for cancelling the trade</Text>
                      <View style={{width:'85%', flex:1, alignSelf:'center'}}>
                      <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={false}
                        animation={true}
                        onPress={(value) => {this.setState({reason:value, customReason:false}); if(value=='Reason not listed') this.setState({customReason:true, reason:''})}}
                        borderWidth={1}
                        buttonColor={Utils.colorGreen}
                        selectedButtonColor={Utils.colorGreen}
                        buttonSize={10}
                        buttonOuterSize={25}
                        style={{alignSelf:'center', marginTop:10}}
                        labelStyle={{fontSize: Utils.subHeadSize+1}}
                      />
                      {this.state.customReason && (
                      <TextInput
                        style={this.state.validCustomReason ? Styles.dialogueTextArea : Styles.dialogueTextAreaError}
                        value={this.state.reason}
                        onChangeText={(val)=>this.setState({reason:val, validCustomReason:true})}
                        multiline={true}
                        maxLine={9}
                        />
                        )}
                        <TouchableHighlight underlayColor='none' onPress={()=>this.cancelTrade()} style={Styles.dialogueSubmit}>
                          <Text style={{fontSize:Utils.headSize}}>Submit</Text>
                        </TouchableHighlight>
                      </View>
                </View>
              </View>
          </Modal>
          <Modal style={[Styles.dialogue]}
            visible={this.state.shownTerms}
            transparent={true}
            animationType={"fade"}
            onRequestClose={ () => { this.setState({shownTerms:false})}}>
               <View style={Styles.dialogue}>
                <View style={Styles.dialogueContainerTerms}>
                    <TouchableHighlight onPress={()=>this.setState({shownTerms:false})} style={{position:'absolute', right:20, top:10}}>
                      <Icon name='times' style={{fontSize:22}} onPress={()=>this.setState({shownTerms:false})}/>
                    </TouchableHighlight>
                    <Text style={Styles.dialogTitle}>Terms of Trade</Text>
                      <View style={{width:'85%', flex:1, alignSelf:'center'}}>
                        <HTML html={this.state.terms} imagesMaxWidth={Dimensions.get('window').width} style={Styles.longText}/>
                      </View>
                </View>
              </View>
          </Modal>
        
          <Modal style={[Styles.dialogue]}
            visible={this.state.reasonD}
            transparent={true}
            animationType={"fade"}
            onRequestClose={ () => { this.setState({reasonD:false})}}>
               <View style={Styles.dialogue}>
                <View style={Styles.dialogueContainerReason}>
                    <Icon name='close' style={{fontSize:24, color:Utils.colorBlack, position:'absolute', right:10, top:5}} onPress={()=>this.setState({reasonD:false})}/>
                    <Text style={Styles.dialogTitle}>Please Enter the reason for disputing the trade</Text>
                      <View style={{width:'85%', flex:1, alignSelf:'center'}}>
                        <TextInput style={this.state.validDisputReason ? Styles.textArea : Styles.textAreaError}
                          placeholder={'Enter Your Reason here'}
                          value={this.state.disputeReason}
                          onChangeText={(text)=>this.setState({disputeReason:text})}
                          multiline={true}
                        />
                      </View>
                      <TouchableHighlight style={[Styles.borderView, Styles.buttonGreen]} onPress={()=>this.dispute()}>
                          <Text>Submit</Text>
                      </TouchableHighlight>
                </View>
              </View>
          </Modal>
        
          <Modal style={[Styles.dialogue]}
            visible={this.state.imageMode}
            transparent={false}
            animationType={"fade"}
            onRequestClose={ () => { this.setState({imageMode:false})}}>
               <View style={Styles.dialogue}>
                <View style={Styles.dialogueContainerImage}>
                    <Icon name='close' style={{position:'absolute', right:20,top:10, fontSize:26, zIndex:999}} onPress={()=>this.setState({imageMode:false})}/>
                    <Image source={{uri:this.state.imageModeUri}} style={{width:width, height:height, resizeMode:'contain'}}/>
                </View>
              </View>
          </Modal>
          <Footer style={Styles.footer} navigation={this.props.navigation} selected={'Home'}/>
      </View>
    );
  }
}
