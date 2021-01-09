import { StyleSheet, Dimensions } from 'react-native';
import Utils from '../Utils';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
	body:{
		flex:1,
		backgroundColor:Utils.colorWhite,
		justifyContent:'center',
	},
	header:{
	},
	container:{
		flex:1,
		marginBottom:25
	},
	logo:{
		width:width/1.5,
		height:height/3,
		alignSelf:'center',
		backgroundColor:Utils.colorWhite,
		zIndex:99,
	},
	subBody:{
		borderRadius:5,
		backgroundColor:Utils.colorWhite,
		width:width-15,
		alignSelf:'center',
	},
	tagLine:{
		width:'80%',
		textAlign:'center',
		alignSelf:'center',
		marginTop:80,
		fontSize:14
	},
	buttonsView:{
		position:'absolute',
		bottom:30,
		width:'90%',
		alignSelf:'center'
	},
	createButton:{
		backgroundColor:Utils.colorPrimary,
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
		fontSize:Utils.headSize,
		borderRadius:8,
		marginTop:20,
		width:'70%',
		alignSelf:'center', 
		marginTop:15, 
		alignItems:'center',
		justifyContent:'center'
	},
	logoForRegister:{
		width:width/1.5,
		height:height/3,
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
		fontSize:12,
		color:Utils.colorGray,
		marginTop:5		
	},
	inputText:{
		width:'90%',
		alignSelf:'center',
		borderRadius:5,
		borderColor:Utils.colorGray,
		borderWidth:1,
		fontSize:Utils.subHeadSize,
		marginTop:15,
		paddingLeft:15,
		height:50
	},
	inputTextError:{
		width:'90%',
		alignSelf:'center',
		borderRadius:5,
		borderColor:Utils.colorRed,
		borderWidth:2,
		fontSize:Utils.subHeadSize,
		marginTop:15,
		paddingLeft:15,
		height:50
	},
	inputPass:{
		width:'95%',
		alignSelf:'center',
		borderRadius:5,
		borderColor:Utils.colorGray,
		borderWidth:1,
		fontSize:Utils.subHeadSize,
		marginTop:15,
		paddingLeft:15
	},
	inputPassError:{
		width:'95%',
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
		fontSize:Utils.subHeadSize
	},
	hyperLink:{
		color:Utils.colorPrimary
	},
	loginLine:{
		marginTop:15,
		color:Utils.colorBlack,
		alignSelf:'center',
		fontSize:Utils.textSize,
		marginBottom:20
	},
	hyperLogin:{
		color:Utils.colorPrimary,
		fontSize:Utils.subHeadSize
	},
	iconForPassword:{
		fontSize:20, 
		marginLeft:-30, 
		marginTop:30,
		color:Utils.colorDimGray
	},
	forgotContainer:{
		alignSelf:'center',
		width:'100%',
		height:200,
		flex:0.55
	},
	dialogue:{
		alignSelf:'center',
		justifyContent:'center',
		flex:1,
		backgroundColor:'#00000088',
		width:'100%',
	},
	dialogueContainer:{
		width:'90%',
		alignSelf:'center',
		backgroundColor : Utils.colorWhite,
		minHeight:150,
		borderWidth: 1,
		borderColor:Utils.colorGreen,
		borderRadius:17,
		alignItems:'center'
	},
	close:{
		position:'absolute',
		right:15,
		top:15,
		fontSize:Utils.headSize+5
	},
	phoneVeriLine:{
		fontWeight:'bold', 
		fontSize:Utils.headSize,
		marginTop:15,
		alignSelf:'flex-start',
		marginLeft:20
	},
	otpBox:{
		height:40,
		borderWidth:1,
		borderColor:Utils.colorGray,
		borderRadius:5,
		marginHorizontal:5,
		textAlign:'center',
		minWidth:40,
	},
	phoneVeriButton:{
		borderRadius:5,
		backgroundColor:Utils.colorGreen,
		height:45,
		textAlign:'center',
		width:'40%',
		alignSelf:'center',
		marginVertical:30,
		marginHorizontal:5,
		alignItems:'center',
		justifyContent:'center'
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
