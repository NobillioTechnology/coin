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
	itemBody:{
		width:'95%',
		margin:5,
		backgroundColor:Utils.colorWhite,
		borderRadius:10,
		alignSelf:'center',
	},
	itemProfile:{
		width:50,
		height:50,
		borderRadius:30
	},
	itemlebal:{
		color:Utils.colorDarkGray
	},
	boldText:{
		fontWeight:'bold',
		color:Utils.colorBlack,
	},

})