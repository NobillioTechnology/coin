import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Picker, CheckBox
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CommonCss from '../Utils/commonCss';
import CustomDialog from '../CustomDialog';
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
        _id:'', dataSource:[]
      }
     this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
      const _id = await AsyncStorage.getItem(Utils._id);
      await this.setState({_id:_id});
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
      </View>
    );
  }
}
