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
		flex:1
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
	editText:{
		backgroundColor:Utils.colorWhite,
		flex:0.5,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		textAlign:'center',
		justifyContent:'center',
		minHeight:45
	},
	editTextRight:{
		backgroundColor:Utils.colorWhite,
		flex:0.5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		borderRadius:5,
		justifyContent:'center',
		minHeight:45
	},
	submit:{
		backgroundColor:Utils.colorGreen,
		borderRadius:5,
		width:'40%',
		height:40,
		marginTop:10,
		textAlign:'center',
		alignSelf:'center',
		alignItems:'center',
		justifyContent:'center'
	},
	itemBody:{
		width:'95%',
		margin:5,
		backgroundColor:Utils.colorWhite,
		borderRadius:10,
		alignSelf:'center',
	},
	itemStatus:{

	},
	activeStatus:{
		backgroundColor:'orange',
		padding:2,
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
		color:Utils.colorBlack,
	},
	buyButton:{
		backgroundColor:Utils.colorOrange,
		position:'absolute',
		right:10,
		padding:5,
		paddingLeft:10,
		paddingRight:10,
		color:Utils.colorWhite,
		borderRadius:5,

	},
	sellButton:{
		backgroundColor:Utils.colorOrange,
		position:'absolute',
		right:10,
		padding:5,
		paddingLeft:10,
		paddingRight:10,
		color:Utils.colorWhite,
		borderRadius:5,
	},
	itemEditButton:{
		position:'absolute',
		right:10,
		backgroundColor:Utils.colorGreen,
		borderRadius:10,
		padding:10
	},
	row:{
		margin:10, 
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	amountView:{
		flex:0.5,
		alignItems:'center',
		alignSelf:'center', 
		flexDirection:'row',
		borderWidth:1,
		borderColor:Utils.colorGray,
		borderRadius:5
	},
	amountViewError:{
		flex:0.5,
		alignItems:'center',
		alignSelf:'center', 
		flexDirection:'row',
		borderWidth:2,
		borderColor:Utils.colorRed,
		borderRadius:5
	},
	amountInput:{
		flex:0.6,
		textAlign:'center'
	},
	amountBtc:{
		textAlign:'center',
	},
	amountButton:{
		backgroundColor:Utils.colorGray,
		height:50,
		alignItems:'center',
		justifyContent:'center',
		flex:0.4,
	},
	tradeTextBold:{
		fontWeight:'bold',
		marginTop:10,
		marginLeft:10,
		flex:0.5
	},
	tradeText:{
		marginTop:10,
		marginLeft:10,
		flex:0.5
	},
	heading:{
		fontSize:20,
		fontWeight:'bold',
		alignSelf:'center',
		marginTop:20,

	},
	note:{
		color:Utils.colorRed,
		alignSelf:'center'
	},
	submitButton:{
		backgroundColor:Utils.colorGreen,
		borderRadius:5,
		height:45,
		alignItems:'center',
		justifyContent:'center',
		marginTop:10,
		marginBottom:20,
		width:'80%',
		alignSelf:'center'
	},
	longText:{
		width:'90%',
		alignSelf:'center',
		marginVertical:15,
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
	},
	tagBox:{
		borderColor:'#afd7e6',
		backgroundColor:'#b6b6b644', 
		margin:5, 
		paddingHorizontal:5, 
		borderWidth:1
	}
})