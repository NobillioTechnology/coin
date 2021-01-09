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
		width:'95%',
		margin:10,
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
		width:'90%',
		marginLeft:10,
		marginBottom:20
	},
	category:{
		marginLeft:10,
	},
	headRow:{
		flexDirection:'row',
		margin:5
	},
	headRowIcon:{
		fontSize:20,		
		alignSelf:'center'
	},
	headRowText:{
		fontSize:18,
		marginLeft:10,
		alignSelf:'center'
	},
	detailRow:{
		flexDirection:'row',
		borderRadius:5,
		borderWidth:1,
		borderColor:Utils.colorGray,
		height:45,
		alignItems:'center',
		marginTop:5,
		width:'100%'
	},
	detailText:{
		marginLeft:10,
	},
	rightIcon:{
		position:'absolute',
		right:20
	}

})