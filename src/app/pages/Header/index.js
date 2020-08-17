import React, { Component } from 'react';
import {Text, View,Image, StyleSheet, TextInput,Button,ScrollView,TouchableHighlight } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {

 constructor(props) {
    super(props);
    // console.log("state==>  ", props.data.navigation.actions)
    this.state = {email: '', title:'Home'};
  }

  jumpToBack(){
    if(this.props.handleBack!=undefined)
      this.props.handleBack();
    else
      this.props.data.navigation.goBack(null);
  // alert('hello')
  }

  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.data.navigation.toggleDrawer();
  };

  render(){
    // const { navigation } = this.props;
  	return(
  		<View style={styles.view}>
      {this.props.menuCheck=='true'&&(
      <Icon name="bars" style={styles.iconForBack} onPress={() => 
        // this.toggleDrawer.bind(this)
        this.props.data.navigation.openDrawer()
        // alert(JSON.stringify(this.props.data.navigation))
      }></Icon>
    )}
    {this.props.menuCheck!='true' && (
      <Icon name="arrow-left" style={styles.iconForBack} onPress={()=>this.jumpToBack()}></Icon>
    )}

    {this.props.title=='Restaurants' && (
      <Icon name={this.props.iconName} style={styles.iconForView} onPress={this.props.action}></Icon>
    )}
         
          <Text style={styles.title}>{this.props.title}</Text>

          {this.props.rightIcon==true && (
          <Icon name="search" style={styles.notification} onPress={()=> this.props.data.navigation.navigate('Home')}/>
          )}
      </View>
  		);
  }
}