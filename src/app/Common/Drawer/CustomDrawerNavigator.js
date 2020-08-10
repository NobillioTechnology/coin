import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../../pages/Utils'
import Styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';


import styles from "./styles";

export default class CustomDrawerNavigator extends React.Component {

	constructor(props) {
	  super(props);
	  this.state={
		profilePic:'https://workhound.com/wp-content/uploads/2017/05/placeholder-profile-pic.png',
		balance:'',
		userName:''
		}
	  this.getData();
	}
	
	componentWillReceiveProps(){
		this.getData();
	}

	getData=async()=>{
		const profilePic = await AsyncStorage.getItem(Utils.profilePic);
		const balance = await AsyncStorage.getItem(Utils.balance);
		const userName = await AsyncStorage.getItem(Utils.userName);
		this.setState({profilePic:profilePic, balance:balance, userName:userName});
		// console.log(profilePic);
	}

	render(){
		const props = this.props;
		return(
			<View style={[styles.container]}>
				<ScrollView>
					<View>
						<View style={{width:'100%', height:100, justifyContent:'center', alignItems:'center'}}>
							<View style={{flexDirection:'row'}}>
								<Image source={{uri:this.state.profilePic}} style={Styles.profile}/>
								<View style={{alignSelf:'center'}}>
									<Text style={Styles.userName}>{this.state.userName}</Text>
									<Text style={Styles.balance}>{this.state.balance} <Icon name='btc' style={Styles.icon}/></Text>
								</View>
							</View>
						</View>
						<DrawerItems
							activeBackgroundColor={"white"}
							activeTintColor={"black"}
							iconContainerStyle={styles.icons}
							{...props}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}

}