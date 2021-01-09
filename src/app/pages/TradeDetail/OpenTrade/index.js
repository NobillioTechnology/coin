import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, FlatList, ActivityIndicator, Modal, Platform, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style'
import Header from '../../Header'
import Utils from '../../Utils';
import CommonCss from '../../Utils/commonCss';
import Adapter from '../Adapter';
import WebApi from '../../../Common/WebApi';
import ProgressBar from '../../ProgressBar';


export default class Home extends Component {


  constructor(props) {
    super(props);

      this.state={
        role:'open',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'Loading...',
        loadingMore:true, refreshing:false, loadingDisabled:false,
        dataSource:[], page:1, dataToggle:[], paymentList:[],
        _id:'', confirmD:false, selectedTradeId:'', transfer:false, confirmMsg:'',
        color:require('../../../assets/img/bg.jpg'),
        img:[require('../../../assets/img/bg.jpg'),
        require('../../../assets/img/bg2.jpg'),
        require('../../../assets/img/bg3.jpg'),
        require('../../../assets/img/bg4.jpeg'),
        require('../../../assets/img/bg5.jpg'),
        require('../../../assets/img/bg6.jpeg')],
      }

        this.openTrade=this.openTrade.bind(this);
        this.toggleStatus=this.toggleStatus.bind(this);
        this.editAction=this.editAction.bind(this);
        this.detailsAction=this.detailsAction.bind(this);
        this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
        console.log(color);
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
     const id = await AsyncStorage.getItem(Utils._id);
     const transfer = await this.props.navigation.getParam('transfer', false);
      this.setState({_id:id, transfer:transfer});
       this.getAllTrade(this.state.page);

       var paymentList = await AsyncStorage.getItem(Utils.paymentList);
       paymentList = await JSON.parse(paymentList);
      this.setState({paymentList:paymentList});
   }

  stopLoading(){
    if(!this.state.transfer)
      this.props.navigation.goBack(null);
    else
      this.setState({loading:false});
  }

   getAllTrade=async(pageNumber)=>{
       if(pageNumber==1)
         this.setState({dataSource:[]});
       this.setState({refreshing:true});

       const body = JSON.stringify({
                           limit:10,
                           page:pageNumber,
                           userId:this.state._id
                       });
       await WebApi.postApi_trade('user_ad_list', body)
        .then(response => response.json())
          .then(json => {
             this.setState({refreshing:false, loadingMore:false});
               // console.log('Response from OpenTrades===>', json);
                  if(json.responseCode==200){
                      console.log('Modified json=====>', json.result.docs)
                      if(json.result.pages==pageNumber)
                            this.setState({loadingDisabled:true});

                      var data = this.state.dataSource;
                      var dataToggle = this.state.dataToggle;
                      if(json.result.docs.length>0){
                          json.result.docs.map((item)=>{
                            data.push(item);
                            if(item.status=='ACTIVE')
                              dataToggle.push({'_id':item._id, status:true});
                            else
                              dataToggle.push({'_id':item._id, status:false});
                          })
                          this.setState({
                            dataSource:data,
                            dataToggle:dataToggle
                          });
                      }else
                          this.setState({refreshing:false, loadingMore:false});
                  }else if(json.responseCode==401){
                      this.setState({refreshing:false, loadingMore:false, loadingDisabled:true});
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

   openTrade(){
     this.props.navigation.navigate('SingleTrade', {id:'1'});
   }

   confirm=async()=>{
      const id = this.state.selectedTradeId;
      let dataToggle = this.state.dataToggle;
            dataToggle.map((item)=>{
              console.log(item._id);
              if(item._id==id){
                  if(item.status==false)
                      this.changeStatus(id, 'ACTIVE');
                  else
                      this.changeStatus(id, 'DISABLE');                  
                  item.status=!item.status;
              }
            })
      await this.setState({dataToggle:dataToggle, confirmD:false});
   }

   toggleStatus=async(id)=>{
     if(!this.state.transfer){
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Click on transfer bond button to enable your ad'});
     }else{
      await this.setState({selectedTradeId:id});
      let dataToggle = this.state.dataToggle;
          dataToggle.map((item)=>{
            console.log(item._id);
            if(item._id==id){
                if(item.status==false)
                    this.setState({confirmMsg:'Are you sure you want to enable the Ad.'})
                else
                this.setState({confirmMsg:'Are you sure you want to disable the Ad.'})
            }
          })
      await this.setState({confirmD:true});
       }
    }

   changeStatus=async(id, status)=>{
     this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Updating...'});
     const body = JSON.stringify({
                     adId:id,
                     status:status,
                     userId:this.state._id
                 });
       await WebApi.postApi_trade('changeAdStatus', body)
        .then(response => response.json())
          .then(json => {
             this.setState({loading:false});
               console.log('Response from updating status===>', json.result.status);
                  if(json.responseCode==200){
                      // console.log('Modified json=====>', json.result.docs)
                      var data = this.state.dataSource;
                      var dataToggle = this.state.dataToggle;
                          data.map((item)=>{
                            // data.push(item);
                            if(item._id==id)
                              item = json.result;
                            })
                          dataToggle.map((item)=>{
                            if(item._id==id){
                                if(json.result=='ACTIVE')
                                  item = {'_id':item._id, status:true}
                                else
                                  item = {'_id':item._id, status:false}
                                console.log('Status from vaar====>', item.status)
                            }
                            })
                            this.setState({
                              dataSource:data,
                              dataToggle:dataToggle
                            });
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

   editAction=async(id, con, pay, curr)=>{
      // console.log('paymentlist length from open====>', this.state.paymentList.length);
      var payValue = '';
      this.state.paymentList.map((item, index)=>{
        if(item.name==pay)
            payValue=item.value;
      })
       this.props.navigation.navigate('EditAd', {id:id, 'con':con, 'pay':pay, 'payValue':payValue, 'curr':curr, 'payList':this.state.paymentList});
   }

   detailsAction=async(id)=>{
       this.props.navigation.navigate('DetailsAd',{tradeId:id});
   }


  loadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        console.log('loading more===>', this.state.loadingMore, this.state.page);
        this.getAllTrade(this.state.page);
      }
    );
  };

  _renderFooter = () => {
    if (!this.state.loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: 50,
          paddingVertical: 20,
          marginVertical:10,
        }}
      >
        <ActivityIndicator animating size='large'/>
      </View>
    )
  }

  refineBtc(btc){
    const dot = btc.indexOf('.');
    var beforeDot = btc.substring(0, dot);
    var afterDot = btc.substring(dot, btc.length);
    beforeDot = beforeDot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return beforeDot+afterDot;
  }

  render() {
    return (
      <View style={Styles.body}>
        <ImageBackground source={this.state.color} style={{flex:1}}>
         <Header title='Open Trades and Advertisement' menuCheck="false" data={this.props} style={Styles.header}/>
         <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
            <View style={Styles.container}>
              {this.state.dataSource.length<1 && (
                <View style={[CommonCss.cardView, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow, {alignItems:'center'}]}>
                  <Text style={{fontSize:Utils.headSize, marginVertical:20}}>You do not have any trade yet.</Text>
                </View>
                )}
                <FlatList
                    data={this.state.dataSource}
                    renderItem={ ({item, index}) =>
                        <View>
                          <Adapter
                            id={item._id}
                            role={this.state.role}
                            status={this.state.dataToggle[index].status}
                            type={item.type_of_trade_original}
                            method={item.payment_method}
                            bitcoin={this.refineBtc(parseFloat(item.price_equation).toFixed(2))}
                            amount={item.toPay.toFixed(2)}
                            limit={item.createdAt.substring(11,16)+', '+item.createdAt.substring(0,10)}
                            toggleStatus={this.toggleStatus}
                            editAction={this.editAction}
                            detailsAction={this.detailsAction}
                            country={item.location}
                            payment={item.payment_method}
                            currency={item.currency_type}
                          />
                      </View>
                     }
                keyExtractor={(item)=>item._id}
                numColumns={1}
                onEndReached={()=>{if(!this.state.loadingDisabled) this.loadMore();}}
                onEndReachedThreshold={1}
                initialNumToRender={10}
                ListFooterComponent={this._renderFooter}
                onRefresh={()=>this.getAllTrade(1)}
                refreshing={this.state.refreshing}
                />
         </View>
         {this.state.confirmD==true && (
         <View>
           <Modal style={CommonCss.dialogue}
            isVisible={this.state.confirmD}
            transparent={true}
            animationType={"fade"}
            onRequestClose={()=>this.setState({confirmD:false})}
            >
             <View style={CommonCss.dialogue}>
              <View style={[Styles.dialogueContainer, {height:150}]}>
                  <Text style={{fontSize:Utils.headSize, marginTop:20, marginHorizontal:30, textAlign:'center'}}>{this.state.confirmMsg}</Text>
                  <View style={{flexDirection:'row', position:'absolute', bottom:15, width:'80%'}}>
                    <TouchableHighlight underlayColor='none' onPress={()=>this.setState({confirmD:false})} style={Styles.cancelButton}>
                      <Text style={{color:Utils.colorWhite, fontSize:Utils.subHeadSize}}>No</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='none' onPress={()=>this.confirm()} style={Styles.okButton}>
                        <Text style={{fontSize:Utils.subHeadSize}}>Yes</Text>
                    </TouchableHighlight>
                  </View>
              </View>
            </View>
           </Modal>
         </View>
        )}
      </ImageBackground>
      </View>
    );
  }
}
