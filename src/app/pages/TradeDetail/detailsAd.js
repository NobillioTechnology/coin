import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Picker, CheckBox, BackHandler
} from 'react-native';
import css from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import commonCss from '../Utils/commonCss';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import HTML from 'react-native-render-html';


export default class DetailsAd extends Component {

    constructor(props) {
    super(props);

      this.state={
        title:'Details',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        tradeId:'',
        paymentMethod:'', userName:'', tradeLimit:'', priceBTC:'', currency:'', location:'', time:'', tt:''
        }
        this.stopLoading=this.stopLoading.bind(this);
    }

    componentDidMount=async()=>{
     const tradeId = this.props.navigation.getParam('tradeId', '1');
     console.log(tradeId);
     await this.setState({tradeId:tradeId});
     this.getTradeDetails(tradeId);

    }

    stopLoading(){
        this.setState({loading:false});
    }

   getTradeDetails=async(tradeId)=>{
         this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'loading...'});
         await WebApi.getApi_trade('detail_trade/'+this.state.tradeId)
          .then(response => response.json())
            .then(json => {
               this.setState({loading:false});
                 console.log('Response from tradeDetails===>', json);
                    if(json.responseCode==200){
                        if(json.result!==null){
                            const data = json.result;
                          this.setState({
                            paymentMethod:data.payment_method,
                            userName:data.user_name,
                            tradeLimit:data.min_transaction_limit+' - '+data.max_transaction_limit,
                            priceBTC:parseFloat(data.price_equation).toFixed(2),
                            currency:data.currency_type,
                            location:data.location,
                            time:data.payment_time,
                            tt:data.terms_of_trade
                            });
                        }
                    }else{
                      this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                    }
                })
            .catch(error => {
              console.log('error==>' , error)
              this.setState({loading:true,
                            loadingTitle:'Alert',
                            loadingMessage:'Oops! '+error,
                  })
          });
   }


    render() {

        return (
          <View style={css.body}>
             <Header title={this.state.title} menuCheck="false" data={this.props} style={css.header}/>
               <ProgressBar
                    title={this.state.loadingTitle}
                    message={this.state.loadingMessage}
                    visible={this.state.loading}
                    close={this.stopLoading}
                  />
                  <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
                    <View>
                         <View style={[commonCss.cardView, commonCss.shadow]}>
                            <View style={{margin:5}}>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Text style={[css.itemlebal,{flex:0.4}]}>Payment mode:</Text>
                                    <Text style={[css.boldText,{flex:0.6}]}>{this.state.paymentMethod}</Text>
                                </View>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Text style={[css.itemlebal,{flex:0.4}]}>User:</Text>
                                    <Text style={[css.boldText,{flex:0.6}]}>{this.state.userName}</Text>
                                </View>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Text style={[css.itemlebal,{flex:0.4}]}>Trade Limts:</Text>
                                    <Text style={[css.boldText,{flex:0.6}]}>{this.state.tradeLimit}</Text>
                                </View>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Text style={[css.itemlebal,{flex:0.4}]}>Price/BTC:</Text>
                                    <Text style={[css.boldText,{flex:0.6}]}>{this.state.priceBTC}</Text>
                                </View>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Text style={[css.itemlebal,{flex:0.4}]}>Currency type:</Text>
                                    <Text style={[css.boldText,{flex:0.6}]}>{this.state.currency}</Text>
                                </View>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Text style={[css.itemlebal,{flex:0.4}]}>Location:</Text>
                                    <Text style={[css.boldText,{flex:0.6}]}>{this.state.location}</Text>
                                </View>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Text style={[css.itemlebal,{flex:0.4}]}>Payment window:</Text>
                                    <Text style={[css.boldText,{flex:0.6}]}>{this.state.time}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[commonCss.cardView, commonCss.shadow]}>
                            <View style={{margin:0, padding:15}}>
                                <Text style={[css.heading, {marginVertical:10}]}>Terms Of trade with {this.state.userName}</Text>
                                <HTML html={this.state.tt} imagesMaxWidth={Dimensions.get('window').width} style={css.longText}/>
                            </View> 
                        </View>   
                    </View>
            </ScrollView>
          </View>                
        );
    }
}