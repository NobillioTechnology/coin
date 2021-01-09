import { StyleSheet,Dimensions } from 'react-native';
import Utils from '../../Utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Utils.colorWhite,
	},
	header:{
		flex:0.1
	},
	footer:{
		flex:0.1
	},
	container:{
		height:height-100,
		alignItems:'center',
		justifyContent:'center'
	},
	cardView:{
		backgroundColor:Utils.colorWhite,
		width:'90%',
		borderRadius:20
	},
	shadowIos:{
			shadowColor: Utils.colorBlack,
			shadowOffset: {
				width: 2,
				height: 2,
			},
			shadowOpacity: 0.5,
			shadowRadius: 4,
			elevation: 3,
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
	textLabel:{
		color:Utils.colorBlack,
		marginLeft:20,
		marginTop:10
	},
	textInputError:{
		height:40,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorRed,
		marginTop:10,
		width:'90%',
		alignSelf:'center',
		paddingLeft:10
	},
	textInput:{
		height:40,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		marginTop:10,
		width:'90%',
		alignSelf:'center',
		paddingLeft:10
	},
	iconForPassword:{
		fontSize:20, 
		color:Utils.colorDimGray,
		position:'absolute',
		right:25,
		top:45,
	},
	textHeading:{
		color:Utils.colorBlack,
		fontSize:18,
		alignSelf:'center',
		marginTop:10
	},
	sendButton:{
		backgroundColor:Utils.colorGreen,
		minWidth:'55%',
		height:40,
		alignSelf:'center',
		borderRadius:5,
		marginLeft:-10,
		marginVertical:20,
		alignItems:'center',
		justifyContent:'center',
		paddingHorizontal:20
	}
})