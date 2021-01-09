import React, { Component } from 'react';
import {
  Text, View, ImageBackground, TextInput, TouchableHighlight, ActivityIndicator, FlatList,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style'
import Header from '../../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../Footer';
import Utils from '../../Utils';
import CustomDialog from '../../CustomDialog';
import Adapter from '../Adapter';
import ProgressBar from '../../ProgressBar';
import WebApi from '../../../Common/WebApi';
import CommonCss from '../../Utils/commonCss';


export default class Home extends Component {


  constructor(props) {
    super(props);

      this.state={
        role:'disputed',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'Loading...',
        loadingMore:true, refreshing:false, loadingDisabled:false,
        dataSource:[], page:1, 
        _id:'',
        color:require('../../../assets/img/bg.jpg'),
        img:[require('../../../assets/img/bg.jpg'),
        require('../../../assets/img/bg2.jpg'),
        require('../../../assets/img/bg3.jpg'),
        require('../../../assets/img/bg4.jpeg'),
        require('../../../assets/img/bg5.jpg'),
        require('../../../assets/img/bg6.jpeg')],
      }

        this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
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
        const _id = await AsyncStorage.getItem(Utils._id);
       this.setState({_id:_id});
       this.getDisputedTrade(this.state.page);
   }

  stopLoading(){
     this.setState({loading:false});
  }

     getDisputedTrade=async(pageNumber)=>{
          if(pageNumber==1)
            this.setState({dataSource:[]});
          this.setState({refreshing:true});
          const body = JSON.stringify({
                             limit:10,
                             pageNumber:pageNumber,
                             userId:this.state._id
                         });
         await WebApi.postApi_trade('disputeTradeList', body)
          .then(response => response.json())
            .then(json => {
               this.setState({loadingMore:false, refreshing:false});
                 console.log('Response from disputedTrades===>', json);
                    if(json.responseCode==200){
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
                        this.setState({refreshing:false, loadingMore:false, loadingDisabled:true});
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
                .catch(error => {
                  console.log('error==>' , error)
                  this.setState({loading:true, refreshing:false, loadingMore:false,
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
        this.getDisputedTrade(this.state.page);
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


   openTrade(){
     this.props.navigation.navigate('SingleTrade', {id:'1'});
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
         <Header title='Disputed Trades' menuCheck="false" data={this.props} style={Styles.header}/>
        <ProgressBar
          title="Please Wait"
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
                            btc={this.refineBtc(parseFloat(item.amount_of_cryptocurrency).toFixed(8))}
                            amount={item.amount_in_currency}
                            bitcoin={this.refineBtc(parseFloat(item.exchangeRate).toFixed(2))}
                            time={item.createdAt.substring(11,16)+', '+item.createdAt.substring(0,10)}
                            openTrade={item.openTrade}
                          />
                        </View>
                   }                          
                  numColumns={1}
                  onEndReached={()=>{if(!this.state.loadingDisabled) this.loadMore();}}
                  onEndReachedThreshold={1}
                  initialNumToRender={10}
                  ListFooterComponent={this._renderFooter}
                  onRefresh={()=>this.getDisputedTrade(1)}
                  refreshing={this.state.refreshing}
                  />     
          </View>
      </ImageBackground>
      </View>
    );
  }
}