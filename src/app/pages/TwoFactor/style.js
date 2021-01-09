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
		width:'80%',
		backgroundColor:Utils.colorWhite,
		margin:5,
		borderRadius:15,
	},
	buttonRed:{
		backgroundColor:Utils.colorRed,
		marginTop:10,
		marginBottom:20,
		height:40,
		alignSelf:'center',
		alignItems:'center',
		justifyContent:'center',
		borderRadius:7,
		paddingHorizontal:10
	},
	buttonGreen:{
		backgroundColor:Utils.colorGreen,
		marginTop:10,
		marginBottom:20,
		height:40,
		paddingHorizontal:10,
		alignSelf:'center',
		alignItems:'center',
		justifyContent:'center',
		borderRadius:7
	},
	disbleText:{
		color:Utils.colorWhite,
		fontSize:Utils.textSize
	},

itemBodyDialog:{
	flexDirection:'row',

},
dialogue:{
		// backgroundColor:'blue',
		alignSelf:'center',
		// minWidth: '80%',
		flex:1,
	backgroundColor:'#00000088',
	width:'100%',
	},
	dialogueContainer:{
		width:'90%',
		alignSelf:'center',
		alignItems: 'center',
		backgroundColor : Utils.colorWhite,
		minHeight: 470,
		borderWidth: 1,
		borderColor:Utils.colorPrimary,
		borderRadius:17,
		marginTop:50,
		marginBottom:250
	},
	dialogTitle:{
		color:Utils.colorBlack,
		fontSize:20,
		margin:10
	},
	dialogSubtitle:{
		color:Utils.colorBlack,
		fontSize:15,
		width:'90%',
		marginTop:10,
		textAlign:'center'
	},
	bitAddressView:{
		width:'90%',
		marginTop:10,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorGray,
		height:45,
	},
	bitAddressViewError:{
		width:'90%',
		marginTop:10,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorRed,
		height:45,
	},
	bitAddress:{
		paddingLeft:10,
		height:'100%'
	},
	copyIcon:{
		color:Utils.colorTurquoise,
		alignSelf:'flex-end',
		marginRight:20,
		fontSize:20,
		marginHorizontal:10,
		marginTop:15
	},
	qr:{
		width:166,
		height:166,
		marginTop:10,
	},
	button:{
		backgroundColor:Utils.colorDarkBlue,
		height:45,
		paddingHorizontal:20,
		paddingTop:15,
		color:Utils.colorWhite
	},	
	submit:{
		fontSize:18,
		backgroundColor:Utils.colorGreen,
		borderRadius:5,
		width:'90%',
		height:40,
		marginTop:15,
		marginBottom:10,
		alignItems:'center',
		justifyContent:'center'
	},
	plusMsg:{
		width:45,
		height:45,
		backgroundColor:Utils.colorDarkBlue,
		borderRadius:90,
		position:'absolute',
		right:15,
		bottom:60,
		alignItems:'center',
		justifyContent:'center',
		borderWidth:0.5,
		borderColor:Utils.colorPrimary
	},
	plusMsgIcon:{
		color:Utils.colorPrimary,
		width:23,
		height:23
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
})