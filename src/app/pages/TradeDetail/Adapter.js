import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image, TouchableHighlight, Switch
} from "react-native";
import css from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import SwipeToRefresh from 'react-native-pull-to-refresh';


class Adapter extends Component {
    render() {
        return (
          <View>
            <View style={[css.itemBody, css.shadow]}>

                {this.props.role == 'open'&& (
                    <View style={{margin:5}}>
                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Text style={[css.itemlebal,{flex:0.4}]}>Price/BTC:</Text>
                            <Text style={[css.boldText,{flex:0.6}]}>{this.props.bitcoin}</Text>
                        </View>
                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Text style={[css.itemlebal,{flex:0.4}]}>To Pay In Dollar:</Text>
                            <Text style={[css.boldText,{flex:0.6}]}>{this.props.amount}</Text>
                        </View>
                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Text style={[css.itemlebal,{flex:0.4}]}>Payment Method:</Text>
                            <Text style={[css.boldText,{flex:0.6}]}>{this.props.method}</Text>
                        </View>
                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Text style={[css.itemlebal,{flex:0.4}]}>Trade Type:</Text>
                            <Text style={[css.boldText,{flex:0.6}]}>{this.props.type}</Text>
                        </View>
                        <View style={{margin:10}}>
                            <View style={{flexDirection:'row'}}>
                               {this.props.status==true ? (
                                    <Text style={[css.itemlebal, {flex:0.4}]}>Active:</Text>   
                                ):( 
                                    <Text style={[css.itemlebal, {flex:0.4}]}>Disable:</Text>
                                )}
                                <View style={{flex:0.6}}>
                                    <Switch style={css.switchButton}
                                        value={this.props.status}
                                        onValueChange={(value)=>this.props.toggleStatus(this.props.id)}
                                        trackColor={{ false: Utils.colorGray, true: Utils.colorGreen }}
                                        thumbColor={this.props.status ? Utils.colorWhite : Utils.colorWhite}
                                        ios_backgroundColor={Utils.colorGreen}
                                     />
                                </View>
                            </View>
                        </View>
                        <Image style={{width:'100%', backgroundColor:Utils.colorGray, height:1}}/>
                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <View style={{alignItems:'flex-start', flex:0.5}}>
                                <Text style={[css.itemlebal, {marginBottom:5}]}>Created at: </Text>
                                <Text style={css.boldText}>{this.props.limit}</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'flex-end', flex:0.5}}>
                                <TouchableHighlight underlayColor='none' onPress={()=>this.props.editAction(this.props.id)}>
                                    <View style={css.itemEditButtonView}>
                                        <Text style={css.itemEditButton}>Edit</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor='none' onPress={()=>this.props.detailsAction(this.props.id)}>
                                    <View style={css.itemEditButtonView}>
                                        <Text style={css.itemEditButton}>Details</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                )}
                {this.props.role=='all' && (
                    <TouchableHighlight underlayColor='none' onPress={()=>this.props.openTrade(this.props.tradeId)}>
                        <View style={{margin:5}}>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Text style={[css.itemStatus, {color:Utils.colorBlue}]}>{this.props.username} </Text>
                                <Text style={css.itemCntry}>{this.props.bitcoin}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Text style={[css.itemlebal, {flex:0.4}]}>Trade ID:</Text>
                                <Text style={[css.boldText, {flex:0.6}]}>{this.props.id}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Text style={[css.itemlebal, {flex:0.4}]}>Trade Amount:</Text>
                                <Text style={[css.boldText, {flex:0.6}]}>{this.props.amount} </Text>
                            </View>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Text style={[css.itemlebal, {flex:0.4}]}>Total BTC:</Text>
                                <Text style={[css.boldText, {flex:0.6}]}>{this.props.btc} </Text>
                            </View>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Text style={[css.itemlebal, {flex:0.4}]}>Trade Fee:</Text>
                                <Text style={[css.boldText, {flex:0.6}]}>{this.props.fee}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Text style={[css.itemlebal, {flex:0.4}]}>Created At:</Text>
                                <Text style={[css.boldText, {flex:0.6}]}>{this.props.time}</Text>
                            </View>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Text style={[css.itemlebal, {flex:0.4}]}>Status:</Text>
                                {this.props.status=='PENDING' && (
                                    <Text style={[css.boldText, {flex:0.6, color:Utils.colorOrange, textDecorationLine:'underline'}]}>{this.props.status}</Text>
                                )}    
                                {this.props.status=='DISPUTE' && (
                                    <Text style={[css.boldText, {flex:0.6, color:Utils.colorOrange, textDecorationLine:'underline'}]}>{this.props.status}</Text>
                                )}
                                {this.props.status=='CANCEL' && (
                                    <Text style={[css.boldText, {flex:0.6, color:Utils.colorRed, textDecorationLine:'underline'}]}>{this.props.status}</Text>
                                )}
                                {this.props.status=='COMPLETE' && (
                                    <Text style={[css.boldText, {flex:0.6, color:Utils.colorBlue, textDecorationLine:'underline'}]}>COMPLETED</Text>
                                )}
                                {this.props.status=='PAID' && (
                                    <Text style={[css.boldText, {flex:0.6, color:Utils.colorGreen, textDecorationLine:'underline'}]}>{this.props.status}</Text>
                                )}
                                
                            </View>

                            <Image style={{width:'100%', backgroundColor:Utils.colorGray, height:1}}/>

                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <View style={{marginLeft:5}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={css.itemlebal}>Fiat:<Text style={css.boldText}> {this.props.flat} </Text></Text>
                                    </View>
                                    <View style={{flexDirection:'row',marginTop:5, alignItems:'center'}}>
                                        <Text style={css.itemlebal}>Type:<Text style={css.boldText}> {this.props.type} </Text></Text>
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                     </TouchableHighlight>   
                    )}

                   {(() => {
                    if (this.props.role =='completed' || this.props.role=='cancelled' || this.props.role=='disputed'){
                        return(
                            <TouchableHighlight underlayColor='none' onPress={()=>this.props.openTrade(this.props.id)}>
                                <View style={{margin:5}}>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemStatus, {color:Utils.colorBlue}]}>{this.props.username} </Text>
                                        <Text style={css.itemCntry}>{this.props.bitcoin}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemlebal, {flex:0.4}]}>Trade ID:</Text>
                                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.uniqueId}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemlebal, {flex:0.4}]}>Trade Amount:</Text>
                                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.amount}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemlebal, {flex:0.4}]}>Total BTC:</Text>
                                        <Text style={[css.boldText, {flex:0.4}]}>{this.props.btc}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemlebal, {flex:0.4}]}>Trade Fee:</Text>
                                        <Text style={[css.boldText, {flex:0.4}]}>{this.props.fee}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemlebal, {flex:0.4}]}>Fiat:</Text>
                                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.flat}</Text>
                                    </View>

                                    <Image style={{width:'100%', backgroundColor:Utils.colorGray, height:1}}/>

                                    <View style={{flexDirection:'row', marginVertical:20, margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemlebal, {flex:0.4}]}>Created At:</Text>
                                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.time}</Text>
                                    </View>
                                   
                                </View>
                        </TouchableHighlight>
                        )}
                  })()}    
            </View>
          </View>                
        );
    }
}
export default Adapter;
