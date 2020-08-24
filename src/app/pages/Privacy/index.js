import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, BackHandler
} from 'react-native';
import Styles from './style'
import Header from '../Header'
import ScrollableTabView,{ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../Footer';
import Utils from '../Utils';
import CustomDialog from '../CustomDialog';
import utils from '../Utils';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';
import HTML from 'react-native-render-html';

const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
         loading:false,
         loadingTitle:'Please Wait',
         loadingMessage:'loading...',
         data:'', title:'Privacy Policy',
         drawer:'true',
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
    }

    componentDidMount=async()=>{
      BackHandler.addEventListener('hardwareBackPress', this.handleBack);
      await this.getPP();
      if(this.props.navigation.getParam('from')=='register')
        this.setState({drawer:'false'})
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    handleBack(){
      if(this.state.drawer=='true'){
        this.props.navigation.goBack(null);
        return true;
      }else{
        this.props.navigation.replace('Register');
        return true;
      }
    }

   stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }

  getPP=async()=>{
    this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
      await WebApi.getPrivacyPolicy('PRIVACY')
              .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from Privacy===>', json);
                        if(json.responseCode==200){
                            this.setState({
                              title:json.succ.title,
                              data:json.succ.description
                            })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                        this.setState({loading:false});
                         console.log('error==>' , error)
                         this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });

  }

  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
       <Header title="Privacy Policy" menuCheck={this.state.drawer} data={this.props} style={Styles.header} handleBack={this.handleBack}/>
           <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
        <ScrollView style={{flex:0.8}}>
          <View style={[Styles.container,Styles.shadow]}>
            <Text style={Styles.title}>{this.state.title}</Text>
            <Image style={{width:'90%', height:1, backgroundColor:utils.colorGray, marginTop:10, marginBottom:10}}/>
            <View style={Styles.dialogSubtitle}>
              <HTML html={this.state.data}/>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
