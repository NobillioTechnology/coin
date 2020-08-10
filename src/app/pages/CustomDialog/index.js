import React, { Component } from 'react';
import {
  Text, View, Image, Modal, TextInput
} from 'react-native';
import Clipboard from "@react-native-community/clipboard";
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
    this.state={
      copied:false,
    }
   }
   

  render() {
  
    return (
          <View style={Styles.itemBody}>
            <Modal style={[Styles.dialogue]}
              visible={this.props.popupShown}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => { this.props.actionPer()}}>
                 <View style={Styles.dialogue}>
                  <View style={Styles.dialogueContainer}>
                    <Icon name="close" style={Styles.close} onPress={()=>this.props.actionPer()}/>
                    <Text style={Styles.dialogTitle}>{this.props.title}</Text>
                    <Image style={{width:'90%', height:1, backgroundColor:utils.colorGray}}/>
                    <Text style={Styles.dialogSubtitle}>Give out the Bitcoin address below to receive Bitcoins.</Text>
                    <View style={Styles.bitAddressView}>
                      <Text style={Styles.bitAddress}>{this.props.address}</Text>
                      <Icon name="copy" style={Styles.copyIcon} onPress={()=>{Clipboard.setString(this.props.address); this.setState({copied:true})}}/>
                    </View>
                    {this.state.copied && (
                      <Text style={{fontSize:utils.textSize, color:utils.colorGreen, alignSelf:'flex-end', marginRight:20, marginTop:5, marginBottom:-15}}>copied</Text>
                    )}
                    <Text style={[Styles.dialogSubtitle, {textAlign:'center', marginLeft:0, marginTop:20}]}>QR Code for mobile</Text>
                    <Image source={{uri:this.props.qr}} style={Styles.qr}/>
                  </View>           
                </View>
            </Modal>
          </View>
    );
  }
}
              //       <QRCode
                  //           value={this.props.address}
                  //           size={200}
                  //           bgColor='purple'
                  //           fgColor='white'
                  //       />
    