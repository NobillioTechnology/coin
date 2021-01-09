import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	body:{
		flex:1,
		width:width,
		height:height,
		backgroundColor:Utils.colorWhite,
	},
	header:{
		width:width,
		alignSelf:'flex-start'
	},
	visitButton:{
		width:width/2-20,
		marginHorizontal:5
	},
 })