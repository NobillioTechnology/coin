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
	texthint:{
		color:Utils.colorGray,
		alignSelf:'center',
		fontSize:13,
		marginTop:5
	},
	textInput:{
		height:40,
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		marginTop:10,
		width:'90%',
		alignSelf:'center',
		justifyContent:'center',
		paddingRight:30,
		paddingLeft:10
	},
	textInputError:{
		height:40,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorRed,
		marginTop:10,
		width:'90%',
		alignSelf:'center',
		justifyContent:'center',
		paddingRight:30,
		paddingLeft:10
	},
	textHeading:{
		color:Utils.colorBlack,
		fontSize:18,
		alignSelf:'center',
		marginTop:10
	},
	rightIcon:{
		position:'absolute',
		right:10,
		top:7,
		fontSize:22
	},
	textSelectPhoto:{
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		height:40,
		width:'100%',
		flex:1,
		paddingLeft:10,
		paddingTop:10,
		color:Utils.colorGray
	},
	sendButton:{
		backgroundColor:Utils.colorGreen,
		width:'55%',
		height:40,
		alignSelf:'center',
		borderRadius:5,
		marginLeft:-10,
		marginTop:20,
		marginBottom:20,
		alignItems:'center',
		justifyContent:'center'
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