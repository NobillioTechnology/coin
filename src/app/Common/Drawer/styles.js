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
    color:Utils.colorBlack,
    fontWeight:'bold',
    fontSize:Utils.subHeadSize
  },
  balance:{
    color:Utils.colorBlack,
    fontSize:Utils.textSize,
    marginTop:5
  }
});

export default styles;