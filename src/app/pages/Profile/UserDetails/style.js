import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../../Utils'

const width = Dimensions.get('window').width;

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
		width:'90%',
		alignSelf:'center',
		marginVertical:10,
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
	star:{
		fontSize:22,
		marginRight:10
	},
	trustingLine:{
		fontSize:Utils.headSize
	},
	profilePicture:{
		width:70,
		height:70,
		borderRadius:45
	},
	userName:{
		alignSelf:'center',
		marginLeft:5,
		flex:0.5,
		marginTop:-20,
		fontSize:Utils.subHeadSize
	},
	trustButton:{
		backgroundColor:Utils.colorOrange,
		height:22,
		borderRadius:5,
		width:'80%',
		alignSelf:'center',
		margin:5,
		alignItems:'center',
		justifyContent:'center'
	},
	blockButton:{
		backgroundColor:Utils.colorGreen,
		height:22,
		borderRadius:5,
		width:'80%',
		alignSelf:'center',
		margin:5,
		alignItems:'center',
		justifyContent:'center'
	},
	textLabel:{
		color:Utils.colorBlack,
		flex:0.45,
		fontSize:Utils.textSize,
		fontWeight:'bold'
	},
	textValue:{
		color:Utils.colorBlack,
		flex:0.55,
		fontSize:Utils.textSize,
	},
	textLabelCheck:{
		color:Utils.colorBlack
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
	itemBody:{
		width:'95%',
		margin:5,
		backgroundColor:Utils.colorWhite,
		borderRadius:10,
		alignSelf:'center',
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
		color:Utils.colorBlack
	},
	boldText:{
		fontWeight:'bold',
		color:Utils.colorBlack,
	},
	tagBox:{
		borderColor:'#afd7e6',
		backgroundColor:'#b6b6b644', 
		margin:5, 
		paddingHorizontal:5, 
		borderWidth:1
	},
	itemStatus:{
		flex:0.5
	},
	dialogue:{
		// backgroundColor:'blue',
		alignSelf:'center',
		// minWidth: '80%',
		justifyContent:'center',
		flex:1,
	backgroundColor:'#00000088',
	width:'100%',
	},
	dialogueContainer:{
		width:280,
		alignSelf:'center',
		alignItems: 'center',
		backgroundColor : Utils.colorWhite, 
		height: 180,
		borderWidth: 1,
		borderColor:Utils.colorPrimary,
		borderRadius:17,
	},
	dialogCamera:{
		color:Utils.colorPrimary,
		fontSize:22,
		marginTop:15,
		marginBottom:15,
	},
	dialogueCancel:{
		width:280,
		backgroundColor:'#b6b6b655',
		textAlign:'center',
		fontSize:20,
		borderRadius:17,
		height:40,
		paddingTop:5,
		alignItems:'center',
		position:'absolute',
		bottom:0
	}	


})