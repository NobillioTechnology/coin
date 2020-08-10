import { StyleSheet } from 'react-native';
import Utils from '../../Utils'

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
		backgroundColor:Utils.colorWhite
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
	text:{
		fontWeight:'bold',
		marginLeft:20,
		marginTop:10
	},
	radioView:{
		width:'90%',
		flexDirection:'row',
		marginTop:5,
		marginBottom:5,
		marginLeft:20,
		alignItems:'center',
		flex:1,
	},
	radioText:{
		marginTop:5,
	},
	pickerView:{
		alignSelf:'center',
		width:'90%',
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		marginTop:10,
		paddingHorizontal:5,
		height:40,
		justifyContent:'center'
	},
	infoIcon:{
		position:'absolute',
		right:5,
		fontSize:18
	},
	inputText:{
		flex:0.55,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		height:40,	
	},
	inputTextArea:{
		width:'90%',
		height:80,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		marginTop:10,
		textAlignVertical:'top'
	},
	sendButton:{
		backgroundColor:Utils.colorGreen,
		width:'45%',
		height:40,
		alignSelf:'center',
		borderRadius:5,
		marginVertical:20,
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
		fontSize:Utils.headSize,
		color:Utils.colorDarkGray
	}

})