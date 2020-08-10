import {Dimensions, StyleSheet } from 'react-native';
import Utils from '../Utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Utils.colorWhite,
		alignItems:'center',
		justifyContent:'center',
	},
	logo:{
		width:width/1.5,
		height:height/3,
	},
	logoTime:{
		width:'55%',
		height:'25%',
		marginBottom:10,
		backgroundColor:'yellow',
		zIndex:99
	},
	noteLine:{
		fontSize:18,
		marginTop:10
	},
	visitButton:{
		padding:10,
		marginTop:50,
		backgroundColor:Utils.colorGreen,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray
	}
 })