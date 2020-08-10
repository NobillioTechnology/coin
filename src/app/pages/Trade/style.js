import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils';
const height = Dimensions.get('window').height;
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
	mainView:{
		minHeight:height-110,
	},
	container:{
		width:'100%',
		flex:1,
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
	head:{
		backgroundColor:Utils.colorDarkBlue,
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		height:35
	},
	heading:{
		color:Utils.colorWhite,
		fontSize:Utils.subHeadSize,
		marginHorizontal:5
	},
	rightIcon:{
		position:'absolute',
		right:20,
		fontSize:18,
		color:Utils.colorWhite
	},
	detailBody:{
		backgroundColor:Utils.colorWhite,

	},
	category:{
		flexDirection:'row',
		marginVertical:22,
		marginHorizontal:15
	},
	categoryText:{
		color:Utils.colorBlack
	},
	whiteCard:{
		backgroundColor:Utils.colorWhite,
		width:'95%',
		alignSelf:'center',
	},
	cardText:{
		height:35,
		marginTop:10,
		fontSize:16,
		marginLeft:10
	},
	buttonGreen:{
		width:width/1.4,
		minHeight:45,
		backgroundColor:Utils.colorGreen,
		minWidth:90,
		borderRadius:15,
		alignItems:'center',
		justifyContent:'center',
		alignSelf:'center',
		marginVertical:10
	}

})