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
		width:'100%',
		flex:1
	},
	swipe:{
		flex:0.8,
		minHeight:600
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
	itemBody:{
		width:'95%',
		margin:5,
		backgroundColor:Utils.colorWhite,
		borderRadius:10,
		alignSelf:'center'
	},
	switchButton:{
		alignSelf:'flex-start'
	},
	activeStatus:{
		backgroundColor:'orange',
		paddingHorizontal:7,
		paddingVertical:2,
		borderRadius:5,
		marginLeft:20
	},
	itemCntry:{
		color:Utils.colorBlack,
		position:'absolute',
		right:5,
		fontWeight:'bold'
	},
	itemProfile:{
		width:15,
		height:15,
		backgroundColor:Utils.colorGreen
	},
	itemlebal:{
		color:Utils.colorDarkGray
	},
	boldText:{
		fontWeight:'bold',
		color:Utils.colorBlack
	},
	itemEditButtonView:{
		backgroundColor:Utils.colorOrange,
		borderRadius:10,
		marginLeft:10,
		minWidth:50,
		minHeight:40,
		alignItems:'center',
		justifyContent:'center',
		paddingHorizontal:10
	},
	itemEditButton:{
		color:Utils.colorWhite
	},
	heading:{
		fontSize:20,
		fontWeight:'bold',
		alignSelf:'center',
		marginTop:10,
	},
	longText:{
		width:'90%',
		fontSize:Utils.textSize,
		alignSelf:'center',
		marginVertical:20,
	},
	dialogueContainer:{
		width:'90%',
		alignSelf:'center',
		alignItems: 'center',
		backgroundColor : Utils.colorWhite, 
		height: 120,
		borderWidth: 1,
		borderColor:Utils.colorPrimary,
		borderRadius:17,
	},
	okButton:{
		width:'49%',
		height:45,
		backgroundColor:Utils.colorGreen,
		alignItems:'center',
		justifyContent:'center',
		borderRadius:5,
	},
	cancelButton:{
		width:'49%',
		height:45,
		backgroundColor:Utils.colorRed,
		alignItems:'center',
		justifyContent:'center',
		borderRadius:5,
		position:'absolute',
		right:0
	}

})