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
	logo:{
		width:width/1.5,
		height:width/1.5
	},
	noteLine:{
		fontSize:18,
		marginTop:10
	},
	visitButton:{
		padding:12,
		paddingHorizontal:20,
		marginTop:50,
		backgroundColor:Utils.colorDarkBlue,
		borderRadius:15,
	}
 })