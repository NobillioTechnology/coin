

import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, TouchableHighlight, BackHandler
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
import WebView from 'react-native-webview';
import HTML from 'react-native-render-html';

const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'loading...',
        item1:false, item2:false, item3:false, item4:false,
        trade:[], security:[], feedback:[], transfer:[]
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
    }

    componentDidMount=async()=>{
      BackHandler.addEventListener('hardwareBackPress', this.handleBack);
      await this.getPP();
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    handleBack(){
          this.props.navigation.goBack(null);
          return true;
    }

   stopLoading(){
     if(this.state.loading)
       this.setState({loading:false});
   }

  getPP=async()=>{
    this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...'});
      await WebApi.getPrivacyPolicy('FAQ')
              .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from Help===>', json);
                        if(json.responseCode==200){
                            this.setState({
                              trade:json.obj.trade,
                              security:json.obj.security,
                              feedback:json.obj.feedback,
                              transfer:json.obj.transfer
                            })
                        }else{
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+json.responseMessage});
                        }
                    })
                    .catch(error => {
                        this.setState({loading:false});
                         console.log('error==>' , error)
                          this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });

  }


  render() {

    return (
      <View style={Styles.body}>
       <Header title="Help" menuCheck="true" data={this.props} style={Styles.header}/>
         <ProgressBar
            title={this.state.loadingTitle}
            message={this.state.loadingMessage}
            visible={this.state.loading}
            close={this.stopLoading}
          />
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
            <Text style={Styles.title}>FREQUENTLY ASKED QUESTIONS</Text>
            <Image style={{width:'90%', height:1, backgroundColor:utils.colorGray, marginTop:10, marginBottom:10}}/>
          
            <View style={Styles.category}>
              <View style={Styles.headRow}>
                <Icon name='arrow-left' style={Styles.headRowIcon} />
                <Text style={Styles.headRowText}>Trade</Text>
              </View>
              {this.state.trade.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item1:!this.state.item1})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                        </View>
                      </TouchableHighlight>
                      {this.state.item1==true && (
                      <View>
                        <View style={[Styles.detailRow, {width:null, height:null, paddingHorizontal:10, paddingTop:5, alignSelf:'center'}]}>
                          <HTML html={item.answer}/>
                          </View>
                      </View>
                      )}
                  </View>
                )
              })}
            </View>
          
            <View style={Styles.category}>
              <View style={Styles.headRow}>
                <Icon name='arrow-left' style={Styles.headRowIcon} />
                <Text style={Styles.headRowText}>Security</Text>
              </View>
              {this.state.security.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item2:!this.state.item2})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                        </View>
                      </TouchableHighlight>
                      {this.state.item2==true && (
                      <View>
                        <View style={[Styles.detailRow, {width:null, height:null, paddingHorizontal:10, paddingTop:5, alignSelf:'center'}]}>
                          <HTML html={item.answer}/>
                          </View>
                      </View>
                      )}
                  </View>
               )
             })}
             </View>
            <View style={Styles.category}>
              <View style={Styles.headRow}>
                <Icon name='arrow-left' style={Styles.headRowIcon} />
                <Text style={Styles.headRowText}>Feedback</Text>
              </View>
              {this.state.feedback.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item3:!this.state.item3})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                        </View>
                      </TouchableHighlight>
                      {this.state.item3==true && (
                      <View>
                        <View style={[Styles.detailRow, {width:null, height:null, paddingHorizontal:10, paddingTop:5, alignSelf:'center'}]}>
                          <HTML html={item.answer}/>
                          </View>
                      </View>
                      )}
                  </View>
               )
             })}
             </View>
          
            <View style={Styles.category}>
              <View style={Styles.headRow}>
                <Icon name='arrow-left' style={Styles.headRowIcon} />
                <Text style={Styles.headRowText}>Transfer</Text>
              </View>
              {this.state.transfer.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item4:!this.state.item4})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                        </View>
                      </TouchableHighlight>
                      {this.state.item4==true && (
                      <View>
                        <View style={[Styles.detailRow, {width:null, height:null, paddingHorizontal:10, paddingTop:5, alignSelf:'center'}]}>
                          <HTML html={item.answer}/>
                          </View>
                      </View>
                      )}
                  </View>
               )
             })}
             </View>         

          </View>
        </ScrollView>
      </View>
    );
  }
}
