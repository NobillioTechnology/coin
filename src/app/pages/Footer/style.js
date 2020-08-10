import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils';

const width=Dimensions.get('window').width/5;

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
 	width:'100%',
 	height:'99%',
 	resizeMode:'center'
 }
})