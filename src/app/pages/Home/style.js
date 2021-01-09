import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils';

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
	logo:{
		width:width/1.5,
		height:width/1.5,
		alignSelf:'center',
		zIndex:99,
		resizeMode:'contain'
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
		width:'120%',
		height:'120%',
		resizeMode:'contain'
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
			elevation: 7,
	},
	shadowIos:{
			shadowColor: Utils.colorPrimary,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 1,
			shadowRadius: 7,
			elevation: 3,
	},
})