import React, { Component } from 'react';
import {View, Image, TouchableHighlight, Dimensions, Text} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Utils from '../Utils';
import {socket} from '../../Common/WebApi';
var Sound = require('react-native-sound');

const size = Dimensions.get('window').width/5;

export default class Footer extends Component {

  constructor(props) {
      super(props);
      this.state={
        selected:props.selected,
        _id:null,
        noti:false,
        count:0,
        playing:false,
      };
  }

  manageClick = async (val)=>{

    if(val=='wallet'){
      this.props.navigation.navigate('Wallet', {'from':'foot'});
    }
    else if(val=='Trade'){
      this.props.navigation.navigate('Trade', {'title':'Trade'});
    }
    else if(val == 'security'){
      this.props.navigation.navigate('Security', {'from':'foot'});
    }
    else if(val == 'notification'){
      this.props.navigation.navigate('Notification', {'from':'foot'});
    }
    else if(val == 'Profile'){
      this.props.navigation.navigate('Trade', {'title':'Profile'})
    }
  }

  componentDidUpdate=async()=>{
    await socket.connect();
  }

  componentDidMount=async()=>{
    const _id = await AsyncStorage.getItem(Utils._id);
    this.setState({_id:_id, count:0, noti:false});
    // console.log('uuuuuuuuuuu=========>', _id);
    await socket.emit('initChat',{userId:this.state._id})
  
    socket.on('notificationAlert',(resp)=>{
      // console.log("ALerttt ", resp);
    })

      if(this.props.double==undefined)
        socket.emit('notificationList', {
          userId:this.state._id,
        })

    socket.on('notificationList', (resp) => {
      this.setState({count:0, noti:false});
      // console.log('notification from footer====>')
      var temp = 0, noti=false;
      // console.log('data of noti=====>', resp.succ);
      resp.succ.map((item)=>{
        if(item._id.isSeen==false){
          // console.log('item from notification ====================>', item)
          if(item.messageType=='USER'){
              // console.log('item from notification ====================>', item)
                if(item._id.receiverId==this.state._id){
                  temp=temp+1;
                  noti=true;
                  this.play();
                }
            }
            else{
              temp=temp+1;
              noti=true;
              this.play();
            }
        }
          })
        this.setState({noti:noti, count:temp});
        console.log('noti======>', this.state.noti, '    ', 'count=====>', this.state.count);
    })
  }

  componentWillUnmount(){
    this.setState({noti:false, count:0});
  }

  play(){
    if(!this.state.playing){
      this.setState({playing:true});
      var whoosh = new Sound(require('../../assets/sound/noti.mp3'), (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // loaded successfully
          // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        
          // Play the sound with an onEnd callback
          whoosh.play((success) => {
            if (success) {
              // console.log('successfully finished playing');
              // this.stopPlaying();
              // this.setState({playing:false});
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        });
    }
  }

  stopPlaying(){
    if(this.state.playing)
      this.setState({playing:false});
  }


  render(){
     const selected = this.props.selected;
     if(this.state.selected!=selected)
       this.setState({selected:selected});

      //  console.log('noti====>', this.state.noti);

  	return(
  		<View style={styles.view}>

        <View style={styles.item}>
          <TouchableHighlight underlayColor='none' onPress={()=>this.manageClick('wallet')}>
            <View style={[styles.item], {width:size}}>
              <View style={styles.viewForContent}>
                {this.state.selected=='wallet' ?
                <Image source={require('../../assets/img/walletA.png')} style={styles.icon}/> :
                <Image source={require('../../assets/img/wallet.png')} style={styles.icon}/> }
              </View>
            </View>
          </TouchableHighlight>
        </View>
        
          <View style={styles.item}>
            <TouchableHighlight underlayColor='none' onPress={()=>this.manageClick('Trade')}>
              <View style={[styles.item], {width:size}}>
                <View style={styles.viewForContent}>

                {this.state.selected=='Trade' ? 
                <Image source={require('../../assets/img/tradeA.png')} style={styles.icon}/> :
                <Image source={require('../../assets/img/trade.png')} style={styles.icon}/> }
                </View>
              </View> 
            </TouchableHighlight>
            </View>
        

          <View style={styles.item}>
            <TouchableHighlight underlayColor='none' onPress={()=>this.manageClick('security')}>
              <View style={[styles.item], {width:size}}>
                <View style={styles.viewForContent}>
               {this.state.selected=='security' ? 
                <Image source={require('../../assets/img/securityA.png')} style={styles.icon}/> :
                <Image source={require('../../assets/img/security.png')} style={styles.icon}/> }
                </View>
              </View> 
            </TouchableHighlight>
            </View>

          <View style={styles.item}>
            <TouchableHighlight underlayColor='none' onPress={()=>this.manageClick('notification')}>
              <View style={[styles.item], {width:size}}>
                <View style={styles.viewForContent}>
                {this.state.selected=='notification' ? (
                <View style={styles.icon}>
                {this.state.noti && (
                  <View style={[{backgroundColor:Utils.colorRed, position:'absolute', right:20, zIndex:999, width:20, height:20, borderRadius:10, alignItems:'center', justifyContent:'center'}, Platform.OS=='ios'? {right:5}:{}]}>
                    <Text style={{color:Utils.colorWhite}}>{this.state.count}</Text>
                  </View>
                )}
                <Image source={require('../../assets/img/notiA.png')} style={{width:'100%', height:'100%',resizeMode:'contain'}}/>
                </View>
                ):(
                <View style={styles.icon}>
                  {this.state.noti && (
                  <View style={[{backgroundColor:Utils.colorRed, position:'absolute', right:20, zIndex:999, width:20, height:20, borderRadius:10, alignItems:'center', justifyContent:'center'}, Platform.OS=='ios'? {right:5}:{}]}>
                    <Text style={{color:Utils.colorWhite}}>{this.state.count}</Text>
                  </View>
                )}
                  <Image source={require('../../assets/img/noti.png')} style={{width:'100%', height:'100%', resizeMode:'contain'}}/>
                </View>
                )}
                </View>
              </View> 
            </TouchableHighlight>
            </View>

             <View style={styles.item}>
            <TouchableHighlight underlayColor='none' onPress={()=>this.manageClick('Profile')}>
              <View style={[styles.item], {width:size}}>
                <View style={styles.viewForContent}>
                {this.state.selected=='Profile' ? 
                  <Image source={require('../../assets/img/profileA.png')} style={styles.icon}/> :
                  <Image source={require('../../assets/img/profile.png')} style={styles.icon}/> }
                </View>
              </View> 
            </TouchableHighlight>
            </View>
  		</View>
  		);
  }
}
