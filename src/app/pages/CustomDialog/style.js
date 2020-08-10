import { StyleSheet } from 'react-native';
import Utils from '../Utils';

export default StyleSheet.create({

itemBody:{
	flexDirection:'row',

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
		width:'90%',
		alignSelf:'center',
		alignItems: 'center',
		backgroundColor : Utils.colorWhite,
		height: 400,
		borderWidth: 1,
		borderColor:Utils.colorPrimary,
		borderRadius:17,
	},
	close:{
		position:'absolute',
		right:20,
		top:10,
		fontSize:Utils.headSize+5
	},
	dialogTitle:{
		color:Utils.colorBlack,
		fontSize:Utils.headSize,
		margin:10
	},
	dialogSubtitle:{
		color:Utils.colorBlack,
		fontSize:Utils.subHeadSize,
		width:'90%',
		marginTop:10,
		alignSelf:'center',
		textAlign:'center'
	},
	bitAddressView:{
		width:'90%',
		marginTop:15,
		borderRadius:5,
		borderWidth:2,
		borderColor:Utils.colorGray,
		height:45,
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row'
	},
	bitAddress:{
		fontSize:Utils.textSize-1,
		paddingHorizontal:5,
		flex:0.9,
	},
	copyIcon:{
		color:Utils.colorTurquoise,
		fontSize:20,
		flex:0.1
	},
	qr:{
		width:150,
		height:150,
		marginTop:20,
		alignSelf:'center'
	}

})