import { StyleSheet, Dimensions, Platform } from 'react-native';
import Utils from '../Utils';

const width=Dimensions.get('window').width/5;

var iconWidth = '100%', iconHeight='99%';

if(Platform.OS=='ios'){
	iconWidth = width-35;
	iconHeight = width-28;
}

export default StyleSheet.create({
 view:{
 	height:60,
 	flexDirection:'row',
 	justifyContent:'center',
 	alignItems:'center',
 	borderRadius:10,
    backgroundColor:Utils.colorAliceBlue
 },
 viewForContent:{
	alignItems:'center',
	justifyContent:'center',
	width:'100%',
	marginVertical:1
 },
 item:{
 	width:width,
 },
 icon:{
 	width:iconWidth,
 	height:iconHeight,
 	resizeMode:'contain'
 }
})