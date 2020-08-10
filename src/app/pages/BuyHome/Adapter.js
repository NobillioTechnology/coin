import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image, TouchableHighlight
} from "react-native";
import css from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';

class Adapter extends Component {
    render() {
        return (
          <View>
            <View style={[css.itemBody, css.shadow]}>
                    <View style={{margin:5}}>
                        <View style={{flexDirection:'row', margin:10}}>
                                <View style={{}}>
                                    <Text style={[css.itemStatus, {color:Utils.colorBlue}]} onPress={()=>this.props.userProfile(this.props.userId)}>{this.props.username} </Text>
                                    <View style={{flexDirection:'row', marginTop:5, alignItems:'center'}}>
                                        {this.props.status.substring(0,4)=='Seen' && (
                                            <Image style={{backgroundColor:Utils.colorOrange, width:15, height:15, marginRight:10, borderRadius:20}} />
                                        )}
                                        {this.props.status=='Online' && (
                                            <Image style={{backgroundColor:Utils.colorGreen, width:15, height:15, marginRight:10, borderRadius:20}} />
                                        )}
                                        {this.props.status=='Away' && (
                                            <Image style={{backgroundColor:Utils.colorGray, width:15, height:15, marginRight:10, borderRadius:20}} />
                                        )}
                                        <Text style={[{color:Utils.colorBlack}]}>{this.props.status} <Text style={{color:Utils.colorBlue}} onPress={()=>this.props.openFeed(this.props.userId)}>(+{this.props.feedback.positive} / -{this.props.feedback.negative})</Text></Text>
                                    </View>
                                </View>
                            <Text style={css.itemCntry}>{this.props.bitcoin} {this.props.currency}</Text>
                        </View>
                        <View style={{flexDirection:'row', margin:10}}>
                            <Text style={[css.itemlebal, {flex:0.4}]}>To Pay In Dollar:</Text>
                            <Text style={[css.boldText, {flex:0.6}]}>{this.props.text1label}</Text>
                        </View>
                        <View style={{flexDirection:'row', margin:10}}>
                            <Text style={[css.itemlebal, {flex:0.4}]}>Payment Method:</Text>
                            <Text style={[css.boldText, {flex:0.6}]}>{this.props.paymentMethod}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginHorizontal:5}}>
                            <Text style={[css.itemlebal, {flex:0.4}]}></Text>
                            <View style={{flex:0.65, marginBottom:10, flexDirection:'row', flexWrap:'wrap'}}>
                                {this.props.tags.map((item)=>{
                                    return(
                                        <View style={css.tagBox}>
                                            <Text style={{color:'#568da2'}}>{item}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        <Image style={{width:'100%', backgroundColor:Utils.colorGray, height:1}}/>

                        <View style={{flexDirection:'row', margin:15, alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
                            <Text style={css.itemlebal}>Limit:</Text>
                            <Text style={css.boldText}>  {this.props.limit} {this.props.currency}</Text>
                        </View>
                        <TouchableHighlight underlayColor='none' style={css.buyButton} onPress={()=>{
                            if(this.props.role=='Buy'){
                                this.props.buyButton(this.props.id);
                            }else
                                this.props.sellButton(this.props.id);
                        }}>
                            <View>
                                <Text style={{fontSize:Utils.subHeadSize}}>{this.props.role}</Text>
                            </View>
                        </TouchableHighlight>
                        </View>                       
                    </View>
               </View>
          </View>                
        );
    }
}
export default Adapter;
