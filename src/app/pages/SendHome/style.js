import { StyleSheet } from 'react-native';
import Utils from '../Utils'

export default StyleSheet.create({
	body:{
		flex:1,
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
	head:{
		backgroundColor:Utils.colorDarkBlue,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		height:35
	},
	heading:{
		color:Utils.colorWhite,
		fontSize:18,
		marginLeft:20
	},
	rightIcon:{
		position:'absolute',
		right:20,
		fontSize:18,
		color:Utils.colorWhite
	},
	borderBodyError:{
		backgroundColor:Utils.colorWhite,
		margin:10,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorRed,
		padding:10
	},
	borderBody:{
		backgroundColor:Utils.colorWhite,
		margin:10,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		padding:10,
		width:'90%',
		alignSelf:'center'
	},
	textLabel:{
		color:Utils.colorBlack,
		flex:0.5
	},
	textValue:{
		color:Utils.colorGray,
		flex:0.5
	},
	textHeading:{
		color:Utils.colorBlack,
		fontSize:16,
		width:'90%',
		alignSelf:'center'
	},
	pickerView:{
		flex:0.45,
		marginTop:10,
		backgroundColor:Utils.colorWhite,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		justifyContent:'center',
		alignItems:'center'
	},
	pickerViewError:{
		flex:0.45,
		marginTop:10,
		backgroundColor:Utils.colorWhite,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorRed,
		justifyContent:'center',
		alignItems:'center'
	},
	picker:{

	},
	submit:{
		backgroundColor:Utils.colorGreen,
		borderRadius:5,
		width:'30%',
		height:40,
		marginTop:10,
		alignSelf:'center',
		alignItems:'center',
		justifyContent:'center'
	},
	placeholder:{
		width:'100%', 
		paddingHorizontal:5,
		color:Utils.colorGray
	},
	dropItemSelected:{
		width:'100%', 
		paddingHorizontal:5,
		color:Utils.colorBlack
	},
	dropIcon:{
		position:'absolute', 
		right:15,
		top:7,
		fontSize:Utils.headSize,
		color:Utils.colorDarkGray
	}

})