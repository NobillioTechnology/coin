

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
    socket.emit('initChat', { userId:this.state._id});
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
        // console.log('noti list ====>', resp.succ);
        this.setState({notiData:resp.succ});
    })
   }

  // search(){
  //   this.setState({activeSearch:!this.state.activeSearch});
  // }

  render() {

    return (
      <View style={Styles.body}>
       <Header title="Notification" rightIcon={false} data={this.props} style={Styles.header}/>

        <ScrollView style={{flex:1}}>
            <View style={Styles.container}>
              {this.state.notiData.map((item)=>{
                return(
                 <View>
                  {!item._id.isSeen ? (
                    <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('SingleTrade', {'tradeId':item._id.tradeId})}>
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
                    <TouchableHighlight underlayColor='none' onPress={()=>this.props.navigation.navigate('SingleTrade', {'tradeId':item._id.tradeId})}>
                      <View style={[CommonCss.cardView,{padding:10, width:'90%', marginTop:5}]}>
                          <Text style={{fontSize:Utils.headSize, color:Utils.colorGreen}}>{item.senderName}</Text>
                          <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorBlack, marginTop:5}}>{item.message}</Text>
                      </View>
                    </TouchableHighlight>
                  )}
                  </View>
                  )
              })}
            </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={'notification'} double={false}/>
      </View>
    );
  }
}
