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
import commonCss from "../Utils/commonCss";

class Adapter extends Component {
    render() {
        return (
          <View>
            <View style={[css.itemBody, Platform.OS=='ios' ? commonCss.shadowIos : css.shadow]}>
                <View style={{margin:5}}>
                    <View style={{flexDirection:'row', margin:10}}>
                        <Text style={[css.itemlebal, {flex:0.4}]}>Browser:</Text>
                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.browser}</Text>
                    </View>
                    <View style={{flexDirection:'row', margin:10}}>
                        <Text style={[css.itemlebal, {flex:0.4}]}>Ip Address:</Text>
                        <Text style={[css.boldText, {flex:0.6}]}>{this.props.ip}</Text>
                    </View>

                    <Image style={{width:'100%', backgroundColor:Utils.colorGray, height:1}}/>

                    <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center', width:'100%'}}>
                        <Text style={css.itemlebal}>Date:</Text>
                        <Text style={css.boldText}>  {this.props.date} {this.props.currency}</Text>
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
