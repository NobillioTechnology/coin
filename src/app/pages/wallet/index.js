import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, FlatList, TouchableHighlight, BackHandler, AsyncStorage
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import commonCss from '../Utils/commonCss';
import CustomDialog from '../CustomDialog';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import Adapter from './Adapter';
import SwipeToRefresh from 'react-native-pull-to-refresh';


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
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
      this.handleScroll=this.handleScroll.bind(this);
    }

   componentDidMount=async()=>{
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     this.setState({_id:await AsyncStorage.getItem(Utils._id)});
     await this.getProfile();
     await this.getRecentTotal();
     await this.getTransactions();
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
                     console.log('Response from CountData===>', json);
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
                 console.log('Response from transaction1111===>'+JSON.stringify(json));
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

  

  render() {
    return (
      <View style={Styles.body}>
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
              <View style={[commonCss.cardView, Styles.shadow]}>
                <View style={Styles.rowView}>
                  <Text style={Styles.textLabelWallet}>Wallet Balance: </Text>
                  <Text style={Styles.textValueWallet}>{this.state.walletBalance}</Text>
                </View>
              </View>
                <View style={[commonCss.cardView, Styles.shadow, {alignItems:'center', flexDirection:'row', paddingHorizontal:5, paddingVertical:10}]}>
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
                <View style={{width:'100%'}}>
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
                          transactionId={''}
                        />
                    )
                  })}
                </View>
          </View>
          </ScrollView>
          </SwipeToRefresh>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={'wallet'}/>
      </View>
    );
  }
}