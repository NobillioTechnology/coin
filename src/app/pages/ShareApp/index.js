import React, { Component } from 'react';
import {
  Text, View, Image, Dimensions, Share, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style';
import Header from '../Header';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Utils from '../Utils';

const width =Dimensions.get('window').width;
const height =Dimensions.get('window').height;
const applink = 'https://play.google.com/store/apps/details?id=com.nobillio.coinbaazar';

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state={website:'https://www.youtube.com/channel/UCg2BxjRahmPlGyejFzYVzLg', share:false,
    color:require('../../assets/img/bg.jpg'),
    img:[require('../../assets/img/bg.jpg'),
    require('../../assets/img/bg2.jpg'),
    require('../../assets/img/bg3.jpg'),
    require('../../assets/img/bg4.jpeg'),
    require('../../assets/img/bg5.jpg'),
    require('../../assets/img/bg6.jpeg')],
    }
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
}

componentDidUpdate=async()=>{
  if(!this.state.isWaiting){
      setTimeout(async()=>{
    const color = await AsyncStorage.getItem(Utils.colorUniversal);
    console.log(color);
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
    this.setState({isWaiting:false});
  }, 2000);
  this.setState({isWaiting:true});
}
}

  handleClick = () => {
    Share.share({
      message: 'Buy & Sell Bitcoins instantly on coinbaazar, a p2p Exchange \n'+applink,
      url: applink,
      title: 'Coinbaazar'
    }, {
      // Android only:
      dialogTitle: 'Share BAM goodness',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  };

  render() {
   
    return (
        <View style={Styles.body}>
        <ImageBackground source={this.state.color} style={{flex:1}}>
         <Header title="Share" menuCheck="true" rightIcon={false} data={this.props} style={Styles.header}/>
         <View style={{justifyContent:'center', flex:1, alignSelf:'center', alignItems:'center'}}>
            <Image source={require('../../assets/img/logo.png')} style={Styles.logo}/>
            <TouchableHighlight style={Styles.visitButton} onPress={()=>this.handleClick()}>
              <Text style={{color:Utils.colorWhite, fontWeight:'bold', fontSize:Utils.headSize}} >Share App</Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
        </View>
      );
  }
}
