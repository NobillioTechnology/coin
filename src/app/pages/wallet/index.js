import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, BackHandler, Platform, ImageBackground, Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Footer from '../Footer';
import Utils from '../Utils';
import commonCss from '../Utils/commonCss';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import Adapter from './Adapter';
import SwipeToRefresh from 'react-native-pull-to-refresh';
import {socket} from '../../Common/WebApi';


const width = Dimensions.get('window').width;

export default class Wallet extends Component {

  constructor(props) {
    super(props);
      this.state={
        loading:true,
        loadingTitle:'Please Wait',
        loadingMessage:'Loading...',
        dataSource:[],
        _id:'',
        walletBalance:'', totalSend:'', totalReceive:'', totalWithdra:'',
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
        require('../../assets/img/bg2.jpg'),
        require('../../assets/img/bg3.jpg'),
        require('../../assets/img/bg4.jpeg'),
        require('../../assets/img/bg5.jpg'),
        require('../../assets/img/bg6.jpeg')],
        veri:'bg',
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
      this.handleScroll=this.handleScroll.bind(this);
      this.openTxn=this.openTxn.bind(this);
    }

   componentDidMount=async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
    if(color!==null){
      this.setState({vari:color});
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
     this.setState({_id:await AsyncStorage.getItem(Utils._id)});
     await this.getProfile();
     await this.getRecentTotal();
     await this.getTransactions();

     socket.emit('initChat',{userId:this.state._id});	  
     socket.emit('getUserBalance', {
      userId: this.state._id
    })
    
     socket.on('getUserBalance', (resp) => { 
			var num = Number(resp.balance);
			var n = num.toFixed(8);
			this.setState({ walletBalance: n });
      })  
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillReceiveProps=async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
        if(color!==null && color!=this.state.vari){
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
  }

  componentDidUpdate=async()=>{
    socket.connect();
  }

  handleBackButtonClick(){
    this.props.navigation.goBack(null);
    return true;
  }

   handleScroll(){
    const reactTag = this.refs.scrollView.getScrollableNode();
    NativeModules.ScrollViewManager.getContentOffset(reactTag, (offset) => {
    });
  }


  stopLoading(){
    if(this.state.loading)
      this.setState({loading:false});
  }

  getProfile=async()=>{
    const body = JSON.stringify({
                    _id:this.state._id,
                  })
    await WebApi.postApi_user('userProfile', body)
           .then(response => response.json())
                .then(json => {
                     console.log('Response from getProfile===>', json);
                        if(json.responseCode==200){
                            const data = json.result
                            this.setState({
                             walletBalance:parseFloat(json.result.btc.total).toFixed(8)
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

  getRecentTotal=async()=>{
    this.setState({loading:true});
    await WebApi.getApi_user('CountData/'+this.state._id)
           .then(response => response.json())
                .then(json => {
                     // console.log('Response from CountData===>', json);
                        if(json.responseCode==200){
                            if(json.result.length>0)
                            this.setState({
                              totalSend:json.result[0].sendAmount.toFixed(8),
                              totalReceive:json.result[0].reciveAmount.toFixed(8),
                              totalWithdra:json.result[0].withdrawAmount.toFixed(8),
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

  getTransactions=async()=>{
      const body = JSON.stringify({
                endDate:'',
                startDate:'',
                userId:this.state._id,
              })
      await WebApi.postApi_user('transactionList', body)
       .then(response => response.json())
            .then(json => {
                 // console.log('Response from transaction1111===>'+JSON.stringify(json));
                  this.setState({loading:false});
                    if(json.responseCode==200){
                        const data = json.result.docs
                        this.setState({
                         dataSource:data
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

  openTxn(txn){
    Linking.canOpenURL('https://live.blockcypher.com/btc/tx/'+txn).then(supported => {
      if (supported) {
        Linking.openURL('https://live.blockcypher.com/btc/tx/'+txn);
      }else{
        console.log("Something Went Wrong!");
      }
    });
  }
  

  render() {
    return (
      <View style={Styles.body}>
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title="Wallet" menuCheck="true" rightIcon={false} data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <SwipeToRefresh onRefresh={()=>this.componentDidMount()} style={Styles.swipe}>
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
              <View style={[commonCss.cardView, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow]}>
                <View style={Styles.rowView}>
                  <Text style={Styles.textLabelWallet}>Wallet Balance: </Text>
                  <Text style={Styles.textValueWallet}>{this.state.walletBalance}</Text>
                </View>
              </View>
                <View style={[commonCss.cardView, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow, {alignItems:'center', flexDirection:'row', paddingHorizontal:5, paddingVertical:10}]}>
                  <View style={Styles.columnTotal}>
                    <Text style={Styles.textValue}>Total Received</Text>
                    <Image style={Styles.line}/>
                    <Text style={Styles.textLabel}>{this.state.totalReceive}</Text>
                  </View>
                  <View style={Styles.columnTotal}>
                    <Text style={Styles.textValue}>Total Sent</Text>
                    <Image style={Styles.line}/>
                    <Text style={Styles.textLabel}>{this.state.totalSend}</Text>
                  </View>
                  <View style={[Styles.columnTotal]}>
                    <Text style={Styles.textValue}>Total Withdrawal Fee</Text>
                    <Image style={Styles.line}/>
                    <Text style={Styles.textLabel}>{this.state.totalWithdra}</Text>
                  </View>
                </View>
                <View style={{width:'100%', flex:1, marginBottom:20}}>
                  {this.state.dataSource.map((item, index)=>{
                      const date = item.created_At.substring(0,10);
                      const time = item.created_At.substring(11,16);
                      var type = 'r', amount=item.recieve_amount, toAddress='';
                      if(item.recieve_amount==undefined){
                          type='s';
                          amount=item.send_amount;
                          toAddress=item.toAddress;
                      }
                    return(
                        <Adapter
                          amount={parseFloat(amount).toFixed(8)}
                          type={type}
                          time={date+', '+time}
                          refresh={this.getAllTrade}
                          // toAddress={toAddress}
                          transactionId={item.transaction_hash}
                          desc={item.remark}
                          openTxn={this.openTxn}
                        />
                    )
                  })}
                </View>
          </View>
          </ScrollView>
          </SwipeToRefresh>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={'wallet'}/>
      </ImageBackground>
      </View>
    );
  }
}