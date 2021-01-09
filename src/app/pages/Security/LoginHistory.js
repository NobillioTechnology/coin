import React, { Component } from 'react';
import {
   View, ScrollView, Dimensions, ImageBackground, Platform
} from 'react-native';
import Styles from './style';
import Header from '../Header';
import Footer from '../Footer';
import Utils from '../Utils';
import Adapter from './Adapter';
import WebAPi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:"Loading...",
        _id:'', dataSource:[],
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
        require('../../assets/img/bg2.jpg'),
        require('../../assets/img/bg3.jpg'),
        require('../../assets/img/bg4.jpeg'),
        require('../../assets/img/bg5.jpg'),
        require('../../assets/img/bg6.jpeg')],
      }
     this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
      const _id = await AsyncStorage.getItem(Utils._id);
      await this.setState({_id:_id});
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
      this.getProfile();
   }


  stopLoading(){
   this.setState({loading:false});
   }

   getProfile=async()=>{
       this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'})
       await WebAPi.postApi_user('userProfile', JSON.stringify({_id:this.state._id}))
          .then(response => response.json())
            .then(json => {
             this.setState({loading:false});
                 // console.log('Response from profile===>', json);
                    if(json.responseCode==200){
                        console.log('Modified json=====>', json.result.login_history.length)
                        this.setState({dataSource:json.result.login_history});
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


  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
      <ImageBackground source={this.state.color} style={{flex:1}}>
       <Header title="Login History" data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
              {this.state.dataSource.map((item)=>{
                return(
                    <Adapter
                      id={item._id}
                      browser={item.browser}
                      ip={item.system_ip}
                      date={item.login_date.substring(0,10)+', '+item.login_date.substring(11, 16)}
                    />
                )
              })}
          </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected='security'/>
      </ImageBackground>
      </View>
    );
  }
}
