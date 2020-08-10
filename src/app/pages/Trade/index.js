import React, { Component } from 'react';
import {
  Text, View, ScrollView, Dimensions, TouchableHighlight, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import RadioForm from 'react-native-simple-radio-button';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import CountDown from 'react-native-countdown-component';


const width = Dimensions.get('window').width;

export default class Home extends Component {

  
  constructor(props) {
    super(props);
    this.state={
       title:'Trade',
       selected:'Trade',
       dropDown:false,
       _id:'', bonds:'0.0005', transfer:false, time:'', timer:0, retrive:false,
       loading:false, loadingTitle:'Please Wait', loadingMessage:'Loading...'
     }
    
      this.handleBack=this.handleBack.bind(this);
      this.stopLoading=this.stopLoading.bind(this);
    }

    componentDidMount=async()=>{
        const _id = await AsyncStorage.getItem(Utils._id);
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        const title = this.props.navigation.getParam('title', 'Trade');
        if(this.state.title!=title)
          this.setState({title:title, selected:title});

          this.setState({_id:_id});
          if(this.state.title=='Trade')
              this.userDetails();
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentWillReceiveProps(){
      if(this.state.title=='Trade')
          this.userDetails();
    }

    handleBack(){
      this.props.navigation.goBack(null);
      return true;
    }

    stopLoading(){
      this.setState({loading:false});
    }

    userDetails=async()=>{
      this.setState({loading:true,loadingTitle:'Please Wait', loadingMessage:'loading...'});
      const body = JSON.stringify({userId:this.state._id});
       await WebApi.postApi_trade('userDetails', body)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from retriveBond===>', json.result[0].userBond);
                     const time = json.result[0].bondActivationTime;
                     var timeSpend = Date.now()-time;
                     var timeRemains = 24*60*60*1000*7-timeSpend;
                     console.log('time now===>', timeRemains);
                        if(json.responseCode==200){
                          if(json.result[0].userBond==true){
                            this.setState({retrive:true, transfer:false, time:timeRemains});
                            this.startTimer(this.state.time);
                            if(json.result[0].retrieveBondMoney==true){
                              this.setState({transfer:false, retrive:false});
                            }else{
                              this.setState({retrive:true});
                              }
                          }
                          else{
                            this.setState({transfer:true});
                            this.getBonds();
                          }
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
    }

    startTimer(ms){
      var min = Math.floor((ms/1000) << 0)
      console.log('time after c ==>', min);
     if(this.state.timerState!=true){
        this.setState({timerState:true, timer:min});
        this.interval = setInterval(()=>{
              this.setState({
                  timer: --this.state.timer
              })
          }, 1000);
      }
   }

    getBonds=async()=>{
       await WebApi.getApi_trade('tradeBond')
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from trade bonds===>', json);
                        if(json.responseCode==200){
                          this.setState({bonds:json.result});
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
    }

    transferBonds=async()=>{
      this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Transfering...'});
      const body = JSON.stringify({userId:this.state._id});
       await WebApi.postApi_trade('tranferBondAmountToEscrow', body)
           .then(response => response.json())
                .then(json => {
                  //  this.setState({loading:false});
                     console.log('Response from transfer bonds===>', json);
                        if(json.responseCode==200){
                          this.setState({bonds:json.result});
                          this.getBonds();
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Something Went Wrong! Please contact to Admin'});
                    });
    }

    retrive=async()=>{
      this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Retriving...'});
      const body = JSON.stringify({userId:this.state._id});
       await WebApi.postApi_trade('returnBondAmountFromEscrow', body)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     // console.log('Response from retrive bonds===>', json);
                       this.userDetails();
                        if(json.responseCode==200){
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Something Went Wrong! Please contact to Admin'});
                    });
    }


  render() {

      const title = this.props.navigation.getParam('title', 'Trade');
        if(this.state.title!=title)
          this.setState({title:title, selected:title});
    
    return (
      <View style={Styles.body}>
       <Header title={this.state.title} menuCheck="true" rightIcon={true} data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
         <View style={Styles.mainView}>
          {this.state.title=='Trade' ? (

          <View style={Styles.container}>
            <View style={Styles.head}>
              <Text style={[Styles.heading,{fontSize:Utils.textSize}]}>Trade Dashboard</Text>
              <Icon name="chevron-down" style={Styles.rightIcon}/>
            </View>
            <View style={Styles.detailBody}>
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('OpenTrade', {'transfer':!this.state.transfer})}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>OPEN TRADE & ADVERTISEMENT</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('AllTrade')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>ALL TRADES</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
                
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('CompletedTrade')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>COMPLETED TRADE</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('CancelledTrade')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>CANCELLED TRADES</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>

              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('DisputedTrade')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>DISPUTED TRADES</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
            </View>
            <View style={{position:'absolute', bottom:0, width:'100%'}}>
              {this.state.retrive && (
                <View style={{width:'100%', alignItems:'center'}}>
                  <Text style={{fontSize:Utils.subHeadSize, marginHorizontal:15}}>Transfer bonds for your ads. to be visible , you can retrieve after 7 days</Text>
                      <CountDown
                          style={{marginTop:-10, marginLeft:10}}
                          until={this.state.timer}
                          size={15}
                          onFinish={() => this.setState({timerState:false})}
                          digitStyle={{marginHorizontal:-7}}
                          digitTxtStyle={{color:Utils.colorBlack, marginBottom:-20, fontWeight:'normal'}}
                          timeToShow={['D',':','H',':', 'M',':', 'S']}
                          timeLabels={{d:'DD',h:'HH', m: 'MM', s: 'SS'}}
                        />
                  <TouchableHighlight underlayColor='none' style={Styles.buttonGreen} onPress={()=>{if(!this.state.timerState) this.retrive();}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={{fontSize:Utils.subHeadSize}}>Retrieve </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
              {this.state.transfer && (
                <View style={{width:'100%', alignItems:'center'}}>
                  <Text style={{fontSize:Utils.subHeadSize, marginHorizontal:15}}>Transfer bonds for your ads. to be visible , you can retrieve after 7 days</Text>
                  <TouchableHighlight underlayColor='none' style={Styles.buttonGreen} onPress={()=>this.transferBonds()}>
                    <Text style={{fontSize:Utils.subHeadSize}}>Transfer Bond ({this.state.bonds} <Icon name='btc' style={{fontSize:Utils.subHeadSize}}/>)</Text>
                  </TouchableHighlight>
                </View>
              )}
            </View>
            </View>
          ):(

          <View style={Styles.container}>
             <View style={Styles.head}>
               <Text style={[Styles.heading, {fontSize:Utils.textSize}]}>On this page you can view and manage your profile</Text>
             </View>
             <View style={Styles.detailBody}>
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('BasicUser')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Basic User Information</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('ChangeEmail', {role:'Change Email'})}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Change Email Address</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('ChangeEmail', {role:'Change Password'})}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Change Password</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('Verification')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Verification</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('SetRealName')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Set Real Name</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='none' onPress={()=>{this.setState({dropDown:!this.state.dropDown})}}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Show Personal Data</Text>
                  <Icon name={this.state.dropDown == false ? 'chevron-right' : 'chevron-down'} style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
              {this.state.dropDown && (
                <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('TradeDetail', {role:'open'})}>
                  <View style={Styles.whiteCard}>
                    <Text style={Styles.cardText} onPress={()=>this.props.navigation.navigate('UserDetails', {_id:this.state._id})}>Personal info</Text>
                    <Text style={Styles.cardText} onPress={()=>this.props.navigation.navigate('LoginHistory')}>Login history</Text>
                    <Text style={Styles.cardText} onPress={()=>this.props.navigation.navigate('AllTrade')}>Trade history</Text>
                    <Text style={Styles.cardText} onPress={()=>this.props.navigation.navigate('Wallet')}>Transaction history</Text>
                  </View>
                </TouchableHighlight>
              )}
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('Security')}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Security</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('ChangeEmail', {role:'Account Deletion'})}>
                <View style={Styles.category}>
                  <Text style={Styles.categoryText}>Account Deletion</Text>
                  <Icon name="chevron-right" style={[Styles.rightIcon, {color:'#000'}]} />
                </View>
              </TouchableHighlight>

             </View>            
          </View>
          )}
          </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={this.state.selected}/>
      </View>
    );
  }
}
