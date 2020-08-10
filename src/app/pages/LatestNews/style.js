import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Utils.colorWhite
	},
	header:{
		flex:0.1
	},
	footer:{
		flex:0.1
	},
	container:{
		width:'100%',
	},
	shadow:{
			shadowColor: Utils.colorPrimary,
			shadowOffset: {
				width: 0,
				height: 9,
			},
			shadowOpacity: 1,
			shadowRadius: 11.95,
			elevation: 10,
	},
	itemBody:{
	},
	itemImage:{
		width:'100%',
		height:200,
		alignSelf:'center',
	},
	itemDetails:{
		marginTop:10
	},
	itemTitle:{
		color:Utils.colorBlack,
		fontSize:20,
		marginBottom:10
	},
	readMore:{
		color:Utils.colorDarkBlue,
		marginTop:5
	},
	image:{
		width:width,
		height:height/2.5,
		position:'absolute',
		top:0,
		backgroundColor:'#f2f2f2'
	},

})