import React, { Component } from 'react';
import {
  Text, View, ScrollView, ImageBackground,Image, BackHandler, Dimensions
} from 'react-native';
import Styles from './style';
import Utils from '../Utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Header from '../Header';
import WebView from 'react-native-webview';
import Dialog from '../ProgressBar';


const width = Dimensions.get('window').width;

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cover:Utils.postUrl,
      link:'https://www.google.co.in',
      loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...',
    }
    this.handleBack=this.handleBack.bind(this);
    this.stopLoading=this.stopLoading.bind(this);
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    // const cover = await this.props.navigation.getParam('image', Utils.postUrl);
    const link = await this.props.navigation.getParam('link', '');
      this.setState({link:link});
      console.log('link=====>', this.state.link);
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack(){
    this.props.navigation.goBack(null);
    return true;
  }

  stopLoading(){
    this.setState({loading:false});
  }


  render() {

    // console.log(this.state._id);
   
    return (
        <View style={Styles.body}>
              <Dialog
                 title={this.state.loadingTitle}
                 message={this.state.loadingMessage}
                 visible={this.state.loading}
                 close={this.stopLoading}
              />
              {/* <ImageBackground source={{uri:this.state.cover}} style={[Styles.image, {}]}>
              </ImageBackground> */}
              {/* <ScrollView style={{flex:1}}> */}
                {/* <View style={{marginBottom:width/1.5, backgroundColor:Utils.colorWhite, borderTopLeftRadius:50, borderTopRightRadius:50}}>
                  <View style={[{marginTop:20, backgroundColor:Utils.colorWhite, width:width-50, alignSelf:'center'}]}>
                    <Text style={[Styles.title, {fontWeight:'bold', fontSize:Utils.headSize}]}>{this.state.title}</Text>
                    <Text style={[Styles.subTitle, {color:Utils.colorText, marginTop:15}]}>{this.state.desc}</Text>
                  </View>
                </View> */}
                <View style={{flex:1}}>
                  <WebView
                    source={{uri:this.state.link}}
                    style={{backgroundColor:'#f2f2f2', width:'100%', height:'100%'}}
                    onLoadEnd={()=>this.setState({loading:false})}
                    onLoadStart={()=>this.setState({loading:true})}
                  />
                </View>
              {/* </ScrollView> */}
          <Footer navigation={this.props.navigation}/>
        </View>
      );
  }
}