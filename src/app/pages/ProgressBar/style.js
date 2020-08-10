import { StyleSheet } from 'react-native';
import Utils from '../Utils';

export default StyleSheet.create({

itemBody:{

},
dialogue:{
		alignSelf:'center',
		justifyContent:'center',
		backgroundColor:'#00000088',
		width:'100%',
		height:'100%',
		alignItems:'center',
		flex:1
	},
	dialogueContainer:{
		width:'90%',
		backgroundColor : Utils.colorWhite,
		borderWidth: 1,
		borderColor:Utils.colorGreen,
		borderRadius:17,
		height:'auto',
		minHeight:'25%'
	},
	dialogTitle:{
		color:Utils.colorBlack,
		fontSize:Utils.headSize+3,
		marginTop:10,
		marginBottom:15,
		alignSelf:'center',
	},
	dialogueMessage:{
		color:Utils.colorBlack,
		fontSize:Utils.subHeadSize,
		width:'90%',
		marginVertical:10,
		flex:0.8,
		marginBottom:5,
	},
	dialogueMessageAlert:{
		color:Utils.colorBlack,
		fontSize:Utils.subHeadSize,
		width:'90%',
		marginVertical:5,
	},
	ok:{
		alignSelf:'center', 
		marginTop:20,
		backgroundColor:Utils.colorGray,
		width:'50%',
		alignItems:'center',
		justifyContent:'center',
		height:40,
		borderRadius:25
	}

})