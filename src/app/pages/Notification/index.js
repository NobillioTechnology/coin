

import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, Modal
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import GridView from 'flatlist-react';
import Footer from '../Footer'
import CustomDialog from '../CustomDialog'
import Category from './Category'


export default class Chat extends Component {

  state={
     pageTitle:'Notification',
  }

  constructor(props) {
    super(props);

   }

  search(){
    this.setState({activeSearch:!this.state.activeSearch});
  }

  render() {

    return (
      <View style={Styles.body}>
       <Header title="Notification" menuCheck="true" rightIcon={true} data={this.props} style={Styles.header}/>

        <ScrollView style={{flex:0.8}}>
            <View style={Styles.container}>
            </View>
        </ScrollView>
        <Footer style={Styles.footer} navigation={this.props.navigation} selected={'notification'}/>
      </View>
    );
  }
}
