import React, { Component } from 'react';
import {
  Text, View, ImageBackground, Dimensions, TouchableHighlight, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style';
import Header from '../Header';
import Utils from '../Utils';
import LinearGradient from 'react-native-linear-gradient';

const width =Dimensions.get('window').width;
const height =Dimensions.get('window').height;

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
      prev:false,
      next:true,
      index:0,
      themeNow:'bg',
      active:false,
    }

    this.handleBack=this.handleBack.bind(this);


  }

componentDidMount(){
  this.setState({color:require('../../assets/img/bg.jpg'), index:0, next:true, prev:false});
  AsyncStorage.setItem(Utils.colorUniversal, 'bg');
  BackHandler.addEventListener('hardwareBackPress', this.handleBack);

}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
}

handleBack(){
  // BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  this.props.navigation.navigate('Home', {'reload': true});
  return true;
}

  handleClick =async(button) => {
    console.log('console prev=====>', this.state.index);
    const index = this.state.index;
    if(button=='next' && this.state.next){
      if(index==0){
        this.setState({color:this.state.img[index+1], index:index+1, prev:true, themeNow:'bg2', active:true});
        // await AsyncStorage.setItem(Utils.colorUniversal, 'bg2');
        console.log(this.state.index, this.state.img[index], 'bg2');
      }else if(index==1){
        this.setState({color:this.state.img[index+1], index:index+1, prev:true, themeNow:'bg3', active:true});
        // await AsyncStorage.setItem(Utils.colorUniversal, 'bg3');
        console.log(this.state.index, this.state.img[index], 'bg3');
      }else if(index==2){
        this.setState({color:this.state.img[index+1], index:index+1, prev:true, themeNow:'bg4', active:true});
        // await AsyncStorage.setItem(Utils.colorUniversal, 'bg4');
        console.log(this.state.index, this.state.img[index], 'bg4');
      }else if(index==3){
        this.setState({color:this.state.img[index+1], index:index+1, prev:true, themeNow:'bg5', active:true});
        // await AsyncStorage.setItem(Utils.colorUniversal, 'bg5');
        console.log(this.state.index, this.state.img[index], 'bg5');
      }else if(index==4){
        this.setState({color:this.state.img[index+1], index:index+1, prev:true, next:false, themeNow:'bg6', active:true});
        // await AsyncStorage.setItem(Utils.colorUniversal, 'bg6');
        console.log(this.state.index, this.state.img[index], 'bg6');
        }
    }else if(button=='prev'){
      if(index>=0 && this.state.prev){
        if(index==5){
          this.setState({color:this.state.img[index-1], index:index-1, next:true, themeNow:'bg5', active:true});
          // await AsyncStorage.setItem(Utils.colorUniversal, 'bg5');
          console.log(this.state.index, this.state.img[index], 'bg5');
        }else if(index==4){
          this.setState({color:this.state.img[index-1], index:index-1, next:true, themeNow:'bg4', active:true});
          // await AsyncStorage.setItem(Utils.colorUniversal, 'bg4');
          console.log(this.state.index, this.state.img[index], 'bg4');
        }else if(index==3){
          this.setState({color:this.state.img[index-1], index:index-1, next:true, themeNow:'bg3', active:true});
          // await AsyncStorage.setItem(Utils.colorUniversal, 'bg3');
          console.log(this.state.index, this.state.img[index], 'bg3');
        }else if(index==2){
          this.setState({color:this.state.img[index-1], index:index-1, next:true, themeNow:'bg2', active:true});
          // await AsyncStorage.setItem(Utils.colorUniversal, 'bg2');
          console.log(this.state.index, this.state.img[index], 'bg2');
        }else if(index==1){
          this.setState({color:this.state.img[index-1], index:index-1, next:true, prev:false, themeNow:'bg', active:true});
          // await AsyncStorage.setItem(Utils.colorUniversal, 'bg');
          console.log(this.state.index, this.state.img[index], 'bg');
        }
     }
    }
  };

  apply=async()=>{
      AsyncStorage.setItem(Utils.colorUniversal, this.state.themeNow);
      this.setState({active:false});
  }

  render() {
   
    return (
        <View style={Styles.body}>
          <ImageBackground source={this.state.color} style={{flex:1}}>
             <Header title="Theme" menuCheck="true" rightIcon={false} data={this.props} style={Styles.header}/>
              <View style={{justifyContent:'center', width:width-20, alignItems:'center',alignSelf:'center', position:'absolute', bottom:20,}}>
                <View style={{width:'100%', flexDirection:'row'}}>
                  <TouchableHighlight style={Styles.visitButton} onPress={()=>this.handleClick('prev')} underlayColor='none'>
                    <LinearGradient colors={[Utils.colorWhite, Utils.colorDarkBlue]} style={{height:50, width:'100%', justifyContent:'center', alignItems:'center', borderRadius:25, paddingHorizontal:10, borderWidth:1, borderColor:Utils.colorDarkBlue}}>
                      <Text style={[{fontSize:Utils.headSize}, this.state.prev ? {color:Utils.colorBlack} : {color:Utils.colorDarkGray}]}>Prev</Text>
                    </LinearGradient>
                  </TouchableHighlight>
                  <TouchableHighlight style={[Styles.visitButton]} onPress={()=>this.handleClick('next')} underlayColor='none'>
                    <LinearGradient colors={[Utils.colorWhite, Utils.colorBlue]} style={{height:50,justifyContent:'center', alignItems:'center', borderRadius:25, paddingHorizontal:10, borderWidth:1, borderColor:Utils.colorDarkBlue}}>
                      <Text style={[{fontSize:Utils.headSize}, this.state.next ? {color:Utils.colorBlack} : {color:Utils.colorDarkGray}]}>Next</Text>
                    </LinearGradient>
                  </TouchableHighlight>
                </View>
                <TouchableHighlight style={[Styles.visitButton, {marginTop:10}]} onPress={()=>this.apply()} underlayColor='none'>
                    <LinearGradient colors={[Utils.colorWhite, "#1ea100"]} style={{height:50, justifyContent:'center', alignItems:'center', borderRadius:25, paddingHorizontal:10, borderWidth:1, borderColor:Utils.colorDarkBlue}}>
                      <Text style={[{fontSize:Utils.headSize}, this.state.active ? {color:Utils.colorBlack} : {color:Utils.colorDarkGray}]}>Apply</Text>
                    </LinearGradient>
                  </TouchableHighlight>
              </View>
          </ImageBackground>
        </View>
      );
  }
}
