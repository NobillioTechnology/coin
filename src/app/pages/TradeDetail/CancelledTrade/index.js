import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, TouchableHighlight, AsyncStorage, ActivityIndicator, FlatList
} from 'react-native';
import Styles from '../style'
import Header from '../../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../Footer';
import Utils from '../../Utils';
import CommonCss from '../../Utils/commonCss';
import CustomDialog from '../../CustomDialog';
import Adapter from '../Adapter';
import ProgressBar from '../../ProgressBar';
import WebApi from '../../../Common/WebApi';


export default class Home extends Component {


  constructor(props) {
    super(props);

      this.state={
        role:'cancelled',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'Loading...',
        loadingMore:true, refreshing:false, loadingDisabled:false,
        dataSource:[], page:1, 
        _id:'',
      }
        this.stopLoading=this.stopLoading.bind(this);
        this.openTrade=this.openTrade.bind(this);
   }

   componentDidMount=async()=>{
       const _id = await AsyncStorage.getItem(Utils._id);
       this.setState({_id:_id});
       this.getCancelledTrade(this.state.page);
   }

  stopLoading(){
     this.setState({loading:false});
  }

     getCancelledTrade=async(pageNumber)=>{
       if(pageNumber==1)
         this.setState({dataSource:[]});
         this.setState({refreshing:true});
         const body = JSON.stringify({
                             limit:10,
                             pageNumber:pageNumber,
                             userId:this.state._id
                         });
         await WebApi.postApi_trade('getCancelTradeList', body)
          .then(response => response.json())
            .then(json => {
               this.setState({refreshing:false, loadingMore:false});
                 console.log('Response from CancelledTrades===>', json);
                    if(json.responseCode==200){
                        console.log('Modified json=====>', json.Data.docs)
                        var data = this.state.dataSource;
                        if(json.Data.docs.length>0){
                            json.Data.docs.map((item)=>{
                              data.push(item);
                              this.setState({
                                dataSource:data,
                              });
                            })
                          }else
                              this.setState({refreshing:false, loadingMore:false});
                    }else if(json.responseCode==401){
                        this.setState({refreshing:false, loadingMore:fales, loadingDisabled:true});
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                  console.log('error==>' , error)
                  this.setState({loading:true, refreshing:false,
                                loadingTitle:'Alert',
                                loadingMessage:'Oops! '+error,
                      })
          });
   }

    loadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true
      }),
      () => {
        console.log('loading more===>', this.state.loadingMore, this.state.page);
        this.getCancelledTrade(this.state.page);
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
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

   openTrade(tradeId){
     this.props.navigation.navigate('SingleTrade', {tradeId:tradeId});
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
       <Header title='Cancelled Trades' menuCheck="false" data={this.props} style={Styles.header}/>
        <ProgressBar
          title="Please Wait"
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
                    data={ this.state.dataSource}
                    renderItem={ ({item}) =>
                        <View>
                           <Adapter
                              id={item._id}
                              uniqueId={item.addUniqueId}
                              role={this.state.role}
                              username={item.advertisement_owner_name}
                              flat={item.currency_type}
                              fee={item.transactionFee}
                              btc={parseFloat(item.amount_of_cryptocurrency).toFixed(8)}
                              amount={item.amount_in_currency}
                              bitcoin={this.refineBtc(parseFloat(item.exchangeRate).toFixed(2))}
                              time={item.createdAt.substring(11,16)+', '+item.createdAt.substring(0,10)}
                              tradeId={item._id}
                              openTrade={this.openTrade}
                            />
                        </View>
                    }                          
                numColumns={1}
                onEndReached={()=>{if(!this.state.loadingDisabled) this.loadMore();}}
                onEndReachedThreshold={1}
                initialNumToRender={10}
                ListFooterComponent={this._renderFooter}
                onRefresh={()=>this.getCancelledTrade(1)}
                refreshing={this.state.refreshing}
                />
          </View>
      </View>
    );
  }
}
