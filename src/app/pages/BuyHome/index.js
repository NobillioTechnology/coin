

import React, { Component } from 'react';
import {
  Text, View, TextInput, TouchableHighlight, BackHandler, ActivityIndicator, FlatList, Dimensions, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style';
import Header from '../Header';
import Utils from '../Utils';
import Adapter from './Adapter';
import WebAPi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import SearchableDropdown from 'react-native-searchable-dropdown';

const width = Dimensions.get('window').width;


export default class Home extends Component {


  constructor(props) {
    super(props);
 
        this.openProfile=this.openProfile.bind(this);
         this.buyButton=this.buyButton.bind(this);
         this.sellButton=this.sellButton.bind(this);
         this.stopLoading=this.stopLoading.bind(this);
         this.handleBack=this.handleBack.bind(this);
         
      this.state={
        title:'Buy Bitcoin', 
        role:'Buy', type:'buy',
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        loadingMore:true, refreshing:false, loadingDisabled:false,
        dataSource:[], page:1,
        _id:'', offr:'All Online Offers',
        filter:false, amount:'', offer:'', offersData:[],
        country:'',
        currency:'',
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
        require('../../assets/img/bg2.jpg'),
        require('../../assets/img/bg3.jpg'),
        require('../../assets/img/bg4.jpeg'),
        require('../../assets/img/bg5.jpg'),
        require('../../assets/img/bg6.jpeg')],     
      }
      this.openFeed=this.openFeed.bind(this);
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

   componentDidUpdate=async()=>{
   
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
                            data.push({name:item.name, value:item.name});
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
                        // console.log('Modified json=====>', json.result.docs)
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
    // console.log('from feedback=====>')
    this.setState({refreshing:false, loadingMore:false});
   }

   openFeed(id){
    this.props.navigation.navigate('Feedback', {_id:id});
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

  selectedCountry(val){
    this.setState({country:val.value});
  }

  selectedOffer(val){
    this.setState({offer:val.value});
  }

  selectedCurrency(val){
    this.setState({currency:val.value});
  }

  refineBtc(btc){
    // console.log(btc);
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
        <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title={this.state.title} menuCheck="false" data={this.props} style={Styles.header}/>
       <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
           <View style={Styles.container}>
                <View style={{margin:10}}>
                  <View style={{flexDirection:'row', width:'100%'}}>
                    <TextInput style={[Styles.editText, {marginRight:5}]}
                      placeholder="Enter Amount"
                      keyboardType={'numeric'}
                      value={this.state.amount}
                      onChangeText={(val)=>this.setState({amount:val})}
                      />
                      <View style={[Styles.editText, {alignItems:'center'}]}>
                        <SearchableDropdown
                                style={{}}
                                selectedItems={this.state.currency}
                                onItemSelect={(item) => {this.selectedCurrency(item)}}
                                containerStyle={{ padding: 5 }}
                                onRemoveItem={(item) => {
                                  const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                                  this.setState({ selectedItems: items });
                                }}
                                itemStyle={{
                                  padding: 10,
                                  marginTop: 2,
                                  backgroundColor:Utils.colorDarkBlue,
                                  borderColor: '#bbb',
                                  borderWidth: 1,
                                  borderRadius: 5,
                                }}
                                itemTextStyle={{color:Utils.colorWhite}}
                                itemsContainerStyle={{ maxHeight: 140 }}
                                items={Utils.currency}
                                defaultIndex={0}
                                resetValue={false}
                                textInputProps={
                                  {
                                    placeholder: "Currency",
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        paddingHorizontal:10,
                                        // borderWidth: 1,
                                        // borderColor: '#ccc',
                                        // borderRadius: 5,
                                        maxHeight:40
                                      },
                                    onTextChange: text => console.log(text)
                                  }
                                }
                                listProps={
                                  {
                                    nestedScrollEnabled: true,
                                  }
                                }
                            />
                        </View>

                  </View>
                  <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
                      <View style={[Styles.editText, {alignItems:'center', marginRight:5, flex:0.5}]}>
                       <SearchableDropdown
                            containerStyle={{ padding: 5 }}
                            selectedItems={this.state.country}
                            onItemSelect={(item) => {this.selectedCountry(item)}}
                            onRemoveItem={(item) => {
                              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                              this.setState({ selectedItems: items });
                            }}
                            itemStyle={{
                              padding: 10,
                              marginTop: 2,
                              backgroundColor:Utils.colorDarkBlue,
                              borderColor: '#bbb',
                              borderWidth: 1,
                              borderRadius: 5,
                            }}
                            itemTextStyle={{color:Utils.colorWhite}}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={Utils.country}
                            defaultIndex={0}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Country",
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40
                                  },
                                onTextChange: text => console.log(text)
                              }
                            }
                            listProps={
                              {
                                nestedScrollEnabled: true,
                              }
                            }
                        />
                      </View>
                      <View style={[Styles.editText, {alignItems:'center'}]}>
                          <SearchableDropdown
                            selectedItems={this.state.offer}
                            onItemSelect={(item) => {this.selectedOffer(item)}}
                            containerStyle={{ padding: 5 }}
                            onRemoveItem={(item) => {
                              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                              this.setState({ selectedItems: items });
                            }}
                            itemStyle={{
                              padding: 10,
                              marginTop: 2,
                              backgroundColor:Utils.colorDarkBlue,
                              borderColor: '#bbb',
                              borderWidth: 1,
                              borderRadius: 5,
                            }}
                            itemTextStyle={{color:Utils.colorWhite}}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={this.state.offersData}
                            defaultIndex={0}
                            resetValue={false}
                            textInputProps={
                              {
                                placeholder: "Payment Method",
                                underlineColorAndroid: "transparent",
                                style: {
                                    paddingHorizontal:10,
                                    // borderWidth: 1,
                                    // borderColor: '#ccc',
                                    // borderRadius: 5,
                                    height:40
                                  },
                                onTextChange: text => console.log(text)
                              }
                            }
                            listProps={
                              {
                                nestedScrollEnabled: true,
                              }
                            }
                        />
                      </View>
                    </View>
                    <TouchableHighlight style={Styles.submit} onPress={()=>{this.getTradeList(1)}}>
                     <Text style={{fontSize:Utils.headSize+2}}>Search</Text>
                  </TouchableHighlight>
              </View>

                {this.state.role=='Buy' && (
                  <View style={{flex:1}}>
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
              <View style={{flex:1}}>
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
        </ImageBackground>
      </View>
    );
  }
}
