import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, FlatList, ActivityIndicator, Modal
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
        dataSource:[], page:1, dataToggle:[],
        _id:'', confirmD:false, selectedTradeId:'', transfer:false, confirmMsg:''
      }

        this.openTrade=this.openTrade.bind(this);
        this.toggleStatus=this.toggleStatus.bind(this);
        this.editAction=this.editAction.bind(this);
        this.detailsAction=this.detailsAction.bind(this);
        this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
     const id = await AsyncStorage.getItem(Utils._id);
     const transfer = await this.props.navigation.getParam('transfer', false);
      this.setState({_id:id, transfer:transfer});
       this.getAllTrade(this.state.page);
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
                      // console.log('Modified json=====>', json.result.docs)
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
      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'To enable your Ad. Please click on Transfer Bond button.'});
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

   editAction(id){
       this.props.navigation.navigate('EditAd', {id:id});
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
         <Header title='Open Trades and Advertisement' menuCheck="false" data={this.props} style={Styles.header}/>
         <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
            <View style={Styles.container}>
              {this.state.dataSource.length<1 && (
                <View style={[CommonCss.cardView, Styles.shadow, {alignItems:'center'}]}>
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
                            bitcoin={this.refineBtc(parseFloat(item.price_equation).toFixed(8))}
                            amount={item.toPay.toFixed(2)}
                            limit={item.createdAt.substring(11,16)+', '+item.createdAt.substring(0,10)}
                            toggleStatus={this.toggleStatus}
                            editAction={this.editAction}
                            detailsAction={this.detailsAction}
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

      </View>
    );
  }
}
