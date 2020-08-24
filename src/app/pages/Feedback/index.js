

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, TouchableHighlight, BackHandler, ActivityIndicator, FlatList
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import CommonCss from '../Utils/commonCss';
import Adapter from './Adapter';
import WebAPi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';


export default class Feedback extends Component {


  constructor(props) {
    super(props);
 
      this.state={
        title:'Feedback',
        tab:0,
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        loadingMore:true, refreshing:false, loadingDisabled:false,
        posData:[], neuData:[], negData:[], page:1,
        _id:'', emptyPositive:true,
      }
      this.stopLoading=this.stopLoading.bind(this);
  }

   componentDidMount=async()=>{
     BackHandler.addEventListener('hardwareBackPress', this.handleBack);
     const _id = await this.props.navigation.getParam('_id', '');
       await this.setState({_id:_id});
       this.getFeedback(1);
   }

   componentWillUnmount(){
     BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
   }

   handleBack(){
    //  this.props.navigation.goBack(null);
    //  return true;
   }
  
  stopLoading(){
   this.setState({loading:false});
   }

   getFeedback=async(pageNumber)=>{
         if(pageNumber==1)
           this.setState({dataSource:[]});
         this.setState({refreshing:true});
          
         const body= JSON.stringify({
                        feedbackTo:this.state._id,
                        feedbackType:'',
                        pageNumber:pageNumber,
                        limit:10
                    });
         await WebAPi.postApi_feedback('getFeedbackList', body)
          .then(response => response.json())
            .then(json => {
             this.setState({refreshing:false, loadingMore:false});
                 console.log('Response from feedback===>', json);
                    if(json.responseCode==200){
                        console.log('Modified json=====>', json.Data.docs)
                        var posData = this.state.posData;
                        var neuData = this.state.neuData;
                        var negData = this.state.negData;
                        if(json.Data.docs.length>0){
                          json.Data.docs.map((item)=>{
                            if(item.feedbackType=='nuetral')
                                neuData.push(item);
                              else if(item.feedbackType=='positive')
                                posData.push(item);
                              else
                                negData.push(item);

                              this.setState({
                                posData:posData,
                                neuData:neuData,
                                negData:negData
                              });
                          })
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

  switchTabs(i){
    if(this.state.tab!=i)
      this.setState({tab:i});
  }


  render() {

    return (
      <View style={Styles.body}>
       <Header title={this.state.title} menuCheck="false" data={this.props} style={Styles.header}/>
       <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
           <View style={Styles.container}>
            <View style={[CommonCss.cardView, CommonCss.shadow, {marginTop:10, flex:1}]}>
                  <ScrollableTabView
                    initialPage={this.state.tab}
                    tabBarActiveTextColor={Utils.colorText}
                    tabBarInactiveTextColor={Utils.colorText}
                    tabBarUnderlineStyle={{ backgroundColor: Utils.colorPrimary, height:5}}
                    renderTabBar={() => <ScrollableTabBar style={{width:'100%', alignSelf:'center'}}/>}
                    tabBarTextStyle={{fontSize:15,fontFamily:'Rubik-Light'}}
                    style={{width:'100%'}}
                    onChangeTab={(event)=>this.switchTabs(event.i.i)}
                    page={this.state.tab}
                  >
                    <View tabLabel="Positive" style={{height:'100%', marginBottom:20}}>
                    {this.state.posData.length<1 && (
                        <View style={{alignItems:'center', width:'100%', alignSelf:'center', position:'absolute', top:20}}>
                          <Text style={{fontSize:Utils.headSize, textAlign:'center', color:Utils.colorText, fontFamily:'Rubik-Medium'}}>No Record Found !</Text>
                        </View>
                      )}
                      <FlatList
                        data={ this.state.posData}
                        renderItem={ ({item}) =>
                          <View>
                            <Adapter
                              username={item.feedbackFrom.user_name}
                              profilePic={item.feedbackFrom.profilePic}
                              time={item.createdAt}
                              type={item.feedbackType}
                            />
                          </View>
              
                       }                          
                      numColumns={1}
                      onRefresh={()=>this.getFeedback(1)}
                      refreshing={this.state.refreshing}
                      />
                  </View>
                  <View tabLabel="Neutral" style={{height:'100%', marginTop:20}}>
                  {this.state.neuData.length<1 && (
                        <View style={{alignItems:'center', width:'100%', alignSelf:'center', position:'absolute', top:20}}>
                          <Text style={{fontSize:Utils.headSize, textAlign:'center', color:Utils.colorText, fontFamily:'Rubik-Medium'}}>No Record Found !</Text>
                        </View>
                      )}
                      <FlatList
                        data={ this.state.neuData}
                        renderItem={ ({item}) =>
                          <View>
                            <Adapter
                              username={item.feedbackFrom.user_name}
                              profilePic={item.feedbackFrom.profilePic}
                              time={item.createdAt}
                              type={item.feedbackType}
                            />
                          </View>              
                       }                          
                      numColumns={1}
                      onRefresh={()=>this.getFeedback(1)}
                      refreshing={this.state.refreshing}
                      />
                  </View>
                  <View tabLabel="Negative" style={{height:'100%', marginTop:20}}>
                  {this.state.negData.length<1 && (
                        <View style={{alignItems:'center', width:'100%', alignSelf:'center', position:'absolute', top:20}}>
                          <Text style={{fontSize:Utils.headSize, textAlign:'center', color:Utils.colorText, fontFamily:'Rubik-Medium'}}>No Record Found !</Text>
                        </View>
                      )}
                      <FlatList
                        data={ this.state.negData}
                        renderItem={ ({item}) =>
                          <View>
                            <Adapter
                              username={item.feedbackFrom.user_name}
                              profilePic={item.feedbackFrom.profilePic}
                              time={item.createdAt}
                              type={item.feedbackType}
                            />
                          </View>              
                       }                          
                      numColumns={1}
                      onRefresh={()=>this.getFeedback(1)}
                      refreshing={this.state.refreshing}
                      />
                  </View>
                </ScrollableTabView>
              </View>
          </View>
      </View>
    );
  }
}
