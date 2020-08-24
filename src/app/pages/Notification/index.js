

import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, TouchableHighlight, Modal, AsyncStorage
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import Footer from '../Footer'
import Utils from '../Utils';
import CommonCss from '../Utils/commonCss';
import {socket} from '../../Common/WebApi';


export default class Notification extends Component {

  constructor(props) {
    super(props);
    this.state={
      _id:null,
      notiData:[],
    }
   }

   componentDidUpdate=async()=>{
    await socket.connect();
    await socket.emit('initChat',{userId:this.state._id})
   }

   componentDidMount=async()=>{
     const id = await AsyncStorage.getItem(Utils._id);
     this.setState({_id:id});
    socket.on('notificationAlert',(resp)=>{
      console.log("ALerttt ", resp)
    })
    socket.on('connect', () => console.log('Socket connected'));
    socket.emit('notificationList', {
      userId:this.state._id,
    })
    socket.on('notificationList', (resp) => {
        console.log('noti list ====>', 'notification from page===>');
        // console.log(resp.succ);
        this.setState({notiData:resp.succ});
    })
   }

   componentWillReceiveProps(){
    socket.emit('notificationList', {
      userId:this.state._id,
    })
   }

   openNoti=async(res, sen, trade, type)=>{
    console.log('recId====>', res);
    console.log('senId====>', sen);
    console.log('tradeId====>', trade);
    console.log('type====>', type);
    await socket.emit('currentlyChatting', {
      receiverId: res,
      senderId: sen,
      tradeId: trade,
      //  notificationType:"chat",
       type:'GROUP'
    })
    if(trade!='Notificaton')
      this.props.navigation.navigate('SingleTrade', {'tradeId':trade, 'from':'noti'});
    else
      this.props.navigation.navigate('Wallet');
    }

  render() {

    return (
      <View style={Styles.body}>
       <Header title="Notification" menuCheck="true" rightIcon={false} data={this.props} style={Styles.header}/>

        <ScrollView style={{flex:1}}>
            <View style={Styles.container}>
              {this.state.notiData.map((item)=>{
                return(
                 <View>
                  {!item._id.isSeen ? (
                    <TouchableHighlight underlayColor='none' onPress={()=>this.openNoti(item._id.receiverId, item._id.senderId, item._id.tradeId, item.messageType)}>
                      <View style={[CommonCss.cardView,{padding:10, width:'90%', marginTop:5, backgroundColor:Utils.colorGreen}]}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize:Utils.headSize, color:Utils.colorWhite}}>{item.senderName}</Text>
                            <View style={{backgroundColor:'red', position:'absolute', right:10, width:30, height:30, borderRadius:15, alignItems:'center', justifyContent:'center'}}>
                              <Text style={{color:Utils.colorWhite}}>{item.count}</Text>
                            </View>
                        </View>
                        <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorBlack, marginTop:5}}>{item.message}</Text>
                      </View>
                    </TouchableHighlight>
                  ):(
                    <TouchableHighlight underlayColor='none' onPress={()=>this.openNoti(item._id.receiverId, item._id.senderId, item._id.tradeId, item.messageType)}>
                      <View style={[CommonCss.cardView,{padding:10, width:'90%', marginTop:5}]}>
                          <Text style={{fontSize:Utils.headSize, color:Utils.colorDarkBlue, fontWeight:'bold'}}>{item.senderName}</Text>
                          <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorBlack, marginTop:5}}>{item.message}</Text>
                      </View>
                    </TouchableHighlight>
                  )}
                  </View>
                  )
              })}
            </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={'notification'} double={true}/>
      </View>
    );
  }
}
