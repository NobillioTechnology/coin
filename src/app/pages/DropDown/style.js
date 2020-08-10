import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils';

const height = Dimensions.get('window').height;
export default StyleSheet.create({

itemBody:{
	flexDirection:'row',
},
dialogue:{
	alignSelf:'center',
	justifyContent:'center',
	backgroundColor:'#00000088',
	width:'100%',
	height:'100%'
	},
	dialogueContainer:{
		maxHeight:height-20,
		width:'90%',
		alignSelf:'center',
		backgroundColor : Utils.colorWhite,
		borderWidth: 1,
		borderColor:Utils.colorPrimary,
		borderRadius:17,
		paddingVertical:10,
	},
	dropItem:{
		fontSize:Utils.headSize,
		color:Utils.colorBlack,
		marginVertical:10,
		marginHorizontal:15
	},
	

})