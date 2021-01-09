import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, BackHandler, Platform, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import utils from '../Utils';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import HTML from 'react-native-render-html';

const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
         loading:false,
         loadingTitle:'Please Wait',
         loadingMessage:'loading...',
         data:'', title:'Privacy Policy',
         drawer:'true',
         color:require('../../assets/img/bg.jpg'),
         img:[require('../../assets/img/bg.jpg'),
         require('../../assets/img/bg2.jpg'),
         require('../../assets/img/bg3.jpg'),
         require('../../assets/img/bg4.jpeg'),
         require('../../assets/img/bg5.jpg'),
         require('../../assets/img/bg6.jpeg')],     
         }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
    }

    componentDidMount=async()=>{
      const color = await AsyncStorage.getItem(utils.colorUniversal);
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
      await this.getPP();
      if(this.props.navigation.getParam('from')=='register')
        this.setState({drawer:'false'});   
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    handleBack(){
      if(this.state.drawer=='true'){
        this.props.navigation.goBack(null);
        return true;
      }else{
        this.props.navigation.replace('Register');
        return true;
      }
    }

   stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }

  getPP=async()=>{
    this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
      await WebApi.getPrivacyPolicy('PRIVACY')
              .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from Privacy===>', json);
                        if(json.responseCode==200){
                            this.setState({
                              title:json.succ.title,
                              data:json.succ.description
                            })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                        this.setState({loading:false});
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });

  }

  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title="Privacy Policy" menuCheck={this.state.drawer} data={this.props} style={Styles.header} handleBack={this.handleBack}/>
           <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
        <ScrollView style={{flex:0.8}}>
          <View style={[Styles.container, Platform.OS=='ios' ? Styles.shadowIos : Styles.shadow]}>
            <Text style={Styles.title}>{this.state.title}</Text>
            <Image style={{width:'90%', height:1, backgroundColor:utils.colorGray, marginTop:10, marginBottom:10}}/>
            <View style={Styles.dialogSubtitle}>
              <HTML html={this.state.data}/>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      </View>
    );
  }
}
