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
	container:{
		width:'100%',
		alignItems:'center'
	},
	itemBody:{
		width:'90%',
		backgroundColor:Utils.colorWhite,
		margin:5,
		borderRadius:15,
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
	itembodyImage:{
		width:width/4,
		height:width/6,
		alignSelf:'center',
		marginTop:10, 
		resizeMode:'contain'
	},
	title:{
		alignSelf:'center',
		margin:10,
		fontSize:Utils.subHeadSize,
	},
	itemlebal:{
		fontSize:Utils.subHeadSize,
		color:Utils.colorGray
	},
	boldText:{
		color:Utils.colorBlack,
		fontWeight:'bold',
		fontSize:Utils.subHeadSize
	}
})