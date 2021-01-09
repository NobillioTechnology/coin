import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image, TouchableHighlight, Platform
} from "react-native";
import css from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
import SwipeToRefresh from 'react-native-pull-to-refresh';


class Adapter extends Component {
    render() {
        return (
            <View>
                <View style={[css.itemBody, Platform.OS=='ios' ? css.shadowIos : css.shadow]}>
                    <View style={{margin:5}}>
                            <TouchableHighlight underlayColor='none'>
                                <View style={{margin:5}}>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        <Text style={[css.itemlebal, {flex:0.4}]}>Date:</Text>
                                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.time}</Text>
                                    </View>
                                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                        {this.props.type=='r' ? (
                                            <Text style={[css.itemlebal, {flex:0.4}]}>Received Amount:</Text>
                                        ):(
                                            <Text style={[css.itemlebal, {flex:0.4}]}>Sent Amount:</Text>
                                        )}
                                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.amount}</Text>
                                    </View>
                                    {/* {this.props.type=='s' && (
                                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                            <Text style={[css.itemlebal, {flex:0.4}]}>To:</Text>
                                            <Text style={[css.boldText, {flex:0.6}]}>{this.props.toAddress}</Text>
                                        </View>
                                    )} */}
                                    <View>
                                    {this.props.transactionId!=undefined && (
                                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                            <Text style={[css.itemlebal, {flex:0.4}]}>Transaction Id:</Text>
                                            <Text style={[css.boldText, {flex:0.6, color:Utils.colorBlue}]} onPress={()=>this.props.openTxn(this.props.transactionId)}>{this.props.transactionId}</Text>
                                        </View>                                                                    
                                    )}
                                   {this.props.desc!=undefined && (
                                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                            <Text style={[css.itemlebal, {flex:0.4}]}>Description:</Text>
                                            <Text style={[css.boldText, {flex:0.6}]}>{this.props.desc}</Text>
                                        </View>
                                    )}
                                    </View>
                                </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>                
        );
    }
}
export default Adapter;
