import React from "react";
import { View, Text, Image, ScrollView, TouchableHighlight, Modal} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../../pages/Utils'
import Styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import WebApi from '../WebApi';
import ProgressBar from '../../pages/ProgressBar';
import {socket} from '../../Common/WebApi';


import styles from "./styles";



export default class CustomDrawerNavigator extends React.Component {

	constructor(props) {
	  super(props);
	  this.state={
		profilePic:'https://workhound.com/wp-content/uploads/2017/05/placeholder-profile-pic.png',
		balance:'',
		userName:'',
		filePath:'',
        fileData:'',
        fileUri: '',
        fileName:'Upload File',
		selectImage:true,
		imageModal:false, 
		isWaiting:false,
		}
	  this.getData();
	}

	componentDidMount(){
		  socket.on('getUserBalance', (resp) => {
		  
			var num = Number(resp.balance);
			var n = num.toFixed(8);
		  
			this.setState({ balance: n });
  
		  })
	}

	componentDidUpdate=async()=>{
		if(!this.state.isWaiting){
			setTimeout(()=>{
				this.getData();
				this.setState({isWaiting:false});
			}, 3000);
			this.setState({isWaiting:true});
		  }
		  await socket.connect();
		  await socket.emit('initChat',{userId:this.state._id});	  
		  socket.emit('getUserBalance', {
			userId: this.state._id
		  })
	}

	getData=async()=>{
		const profilePic = await AsyncStorage.getItem(Utils.profilePic);
		const balance = await AsyncStorage.getItem(Utils.balance);
		const userName = await AsyncStorage.getItem(Utils.userName);
		this.setState({profilePic:profilePic, balance:balance, userName:userName});
		// console.log('getting Data for Drawer======>');
	}

	uploadImage=async()=>{
		if(this.state.fileData!=''){
			this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Uploading...'});
		   await WebApi.uploadProfile(this.state.fileData)
				.then(response => response.json())
					.then(json => {
					   this.setState({loading:false});
						 console.log('Response from uploadProfile===>', json);
							if(json.responseCode==200){
								this.setState({selectImage:false, loading:true, loadingTitle:'Alert', loadingMessage:'Updated successfully'});
								this.resetImage();
							}else{
								this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
							}
						})
						.catch(error => {
							 console.log('error from uploadProfile==>' , error)
							 this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
						});
	
		}
	}	

	selectImage(){
		if(!this.state.imageModal && this.state.fileData=='')
		this.setState({imageModal:true});
	  }

	  resetImage(){
		this.setState({
		  imageSelector:false,
			fileData: '',
			fileUri: '',
			fileName:'Upload File',
		});
	  }

	  launchImageLibrary = () => {
		let options = {
			quality:1, 
			maxWidth: 1000, 
			maxHeight: 1000,	  
		  storageOptions: {
			skipBackup: true,
			path: 'images',
		  },
		};
	
		 if(this.state.imageSelector==true)
		  this.setState({imageSelector:false});
	
		ImagePicker.launchImageLibrary(options, (response) => {
		  // console.log('Response = ', response);
	
		  if (response.didCancel) {
			console.log('User cancelled image picker');
		  } else if (response.error) {
			console.log('ImagePicker Error: ', response.error);
		  } else if (response.customButton) {
			console.log('User tapped custom button: ', response.customButton);
			alert(response.customButton);
		  } else {
			const source = { uri: response.uri };
			console.log('response', JSON.stringify(response.fileName));
			this.setState({
			  filePath: response,
			  fileData: 'data:image/jpeg;base64,'+response.data,
			  fileUri: response.uri,
			  fileName:response.fileName,
			  selectImage:true,
			});
			console.log('fileData======================>', this.state.fileData.substring(this.state.fileData.length-50, this.state.fileData.length));
			this.uploadImage(); 
		}
		});
	
	  }
	

	render(){
		const props = this.props;
		return(
			<View style={[styles.container]}>
				<ScrollView>
					<View>
						<View style={{width:'100%', height:100, justifyContent:'center', alignItems:'center', backgroundColor:Utils.colorDarkBlue, borderBottomRightRadius:20}}>
							<View style={{flexDirection:'row'}}>
								<TouchableHighlight underlayColor="none" onPress={()=>this.launchImageLibrary()}>
									<View>
										<Image source={{uri:this.state.profilePic}} style={Styles.profile}/>
										<Icon name='edit' style={{fontSize:24, position:'absolute', right:-2, bottom:-5, color:Utils.colorWhite}} onPress={()=>this.launchImageLibrary()}/>
									</View>
								</TouchableHighlight>
								<View style={{alignSelf:'center', marginLeft:10}}>
									<Text style={Styles.userName}>{this.state.userName}</Text>
									<Text style={Styles.balance}>{this.state.balance} <Icon name='btc' style={Styles.icon}/></Text>
								</View>
							</View>
						</View>
						<DrawerItems
							activeBackgroundColor={Utils.colorGreen}
							itemStyle={{borderBottomRightRadius:30, borderTopRightRadius:30}}
							activeTintColor={Utils.colorWhite}
							inactiveTintColor={Utils.colorDarkBlue}
							iconContainerStyle={styles.icons}
							{...props}
						/>

					</View>
				</ScrollView>
			</View>
		)
	}

}