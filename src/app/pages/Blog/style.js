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
		width:'100%',
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
	headImage:{
		width:'100%',
		height:300,
	},
	headText:{
		position:'absolute',
		bottom:60,
		backgroundColor:'green',
		color:Utils.colorWhite,
		fontSize:18,
		width:'60%',
		textAlign:'center',
		alignSelf:'center',
		height:45,
		paddingTop:10,
		borderRadius:25,
		borderWidth:1,
		borderColor:Utils.colorWhite
	},


	itemBody:{
		marginLeft:10,
		marginRight:10
	},
	itemImage:{
		width:'100%',
		height:200,
		borderTopLeftRadius:25,
		borderTopRightRadius:25
	},
	itemDetails:{
		marginTop:10
	},
	itemTitle:{
		color:Utils.colorBlack,
		fontSize:20,
		marginBottom:10
	},
	readMore:{
		color:Utils.colorDarkBlue,
		marginTop:5
	}
})