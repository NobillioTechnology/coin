import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Utils.colorWhite,
	},
	container:{
		flex:1,
		marginBottom:25,
	},
	logo:{
		width:width/1.5,
		height:height/3,
		alignSelf:'center',
		backgroundColor:Utils.colorWhite,
		zIndex:99,
		resizeMode:'center'
	},
	cardView:{
		borderRadius:5,
		backgroundColor:Utils.colorWhite,
		width:width-20,
		alignSelf:'center',
		marginVertical:10
	},
	borderView:{
		width:'90%',
		alignSelf:'center',
		borderRadius:5,
		borderColor:Utils.colorGray,
		borderWidth:1,
	},
	shadow:{
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
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
