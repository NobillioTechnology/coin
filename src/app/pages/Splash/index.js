import React, { Component } from 'react';
import {
  Text, View, Image, Dimensions, Modal, Linking, TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style';
import Utils from '../Utils';
import CommonCss from '../Utils/commonCss';
import WebApi from '../../Common/WebApi';
import { checkVersion } from "react-native-check-version";
import Icon from 'react-native-vector-icons/FontAwesome';

const width =Dimensions.get('window').width;
const height =Dimensions.get('window').height;

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state={
      update:false,
    }
  }

  componentDidMount = async () => {
        const isLoggedIn = await AsyncStorage.getItem(Utils._id);

       setTimeout(()=>{
          if (isLoggedIn != null){
              this.props.navigation.navigate('Home')
          }
          else
              this.props.navigation.replace('Register')
        }, 3000);

       

        const version = await checkVersion();
        console.log("Got version info:", version);

        this.setState({updateUrl:version.url});
         
        if (version.needsUpdate) {
          console.log(`App has a ${version.updateType} update pending.`);
          this.setState({update:true});
       }

       this.getPaymentList();

  }

  getPaymentList=async()=>{
    await WebApi.getApi_trade('paymentMethodList')
    .then(response => response.json())
              .then(json => {
                   // console.log('Response from paymentList===>', json);
                      if(json.responseCode==200){
                          const data = json.result
                          var paymentList = [];
                          data.map((item, index)=>{
                            paymentList.push({name:item.name, value:item._id});
                          })
                          AsyncStorage.setItem(Utils.paymentList, JSON.stringify(paymentList));
                      }else{
                        this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                      }
                  })
                  .catch(error => {
                       console.log('error==>' , error)
                       this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                  });

}

openPlayStore(){
  Linking.openURL(this.state.updateUrl);
}

  render() {
   
    return (
        <View style={Styles.body}>
            <Image source={require('../../assets/img/logo.png')} style={Styles.logo}/>
            <View style={{position:'absolute', bottom:30, alignItems:'center', width:'100%'}}>
            <Text style={[{fontWeight:'bold', fontSize:12}]}>Coinbaazar LLC</Text>
              <Text style={Styles.noteLine}>#32 Bob Walsh street, Didube district,
                    Tbilisi 0159, Georgia</Text>
                    
              <Image source={require('../../assets/img/logo2.png')} style={Styles.logo2}/>
            </View>
            {this.state.update && (
              <Modal style={[Styles.dialogue]}
                  visible={this.state.update}
                  transparent={true}
                  animationType={"fade"}
                  onRequestClose={ () => {()=>{}}}>
                      <View style={CommonCss.dialogue}>
                        <View style={CommonCss.dialogueContainer}>
                          {/* <Icon name="close" style={{color:Utils.colorBlack, paddingHorizontal:20, paddingVertical:10, position:'absolute', top:0, right:0, fontSize:24}}
                             onPress={()=>this.setState({update:false})}
                             /> */}
                          <Text style={{fontSize:Utils.headSize, fontWeight:'bold', marginTop:40}}>Update require</Text>
                          <TouchableHighlight style={Styles.visitButton} onPress={()=>{this.openPlayStore()}}>
                            <Text>Update Now</Text>
                          </TouchableHighlight>
                        </View> 
                      </View>
              </Modal>
            )}
        </View>
      );
  }
}