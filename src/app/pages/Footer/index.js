import React, { Component } from 'react';
import {View, Image, TouchableHighlight, Dimensions} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

const size = Dimensions.get('window').width/5;

export default class Footer extends Component {

  constructor(props) {
      super(props);
      this.state={
        selected:props.selected
      };
  }

  manageClick = async (val)=>{

    if(val=='wallet'){
      this.props.navigation.navigate('Wallet');
    }
    else if(val=='Trade'){
      this.props.navigation.navigate('Trade', {title:'Trade'})
    }
    else if(val == 'security'){
      this.props.navigation.navigate('Security')
    }
    else if(val == 'notification'){
      this.props.navigation.navigate('Notification')
    }
    else if(val == 'Profile'){
      this.props.navigation.navigate('Trade', {title:'Profile'})
    }
  }
  

  render(){
     const selected = this.props.selected;
     if(this.state.selected!=selected)
       this.setState({selected:selected});

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
                {this.state.selected=='notification' ?
                <Image source={require('../../assets/img/notiA.png')} style={styles.icon}/> :
                <Image source={require('../../assets/img/noti.png')} style={styles.icon}/> }
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
