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
                    <View style={{margin:5, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:0.2}}>
                            <Image source={{uri:this.props.profilePic}} style={css.itemProfile}/>
                        </View>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row'}}>
                            <Text style={[css.boldText]}>{this.props.username}</Text>
                            <Text style={[css.boldText, {right:0, position:'absolute'}]}>{this.props.time.substring(11,16)},  {this.props.time.substring(0,10)}</Text>
                            </View>
                            {this.props.type=='negative' ? (
                                <Icon name='thumbs-down' style={{fontSize:22, color:Utils.colorBlue}}/>
                            ):(
                                <Icon name='thumbs-up' style={{fontSize:22, color:Utils.colorBlue}}/>
                            )}
                        </View>
                    </View>
               </View>
          </View>                
        );
    }
}
export default Adapter;
