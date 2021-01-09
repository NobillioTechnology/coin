

import React, { Component } from 'react';
import {
  Text, View, Image, Modal, TextInput, ActivityIndicator, TouchableHighlight
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import GridView from 'flatlist-react';
import Footer from '../Footer';
import utils from '../Utils';
// import QRCode from 'react-native-qrcode';

export default class CustomDialog extends Component {

  constructor(props) {
    super(props);
   }

  render() {
  
    return (
          <View style={Styles.itemBody}>
            <Modal style={[Styles.dialogue]}
              visible={this.props.visible}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => { this.props.close()}}>
                 <View style={Styles.dialogue}>
                  <View style={Styles.dialogueContainer}>
                      <Text style={Styles.dialogTitle}>{this.props.title}</Text>
                      {this.props.title=='Please Wait' && (
                        <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', marginLeft:15}}>
                          <ActivityIndicator size='large' style={{flex:0.2}}/>
                          <Text style={Styles.dialogueMessage}>{this.props.message}</Text>
                        </View>
                      )}
                      {this.props.title=='Alert'  && (
                        <View style={{width:'85%', flex:1, alignSelf:'center'}}>
                          <Text style={Styles.dialogueMessageAlert}>{this.props.message}</Text>
                          <TouchableHighlight underlayColor='none' onPress={()=>this.props.close()} style={Styles.ok}>
                            <Text style={{fontSize:utils.headSize}}>Ok</Text>
                          </TouchableHighlight>
                        </View>
                      )}
                      {this.props.title=='Success'  && (
                        <View style={{width:'85%', flex:1, alignSelf:'center'}}>
                          <Text style={Styles.dialogueMessageAlert}>{this.props.message}</Text>
                          <TouchableHighlight underlayColor='none' onPress={()=>this.props.close()} style={Styles.ok}>
                            <Text style={{fontSize:utils.headSize}}>Ok</Text>
                          </TouchableHighlight>
                        </View>
                      )}
                  </View>
                </View>
            </Modal>
          </View>
    );
  }
}