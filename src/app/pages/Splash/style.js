import {Dimensions, StyleSheet } from 'react-native';
import Utils from '../Utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Utils.colorWhite,
		alignItems:'center',
	},
	logo:{
		width:width/1.2,
		height:width/1.5,
		resizeMode:'contain',
		marginTop:width/2.5
	},
	logo2:{
		width:width/1.5,
		height:width/3.5,
		resizeMode:'contain',
		marginBottom:-20
	},
	logoTime:{
		width:'55%',
		height:'25%',
		backgroundColor:'yellow',
		zIndex:99
	},
	noteLine:{
		fontSize:12,
		marginBottom:30,
		width:'80%',
		textAlign:'center',
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