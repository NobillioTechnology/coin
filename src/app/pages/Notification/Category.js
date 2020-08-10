import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import css from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';

class Category extends Component {
    render() {
        return (
          <View>
                    <View style={css.itemBody}>
                        <View style={{flexDirection:'row', flex:1, margin:15}}>
                            <Icon name={this.props.imageUri} style={css.imageUri}/>
                            <View style={css.itemDetails}>
                                <Text style={css.itemName}>{this.props.name}</Text>
                                <Text style={css.itemMessage}>{this.props.message}</Text>
                            </View>
                            <View style={css.itemTimeView}>
                                <Text style={css.itemTime}>{this.props.time}</Text>
                            </View>
                        </View>
                        <Image style={{width:'88%', backgroundColor:Utils.colorGray, height:1, marginLeft:18}}/>
                    </View>
          </View>                
        );
    }
}
export default Category;
