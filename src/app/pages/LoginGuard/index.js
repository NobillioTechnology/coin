

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, Modal, BackHandler, AsyncStorage
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import RadioForm from 'react-native-simple-radio-button';
import utils from '../Utils';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';

const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

export default class Home extends Component {

  state={
    wantTo:'sell',PickerSelectedVal:''
  }

  constructor(props) {
    super(props);
      this.state={
        dialog:false,
        _id:'',
        loginGuard:false,
        loading:true,
        loadingTitle:'Please Wait',
        loadingMessage:'loading...'
      }
      this.stopLoading=this.stopLoading.bind(this);
   }

   componentDidMount=async()=>{
     const _id = await AsyncStorage.getItem(Utils._id);
     await this.setState({_id:_id});
     await this.getProfile(_id);
   }

  stopLoading(){
    this.setState({loading:false});
  }

   getProfile=async(_id)=>{
     await WebApi.getProfile(_id)
           .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from getProfile===>', json.result);
                        if(json.responseCode==200){
                            // alert(json.result.time_zone);
                            this.setState({
                                       loginGuard:json.result.loginGuard,
                                      })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
   }

   flipLoginGuard=async()=>{
     this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Updating...'});
       console.log(!this.state.loginGuard)
       await WebApi.loginGuard(!this.state.loginGuard)
        .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from loginGuard===>', json);
                        if(json.responseCode==200){
                            this.setState({
                                       loginGuard:json.result.loginGuard,
                              })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
   }
  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
       <Header title="Login Guard" menuCheck="false" data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
            <View style={{alignSelf:'center', justifyContent:'center', width:width, height:height-150}}>
              <View style={[Styles.itemBody,Styles.shadow, {alignSelf:'center'}]}>
                <Text style={{alignSelf:'center', margin:10}}>Prevent logins from unauthorized browser:</Text>
                <TouchableHighlight underlayColor='none' onPress={()=>this.flipLoginGuard()}>
                  <View style={this.state.loginGuard==false ? Styles.buttonRed : Styles.buttonGreen}>
                    {this.state.loginGuard==false ? (
                      <Text style={Styles.disbleText}>AUTHENTICATOR DISABLED</Text>
                      ):(
                       <Text>AUTHENTICATOR ENABLED</Text>                    
                      )
                    }
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation}/>
      </View>
    );
  }
}
