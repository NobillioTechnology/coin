

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, TouchableHighlight, BackHandler, ActivityIndicator, FlatList, ScrollView
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import RadioForm from 'react-native-simple-radio-button';
import Adapter from './Adapter';
import RNPickerSelect from 'react-native-picker-select';
import WebAPi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import DropDown from '../DropDown';


export default class Home extends Component {


  constructor(props) {
    super(props);
 
        this.openProfile=this.openProfile.bind(this);
         this.buyButton=this.buyButton.bind(this);
         this.sellButton=this.sellButton.bind(this);
         this.stopLoading=this.stopLoading.bind(this);
         this.handleBack=this.handleBack.bind(this);
         this.closeDrop=this.closeDrop.bind(this);
         this.chooseDropItem=this.chooseDropItem.bind(this);
         
      this.state={
        title:'Buy Bitcoin', 
        role:'Buy', type:'buy',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        loadingMore:true, refreshing:false, loadingDisabled:false,
        dataSource:[], page:1, dropDown:false, currentDrop:'', dropItems:[],
        _id:'', offr:'All Online Offers',
        filter:false, amount:'', offer:'', offersData:[],
        country:'', countrySelector:false, countryData:Utils.country,
        currency:'', currencySelector:false, currencyData:Utils.currency,
      }
      this.closeDrop=this.closeDrop.bind(this);
      this.openFeed=this.openFeed.bind(this);
   }

   componentDidMount=async()=>{
     BackHandler.addEventListener('hardwareBackPress', this.handleBack);
     const role = await this.props.navigation.getParam('role', 'Buy');
     var type = 'buy';
     if(role==='Sell')
         this.setState({type:'sell'});
       this.getOffers();
      await this.getTradeList(this.state.page);
   }

   componentWillUnmount(){
     BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
   }

   handleBack(){
     this.props.navigation.goBack(null);
     return true;
   }
  
  openProfile(id){
    this.props.navigation.navigate('UserDetails', {_id:id});
  }

  buyButton(id){
    this.props.navigation.navigate('BuyTrade', { id:id, role:this.state.role});
  }

  sellButton(id){
   this.props.navigation.navigate('BuyTrade', {id:id, role:this.state.role});
   }

  stopLoading(){
   this.setState({loading:false});
   }

   getOffers=async()=>{
     await WebAPi.getApi_trade('paymentMethodList')
           .then(response => response.json())
            .then(json => {
                 // console.log('Response from filter trade===>', json);
                    if(json.responseCode==200){
                        // console.log('Modified Offers=====>', json.result)
                      var data = this.state.offersData;
                      if(json.result.length>0){
                          json.result.map((item)=>{
                            data.push({label:item.name, value:item.name, color:'#000'});
                            this.setState({
                              offersData:data,
                            });
                          })
                        }
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

   getTradeList=async(pageNumber)=>{
         if(pageNumber==1)
           this.setState({dataSource:[]});
         this.setState({refreshing:true});
          
         const body= JSON.stringify({
                        amount:this.state.amount,
                        currency_type:this.state.currency,
                        location:this.state.country,
                        payment_method:this.state.offer,
                        type:this.state.type,
                        page:pageNumber,
                        limit:10
                    });
         await WebAPi.postApi_WT_trade('filter_trade', body)
          .then(response => response.json())
            .then(json => {
                //  console.log('Response from filter trade===>', json.result);
                    if(json.responseCode==200){
                        console.log('Modified json=====>', json.result.docs)
                      var data = this.state.dataSource;
                      if(json.result.docs.length>0){
                          json.result.docs.map((item)=>{
                            item.feedback={negative:0, positive:0}
                            data.push(item);
                          })
                          this.feedbackScore(data);
                        }else
                            this.setState({refreshing:false, loadingMore:false, dataSource:[]});
                    }else if(json.responseCode==401){
                            this.setState({refreshing:false, loadingMore:false, loadingDisabled:true});                      
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

   feedbackScore=async(data)=>{
    await data.map(async(item)=>{
      await WebAPi.postApi_feedback('feedbackScore', JSON.stringify({userId:item.user_id}))
      .then(async response => await response.json())
      .then(async json => {
          //  console.log('Response from filter trade===>', json.result);
              if(json.responseCode==200){
                  if(json.responseMessage=='Data found successfully'){
                   item.feedback = {negative:json.feedbackScore.negative, positive:json.feedbackScore.positive};
                  }
                  // console.log('feedback=====>', item)
                }
                await this.setState({dataSource:data});
          })
          .catch(error => {
            console.log('error==>' , error)
            this.setState({loading:true,
                          loadingTitle:'Alert',
                          loadingMessage:'Oops! '+error,
                })
    });
    })
    console.log('from feedback=====>')
    this.setState({refreshing:false, loadingMore:false});
   }

   openFeed(id){
    this.props.navigation.navigate('Feedback', {_id:id});
   }

   openDrop(dropType){
     if(dropType=='currency')
       this.setState({currentDrop:'currency', dropDown:true, dropItems:Utils.currency});
     else if(dropType=='country')
       this.setState({currentDrop:'country', dropDown:true, dropItems:Utils.country});
     else if(dropType=='offer')
       this.setState({currentDrop:'offer', dropDown:true, dropItems:this.state.offersData});
  }
   chooseDropItem(item){
     if(this.state.currentDrop=='currency')
         this.setState({dropDown:false, currency:item.value, crrcy:item.value});
     else if(this.state.currentDrop=='country')
         this.setState({dropDown:false, country:item.value, contr:item.value});
     else if(this.state.currentDrop=='offer')
         this.setState({dropDown:false, offer:item.value, offr:item.value});
   }

    loadMore=()=>{
          this.setState(
            (prevState, nextProps) => ({
              page: prevState.page + 1,
              loadingMore: true
            }),
            async() => {
              console.log('loading more===>', this.state.loadingDisabled, this.state.page);
              if(!this.state.refreshing)
                await this.getTradeList(this.state.page);
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

  selectCountry=async(country)=>{
    this.setState({country:country, countrySelector:true, currencySelector:false});
     var data = Utils.country;
     var out = [];
    for (var i = 0; i<data.length; i++) {

    if(data[i].label.substring(0, country.length)==country)
        out.push(data[i]);
      }
     console.log(out)
     this.setState({countryData:out});
  }

  selectedCountry(val){
    this.setState({country:val, countrySelector:false});
  }

  selectCurrency=async(currency)=>{
    this.setState({currency:currency, currencySelector:true, countrySelector:false});
     var data = Utils.currency;
     var out = [];
    for (var i = 0; i<data.length; i++) {

    if(data[i].label.substring(0, currency.length)==currency)
        out.push(data[i]);
      }
     console.log(out)
     this.setState({currencyData:out});
  }

  selectedCurrency(val){
    this.setState({currency:val, currencySelector:false});
  }

  closeDrop(){
    this.setState({dropDown:false});
  }

  refineBtc(btc){
    console.log(btc);
    const dot = btc.indexOf('.');
    var beforeDot = btc.substring(0, dot);
    var afterDot = btc.substring(dot, btc.length);
    beforeDot = beforeDot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return beforeDot+afterDot;
  }


  render() {

      const role = this.props.navigation.getParam('role', 'Buy');
        if(role!=this.state.role){
          this.setState({role:role});
        }
        if(this.state.role=='Sell')
          if(this.state.title!='Sell Bitcoin')
              this.setState({title:'Sell Bitcoin'});
    
    return (
      <View style={Styles.body}>
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
          items={this.state.dropItems}
          choose={this.chooseDropItem}
        />
           <View style={Styles.container}>
                <View style={{margin:10}}>
                  <View style={{flexDirection:'row', height:40}}>
                    <TextInput style={Styles.editText}
                      placeholder="Enter Amount"
                      keyboardType={'numeric'}
                      value={this.state.amount}
                      onChangeText={(val)=>this.setState({amount:val})}
                      />
                  <TouchableHighlight style={Styles.editTextRight} onPress={()=>this.openDrop('currency')} underlayColor='none'>
                    <View>
                      <TextInput style={{paddingHorizontal:10, width:'100%'}}
                            placeholder='Select Currency'
                            onChangeText={(country)=>this.selectCurrency(country.toUpperCase())}
                            value={this.state.currency}
                            onFocus={() =>this.setState({currencySelector:true})}
                      />
                      {/* <Text style={this.state.crrcy=='Select currency' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.crrcy}</Text> */}
                      {/* <Icon name='sort-down' style={Styles.dropIcon}/> */}
                    </View>
                  </TouchableHighlight>
                  </View>
                  <ScrollView style={{width:'100%'}} keyboardShouldPersistTaps={'always'}>
                    <View>
                        {this.state.currencySelector==true && (
                          <View>
                            <View style={{width:'100%', backgroundColor:Utils.colorWhite, marginVertical:10, paddingTop:10}}>
                              {this.state.currencyData.map((item, index)=>{
                                return (
                                  <View style={{width:'100%'}}>
                                    <Text style={{color:Utils.colorBlack, paddingHorizontal:15, fontSize:Utils.subHeadSize}} onPress={()=>this.selectedCurrency(item.value)}>{item.label}</Text>
                                    <Image style={{width:'100%', height:1, backgroundColor:Utils.colorGray, marginVertical:10}} />
                                  </View>
                                )
                              })}
                            </View>
                          </View>
                        )}
                    </View>
                  </ScrollView>
                  <View style={{flexDirection:'row', height:40, marginTop:10}}>
                  <TouchableHighlight style={Styles.editText} onPress={()=>this.openDrop('country')} underlayColor='none'>
                    <View>
                      <TextInput style={{paddingHorizontal:15, width:'100%'}} 
                              placeholder='Select Country' 
                              onChangeText={(country)=>this.selectCountry(country)}
                              value={this.state.country}
                              onFocus={() =>this.setState({countrySelector:true})}
                        />
                      {/* <Icon name='sort-down' style={Styles.dropIcon}/> */}
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight style={Styles.editTextRight} onPress={()=>this.openDrop('offer')} underlayColor='none'>
                    <View>
                      <Text style={this.state.offr=='All Online Offers' ? Styles.placeholder : Styles.dropItemSelected}>{this.state.offr}</Text>
                      <Icon name='sort-down' style={[Styles.dropIcon, {top:0}]}/>
                    </View>
                  </TouchableHighlight>
                  </View>
                  <ScrollView style={{width:'100%'}} keyboardShouldPersistTaps={'always'}>
                    <View>
                        {this.state.countrySelector==true && (
                          <View>
                            <View style={{width:'100%', backgroundColor:Utils.colorWhite, marginVertical:10, paddingTop:10}}>
                              {this.state.countryData.map((item, index)=>{
                                return (
                                  <View style={{width:'100%'}}>
                                    <Text style={{color:Utils.colorBlack, paddingHorizontal:15, fontSize:Utils.subHeadSize}} onPress={()=>this.selectedCountry(item.value)}>{item.label}</Text>
                                    <Image style={{width:'100%', height:1, backgroundColor:Utils.colorGray, marginVertical:10}} />
                                  </View>
                                )
                              })}
                            </View>
                          </View>
                        )}
                    </View>
                  </ScrollView>
                  <TouchableHighlight style={Styles.submit} onPress={()=>{this.getTradeList(1)}}>
                     <Text style={{fontSize:Utils.headSize+2}}>Search</Text>
                  </TouchableHighlight>
                </View>

                {this.state.role=='Buy' && (
                  <View style={{marginBottom:35}}>
                      <FlatList
                        data={ this.state.dataSource}
                        renderItem={ ({item}) =>
                          <View>
                            <Adapter
                            id={item._id}
                            userId={item.user_id}
                            username={item.user_name}
                            bitcoin={this.refineBtc(parseFloat(item.price_equation).toFixed(2))}
                            role={this.state.role}
                            text1label={parseFloat(item.toPay).toFixed(2)}
                            paymentMethod={item.payment_method}
                            limit={item.min_transaction_limit+ '-' +item.max_transaction_limit}
                            tags={item.add_tags}
                            userProfile={this.openProfile}
                            status={item.userStatus}
                            buyButton={this.buyButton}
                            currency={item.currency_type}
                            feedback={item.feedback}
                            openFeed={this.openFeed}
                            />
                          </View>
              
                       }                          
                      numColumns={1}
                      onEndReached={()=>{if(!this.state.loadingDisabled) this.loadMore();}}
                      onEndReachedThreshold={1}
                      initialNumToRender={10}
                      ListFooterComponent={this._renderFooter}
                      onRefresh={()=>this.getTradeList(1)}
                      refreshing={this.state.refreshing}
                      />
                  </View>
                )}

            {this.state.role=='Sell' && (
              <View>
              <FlatList
                    data={ this.state.dataSource}
                    renderItem={ ({item}) =>
                      <View>
                        <Adapter
                          id={item._id}
                          userId={item.user_id}
                          username={item.user_name}
                          bitcoin={parseFloat(item.price_equation).toFixed(2)}
                          role={this.state.role}
                          text1label={parseFloat(item.toPay).toFixed(2)}
                          paymentMethod={item.payment_method}
                          limit={item.min_transaction_limit+ '-' +item.max_transaction_limit}
                          userProfile={this.openProfile}
                          status={item.userStatus}
                          sellButton={this.sellButton}
                          currency={item.currency_type}
                          feedback={item.feedback}
                          tags={item.add_tags}
                          />
                      </View>
                    }                          
                numColumns={1}
                onEndReached={()=>{if(!this.state.loadingDisabled) this.loadMore();}}
                onEndReachedThreshold={1}
                initialNumToRender={10}
                ListFooterComponent={this._renderFooter}
                onRefresh={()=>this.getTradeList(1)}
                refreshing={this.state.refreshing}
                />
              </View>
            )}
          </View>
      </View>
    );
  }
}
