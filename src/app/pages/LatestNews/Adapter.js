import React, { Component } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from "react-native";
import css from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';

class Adapter extends Component {
    render() {
        return (
          <View>
            <View style={css.itemBody}>
                <TouchableHighlight underlayColor='none' onPress={()=>this.props.openNews(this.props.link)}>
                    <View style={{margin:15}}>
                        <Image source={{uri:this.props.imageUri}} style={css.itemImage}/>
                        <View style={css.itemDetails}>
                            <Text style={css.itemTitle}>{this.props.title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <Image style={{width:'100%', backgroundColor:Utils.colorGray, height:1}}/>
            </View>
          </View>                
        );
    }
}
export default Adapter;
                        // <Text style={css.itemSubtitle}>{this.props.subtitle}</Text>
                        // <Text style={css.readMore}>Read More:</Text>
