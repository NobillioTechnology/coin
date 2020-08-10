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
		alignItems:'center'
	},
	itemBody:{
		width:'90%',
		backgroundColor:Utils.colorWhite,
		margin:5,
		borderRadius:15,
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
		width:150,
		height:50,
		alignSelf:'center',
		marginTop:10, 
		resizeMode:'center'
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