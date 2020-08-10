import React, { Component } from 'react';
import {
  Text, View, Image, Modal, ScrollView, TouchableHighlight
} from 'react-native';
import Styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';

export default class CustomDialog extends Component {

  constructor(props) {
    super(props);
    this.state={
      copied:false,
    }
   }
   

  render() {
  // console.log(this.props.items.length);
    return (
          <View style={Styles.itemBody}>
            <Modal style={[Styles.dialogue]}
              visible={this.props.dropdown}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => { this.props.closeDrop()}}>
                 <View style={Styles.dialogue}>
                  <View style={Styles.dialogueContainer}>
                    <ScrollView style={{width:'100%'}}>
                      {this.props.items.map((item, index)=>{
                        return(
                            <TouchableHighlight style={{width:'100%'}} onPress={()=>this.props.choose(item, index)} underlayColor={Utils.colorGreen}>
                              <View>
                                {/* <Text style={{height:1, width:'100%', backgroundColor:Utils.colorGray, marginTop:5}}/> */}
                                <Text style={Styles.dropItem}>{item.label}</Text>
                                {/* <Text style={{height:1, width:'100%', backgroundColor:Utils.colorGray, marginTop:5}}/> */}
                              </View>
                            </TouchableHighlight>
                          )
                      })}
                    </ScrollView>
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
    