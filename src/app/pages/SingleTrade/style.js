import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils'

const height = Dimensions.get('window').height;

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
	dialogueContainerImage:{
		width:'100%',
		height:'100%',
		alignItems:'center',
		justifyContent:'flex-end'
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
	submit:{
		backgroundColor:Utils.colorGreen,
		borderRadius:5,
		width:'40%',
		height:40,
		marginTop:10,
		textAlign:'center',
		paddingTop:5,
		fontSize:20,
		alignSelf:'center'
	},
	subHeading:{
		marginTop:10
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
		color:Utils.colorGray
	},
	itemlebalBold:{
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
		backgroundColor:Utils.colorGreen,
		position:'absolute',
		right:10,
		padding:5,
		paddingLeft:10,
		paddingRight:10,
		color:Utils.colorBlack,
		borderRadius:5,
	},
	row:{
		margin:10, 
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	heading:{
		fontSize:20,
		fontWeight:'bold',
		alignSelf:'center',
		marginTop:10,
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
	borderView:{
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorBlack,
		width:'90%',
		backgroundColor:Utils.colorWhite,
		height:45,
		marginTop:10,
		marginBottom:10,
		alignSelf:'center',
		alignItems:'center',
		justifyContent:'center'
	},
	buttonRed:{
		backgroundColor:Utils.colorRed,
		color:Utils.colorWhite,
		borderColor:Utils.colorRed,
		fontSize:Utils.subHeadSize
	},
	buttonGreen:{
		backgroundColor:Utils.colorGreen,
		color:Utils.colorBlack,
		borderColor:Utils.colorGreen,
		fontSize:Utils.subHeadSize,
	},
	buttonGreenDisabled:{
		backgroundColor:Utils.colorGreen+77,
		color:Utils.colorBlack,
		borderColor:Utils.colorGreen,
		fontSize:Utils.subHeadSize
	},
	myMessage:{
		alignSelf:'flex-end',
		backgroundColor:Utils.colorHintGreen,
		padding:10,
		marginRight:20,
		marginTop:20,
		borderRadius:5
	},
	otherMessage:{
		backgroundColor:Utils.colorHintGray,
		padding:10,
		marginLeft:20,
		marginTop:20,
		borderRadius:5,
	},
	myMessageTime:{
		alignSelf:'flex-end',
		marginRight:25,
		marginTop:5,
		color:Utils.colorGray
	},
	otherMessageTime:{
		marginLeft:25,
		marginTop:5,
		color:Utils.colorGray
	},
	dialogue:{
		alignSelf:'center',
		justifyContent:'center',
		flex:1,
		backgroundColor:'#00000088',
		width:'100%',
	},
	dialogueContainer:{
		width:'90%',
		alignSelf:'center',
		backgroundColor : Utils.colorWhite,
		borderWidth: 1,
		borderColor:Utils.colorGreen,
		borderRadius:17,
		height:height/1.5-30
	},
	dialogueContainerTerms:{
		width:'90%',
		alignSelf:'center',
		backgroundColor : Utils.colorWhite,
		borderWidth: 1,
		borderColor:Utils.colorGreen,
		borderRadius:17,
		minHeight:150,
	},
	dialogueContainerConfirm:{
		width:'90%',
		alignSelf:'center',
		backgroundColor : Utils.colorWhite,
		borderWidth: 1,
		borderColor:Utils.colorGreen,
		borderRadius:17,
		minHeight:150,
	},
	dialogueContainerReason:{
		width:'90%',
		alignSelf:'center',
		backgroundColor : Utils.colorWhite,
		borderWidth: 1,
		borderColor:Utils.colorGreen,
		borderRadius:17,
		minHeight:250,
	},
	dialogTitle:{
		color:Utils.colorBlack,
		fontSize:Utils.headSize,
		margin:15,
		textAlign:'center',
		marginTop:10,
		fontWeight:'bold',
		width:'50%',
		alignSelf:'center',
	},
	dialogueTextArea:{
		width:'90%',
		height:100,
		borderWidth:1,
		borderColor:Utils.colorGray,
		alignSelf:'center',
		marginVertical:20
	},
	dialogueTextAreaError:{
		width:'90%',
		height:100,
		borderWidth:2,
		borderColor:Utils.colorRed,
		alignSelf:'center',
		marginVertical:20
	},
	dialogueSubmit:{
		backgroundColor:Utils.colorGreen,
		borderRadius:5,
		width:'50%',
		alignItems:'center',
		justifyContent:'center',
		height:45,
		alignSelf:'center',
		marginVertical:20
	},
	longText:{
		width:'90%',
		fontSize:Utils.textSize,
		alignSelf:'center',
		marginVertical:20
	},
	textArea:{
		height:100,
		borderRadius:5,
		borderColor:Utils.colorGray,
		borderWidth:1,
		textAlignVertical:'top'
	},
	textAreaError:{
		height:100,
		borderRadius:5,
		borderColor:Utils.colorRed,
		borderWidth:1,
		textAlignVertical:'top'
	}

})