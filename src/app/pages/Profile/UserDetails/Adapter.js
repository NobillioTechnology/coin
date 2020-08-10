import React, { Component } from "react";
import {
    View,
    Text,
    Image, TouchableHighlight
} from "react-native";
import css from './style';
import Utils from '../../Utils';

class Adapter extends Component {
    render() {
        return (
          <View>
            <View style={[css.itemBody, css.shadow]}>
                    <View style={{margin:5}}>
                        <View style={{flexDirection:'row', margin:10}}>
                            <Text style={[css.itemlebal, {flex:0.4}]}>Seller : </Text>
                            <Text style={[css.itemStatus, {color:Utils.colorBlue}]}>{this.props.username} </Text>
                        </View>
                        <View style={{flexDirection:'row', margin:10}}>
                            <Text style={[css.itemlebal, {flex:0.4}]}>Price/BTC : </Text>
                            <Text style={[css.boldText, {flex:0.6}]}>{this.props.price}</Text>
                        </View>
                        <View style={{flexDirection:'row', margin:10}}>
                            <Text style={[css.itemlebal, {flex:0.4}]}>Payment Method : </Text>
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
                                this.props.buyButton(this.props.id);
                        }}>
                            <View>
                                <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorWhite}}>Buy</Text>
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
