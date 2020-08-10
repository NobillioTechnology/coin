import {Dimensions, StyleSheet } from 'react-native';
import Utils from '../Utils';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

export default StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Utils.colorWhite,
	},
	containerForRegister:{
		flex:1,
		width:width,
	},
	container:{
		flex:1,
		width:width,
		height:height,
		alignItems:'center',
		justifyContent:'center'
	},
	logo:{
		width:width/1.5,
		height:height/3,
		alignSelf:'center',
		backgroundColor:Utils.colorWhite,
		zIndex:99,
		position:'absolute',
		top:10
	},
    subBody:{
    	width:width-15,
	    backgroundColor:Utils.colorWhite,
	    borderRadius:5,
	    alignSelf:'center'
	},
	tagLine:{
		width:'90%',
		textAlign:'center',
		alignSelf:'center',
		fontSize:Utils.textSize
	},
	bottomLine:{
		backgroundColor:Utils.colorGray, 
		height:1, 
		width:'90%', 
		alignSelf:'center', 
		marginTop:5
	},
	buttonsView:{
		width:'90%',
		alignSelf:'center',
		position:'absolute',
		bottom:50
	},
	createButton:{
		backgroundColor:Utils.colorBlue,
		height:45,
		marginBottom:15,
		textAlign:'center',
		color:Utils.colorWhite,
		paddingTop:10,
		fontSize:18,
		borderRadius:8
	},
	loginButton:{
		backgroundColor:Utils.colorGreen,
		height:45,
		textAlign:'center',
		color:Utils.colorBlack,
		paddingTop:10,
		fontSize:18,
		borderRadius:8
	},
	logoForRegister:{
		width:200,
		height:150,
		marginTop:10,
		marginBottom:10,
		alignSelf:'center',
		backgroundColor:Utils.colorWhite,
		zIndex:99		
	},
	title:{
		alignSelf:'center',
		fontSize:Utils.headSize,
		marginTop:10
	},
	subtitle:{
		alignSelf:'center',
		fontSize:Utils.textSize,
		color:Utils.colorGray,
		marginTop:5		
	},
	shadow:{
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 1,
		shadowRadius: 11.95,
		elevation: 10,
	},
	inputText:{
		width:'90%',
		alignSelf:'center',
		borderRadius:5,
		borderColor:Utils.colorGray,
		borderWidth:1,
		fontSize:Utils.subHeadSize,
		marginTop:15,
		paddingLeft:15
	},
	inputTextError:{
		width:'90%',
		alignSelf:'center',
		borderRadius:5,
		borderColor:Utils.colorRed,
		borderWidth:2,
		fontSize:Utils.subHeadSize,
		marginTop:15,
		paddingLeft:15
	},
	captcha:{
		width:'65%',
		alignSelf:'center',
		height:45,
		borderRadius:5,
		borderColor:Utils.colorGray,
		borderWidth:1,
		marginTop:15,
		alignItems:'center',
		justifyContent:'center'
	},
	captchaError:{
		width:'65%',
		alignSelf:'center',
		height:45,
		borderRadius:5,
		borderColor:Utils.colorRed,
		borderWidth:1,
		marginTop:15,
		alignItems:'center',
		justifyContent:'center'
	},
	acceptLine:{
		color:Utils.colorBlack,
		fontSize:Utils.textSize
	},
	hyperLink:{
		color:Utils.colorPrimary,
		fontSize:Utils.subHeadSize
	},
	loginLine:{
		marginTop:15,
		color:Utils.colorBlack,
		alignSelf:'center',
		fontSize:Utils.textSize,
		marginBottom:15
	},
	hyperLogin:{
		color:Utils.colorPrimary,
		fontSize:Utils.subHeadSize
	}
 })

            // <Icon name={ ( this.state.passwordType ) ? "eye-slash" : "eye" } style={Styles.visibleIcon} onPress={()=>this.setPasswordType()}/>


    // <Text style={Styles.forgotPassword} >Forgot password?</Text>
        
          // <JustWrapper json={this.state}>
          //   <FormEngine fields={fields} formValue={this.state.formValue} onChange={formValue => this.setState({formValue})} />
          // </JustWrapper>



      //  <Modal style={Styles.dialogue}
 
      //     visible={this.state.Alert_Visibility}
 
      //     transparent={true}
 
      //     animationType={"fade"}
 
      //     onRequestClose={()=>this.closePopup}>
      // <View style={Styles.dialogue}>
      //   <View style={Styles.dialogueContainer}>
 
      //     <Text style={Styles.dialogTitle}>FINGERPRINT AUTHENTICATION</Text>
      //     <Text style={Styles.dialogSubtitle}>Confirm fingerprint to continue</Text>

      //     <View style={{flexDirection:'row', marginTop:20}}>
      //       <Image source={require('../../assets/img/finger.png')} style={Styles.fingerprintImage}/>
      //       <Text style={Styles.touchSensor}>Touch sensor</Text>            
      //      </View>
      //      <Text style={[Styles.dialogueCancel, Styles.shadow]}
      //         onPress={this.closePopup}
      //       >Cancel</Text>
      //   </View>           
 
 
      // </View>
      //   </Modal>
