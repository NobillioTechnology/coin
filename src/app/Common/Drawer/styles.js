import { StyleSheet } from "react-native";
import Utils from '../../pages/Utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize:20,
  },
  icons: {
    color:Utils.colorBlack,
    fontSize:Utils.headSize
  },
  banner:{
  	width:'60%',
    height:120,
    alignSelf:'center'
  },
  profile:{
  	width:60,
  	height:60,
    borderRadius:30,
    marginRight:10
  },
  userName:{
    color:Utils.colorWhite,
    fontWeight:'bold',
    fontSize:Utils.subHeadSize
  },
  balance:{
    color:Utils.colorWhite,
    fontSize:Utils.textSize,
    marginTop:5
  },
  dialogue:{
		// backgroundColor:'blue',
		alignSelf:'center',
		// minWidth: '80%',
		justifyContent:'center',
		flex:1,
	backgroundColor:'#00000088',
	width:'100%',
	},
	dialogueContainer:{
		width:280,
		alignSelf:'center',
		alignItems: 'center',
		backgroundColor : Utils.colorWhite, 
		height: 180,
		borderWidth: 1,
		borderColor:Utils.colorPrimary,
		borderRadius:17,
	},
	dialogCamera:{
		color:Utils.colorPrimary,
		fontSize:22,
		marginTop:15,
		marginBottom:15,
	},
	dialogueCancel:{
		width:280,
		backgroundColor:'#b6b6b655',
		textAlign:'center',
		fontSize:20,
		borderRadius:17,
		height:40,
		paddingTop:5,
		alignItems:'center',
		position:'absolute',
		bottom:0
	}
});

export default styles;