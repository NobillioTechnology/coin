import { StyleSheet } from 'react-native';
import Utils from '../Utils'

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
		width:'95%',
		margin:10,
		marginBottom:30,
		backgroundColor:Utils.colorWhite
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
	radioView:{
		width:'100%',
		flexDirection:'row',
		marginTop:20,
		marginLeft:20,
		alignItems:'center',
	},
	radioText:{
		marginTop:-5,
		flex:0.3
	},
	pickerView:{
		alignSelf:'center',
		flex:0.55,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		height:40,
		justifyContent:'center'
	},
	pickerViewError:{
		alignSelf:'center',
		flex:0.55,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorRed,
		height:40,
		justifyContent:'center'
	},	
	picker:{
		marginTop:-10
	},
	inputText:{
		flex:0.55,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		height:40,	
	},
	inputTextError:{
		flex:0.55,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorRed,
		height:40,	
	},
	inputTextArea:{
		width:'90%',
		height:80,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		marginTop:10,
		textAlign:'left',
		textAlignVertical:'top'
	},
	inputTextAreaError:{
		width:'90%',
		height:80,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorRed,
		marginTop:10,
		textAlign:'left',
		textAlignVertical:'top'
	},
	detailRow:{
		flexDirection:'row',
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		height:45,
		alignItems:'center',
		marginTop:5,
		width:'90%',
		paddingLeft:20,
		paddingRight:30
	},
	detailText:{
		marginLeft:10,
	},
	rightIcon:{
		position:'absolute',
		right:20,
		fontSize:22
	},
	sendButton:{
		backgroundColor:Utils.colorGreen,
		width:'85%',
		height:40,
		alignSelf:'center',
		textAlign:'center',
		borderRadius:5,
		marginLeft:-10,
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
	},
	captcha:{
		width:'85%',
		marginLeft:20,
		height:45,
		borderRadius:5,
		borderColor:Utils.colorGray,
		borderWidth:1,
		marginTop:20,
		alignItems:'center',
		justifyContent:'center'
	},
	captchaError:{
		width:'85%',
		marginLeft:20,
		height:45,
		borderRadius:5,
		borderColor:Utils.colorRed,
		borderWidth:1,
		marginTop:20,
		alignItems:'center',
		justifyContent:'center'
	},
	

})