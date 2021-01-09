import { StyleSheet, Platform } from 'react-native'
import Utils from '../Utils'

let height = 0;
if(Platform.OS=='ios')
	height = 20;

export default StyleSheet.create({
 view:{
 	width:null,
 	height:50,
 	marginTop:height,
 	flexDirection:'row',
 },
 iconForBack:{
 	fontSize:22,
	alignSelf:'center',
 	marginLeft:10,
	 color:Utils.colorBlack,
	 padding:10,
 },
 title:{
 	color:Utils.colorBlack,
 	alignSelf:'center',
 	fontSize:Utils.headSize,
 	marginLeft:10 	
 },
 iconForView:{
 	fontSize:22,
 	flex:0.1,
 	height:45,
 	position:'absolute',
 	right:15,
 	top:17,
 },
 notification:{
 	fontSize:20,
 	position:'absolute',
 	right:10,
	alignSelf:'center',
 	color:Utils.colorBlack,
 	flex:0.3
 }

})