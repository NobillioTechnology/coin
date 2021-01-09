

import React, { Component } from 'react';
import {
  Text, View, ImageBackground, ScrollView, TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
      color:require('../../assets/img/bg.jpg'),
      img:[require('../../assets/img/bg.jpg'),
      require('../../assets/img/bg2.jpg'),
      require('../../assets/img/bg3.jpg'),
      require('../../assets/img/bg4.jpeg'),
      require('../../assets/img/bg5.jpg'),
      require('../../assets/img/bg6.jpeg')],    
      vari:'bg',
    }
   }

   componentDidUpdate=async()=>{
    await socket.connect();
    // await socket.emit('initChat',{userId:this.state._id})
   }

   componentDidMount=async()=>{
     const id = await AsyncStorage.getItem(Utils._id);
     this.setState({_id:id});

     const color = await AsyncStorage.getItem(Utils.colorUniversal);
      if(color!==null){
       this.setState({vari:color});
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


    await socket.emit('initChat',{userId:this.state._id})

     socket.on('notificationAlert',(resp)=>{
      console.log("ALerttt ", resp);
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


   componentWillReceiveProps=async()=>{
    socket.emit('notificationList', {
      userId:this.state._id,
    });
      const color = await AsyncStorage.getItem(Utils.colorUniversal);
      if(color!==null && color!=this.state.vari){
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
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title="Notification" menuCheck="true" rightIcon={false} data={this.props} style={Styles.header}/>

        <ScrollView style={{flex:1}}>
            <View style={Styles.container}>
              {this.state.notiData.map((item)=>{
                return(
                 <View>
                  {!item._id.isSeen ? (
                    <TouchableHighlight underlayColor='none' onPress={()=>{
                      this.openNoti(item._id.receiverId, item._id.senderId, item._id.tradeId, item.messageType)
                      // this.play();
                    }}>
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
                    <TouchableHighlight underlayColor='none' onPress={()=>{
                      this.openNoti(item._id.receiverId, item._id.senderId, item._id.tradeId, item.messageType)
                      // this.play();
                    }}>
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
      </ImageBackground>
      </View>
    );
  }
}
