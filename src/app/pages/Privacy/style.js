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
		width:'95%',
		marginHorizontal:10,
		marginVertical:20,
		backgroundColor:Utils.colorWhite
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
	title:{
		fontSize:18,
		marginTop:10,
		alignSelf:'center'
	},
	dialogSubtitle:{
		marginBottom:20,
		marginHorizontal:20
	}

})