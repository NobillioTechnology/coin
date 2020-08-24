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
		flex:1
	},
	logo:{
		width:'65%',
		height:170,
		marginBottom:10,
		alignSelf:'center',
		backgroundColor:Utils.colorWhite,
		zIndex:99
	},
	tagLine:{
		width:'90%',
		textAlign:'center',
		alignSelf:'center',
		marginTop:5,
		fontSize:Utils.textSize
	},
	imageBuyView:{
		width:'85%',
		height:90,
		alignItems:'center',
		justifyContent:'center',
	},
	imageBuy:{
		width:'100%',
		height:'100%',
		resizeMode:'center'
	},
	capsule:{
		marginTop:30,
		backgroundColor:Utils.colorGreen,
		height:45,
		alignItems:'center',
		flexDirection:'row',
		borderRadius:45,
		width:200,
		justifyContent:'center'
	},
	qrImage:{
		width:20,
		height:20,
		position:'absolute',
		right:20
	},
	container:{
		flex:1,
		width:'100%',
		alignItems:'center'
	},
	plusMsg:{
		width:60,
		height:60,
		position:'absolute',
		right:15,
		bottom:75,
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row',
		borderRadius:45,
		backgroundColor:Utils.colorBlue
	},
	plusMsgIcon:{
		// width:'100%',
		// height:'100%',
		// resizeMode:'center'
		fontSize:Utils.headSize,
		color:Utils.colorWhite
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
	rowView:{
		flexDirection:'row', 
		marginVertical:15,
		width:'90%', 
		alignSelf:'center'
	},
	textLabelWallet:{
		fontSize:Utils.subHeadSize,
		flex:0.5
	},
	textValueWallet:{
		fontSize:Utils.subHeadSize,
		fontWeight:'bold',
		flex:0.5
	},
	textLabel:{
		fontSize:Utils.textSize,
		paddingHorizontal:5,

	},
	textValue:{
		fontSize:Utils.textSize,
		fontWeight:'bold',
		minHeight:30,
		textAlignVertical:'center',
		textAlign:'center'
	},
	columnTotal:{
		flex:1,
		alignItems:'center', 
		borderWidth:2, 
		borderColor:Utils.colorGray,
		marginHorizontal:2,
		borderRadius:5
	},
	line:{
		width:'100%',
		height:1,
		backgroundColor:Utils.colorGray,
		marginVertical:2
	},
	itemBody:{
		width:'95%',
		margin:5,
		backgroundColor:Utils.colorWhite,
		borderRadius:10,
		alignSelf:'center'
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
	itemlebal:{
		color:Utils.colorDarkGray
	},
	boldText:{
		fontWeight:'bold',
		color:Utils.colorBlack
	},
})