

import React, { Component } from 'react';
import {
  Text, View, Image, ScrollView, Dimensions, TouchableHighlight, BackHandler, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from './style'
import Header from '../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../Utils';
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
        item1:false, item2:false, item3:false, item4:false,
        trade:[], security:[], feedback:[], transfer:[],
        color:require('../../assets/img/bg.jpg'),
        img:[require('../../assets/img/bg.jpg'),
        require('../../assets/img/bg2.jpg'),
        require('../../assets/img/bg3.jpg'),
        require('../../assets/img/bg4.jpeg'),
        require('../../assets/img/bg5.jpg'),
        require('../../assets/img/bg6.jpeg')],     
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.handleBack=this.handleBack.bind(this);
    }

    componentDidMount=async()=>{
      const color = await AsyncStorage.getItem(Utils.colorUniversal);
        if(color!==null){
          if(color=='bg')
            this.setState({color:this.state.img[0]});
            if(color=='bg2')
            this.setState({color:this.state.img[1]});
            if(color=='bg3')
            this.setState({color:this.state.img[2]});
            if(color=='bg4')
            this.setState({color:this.state.img[3]});
            if(color=='bg5')
            this.setState({color:this.state.img[4]});
            if(color=='bg6')
            this.setState({color:this.state.img[5]});
        }
  
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
      await this.getPP();

    }
    componentDidUpdate=async()=>{
      if(!this.state.isWaiting){
          setTimeout(async()=>{
        const color = await AsyncStorage.getItem(Utils.colorUniversal);
        console.log(color);
        if(color!==null){
          if(color=='bg')
            this.setState({color:this.state.img[0]});
            if(color=='bg2')
            this.setState({color:this.state.img[1]});
            if(color=='bg3')
            this.setState({color:this.state.img[2]});
            if(color=='bg4')
            this.setState({color:this.state.img[3]});
            if(color=='bg5')
            this.setState({color:this.state.img[4]});
            if(color=='bg6')
            this.setState({color:this.state.img[5]});
        }
        this.setState({isWaiting:false});
      }, 2000);
      this.setState({isWaiting:true});
    }
  
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
      <ImageBackground source={this.state.color} style={{flex:1}}>
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
            <Image style={{width:'90%', height:1, backgroundColor:utils.colorGray, marginTop:10, marginBottom:10, alignSelf:'center'}}/>
          
            <View style={Styles.category}>
              <View style={Styles.headRow}>
                <Text style={Styles.headRowText}>Trade</Text>
              </View>
              {this.state.trade.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item1:!this.state.item1})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          {this.state.item1==true ? 
                          <Icon name="chevron-up" style={Styles.rightIcon} />
                          :
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                          }
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
                {/* <Icon name='arrow-left' style={Styles.headRowIcon} /> */}
                <Text style={Styles.headRowText}>Security</Text>
              </View>
              {this.state.security.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item2:!this.state.item2})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          {this.state.item2==true ? 
                          <Icon name="chevron-up" style={Styles.rightIcon} />
                          :
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                          }
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
                {/* <Icon name='arrow-left' style={Styles.headRowIcon} /> */}
                <Text style={Styles.headRowText}>Feedback</Text>
              </View>
              {this.state.feedback.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item3:!this.state.item3})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          {this.state.item3==true ? 
                          <Icon name="chevron-up" style={Styles.rightIcon} />
                          :
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                          }
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
                {/* <Icon name='arrow-left' style={Styles.headRowIcon} /> */}
                <Text style={Styles.headRowText}>Transfer</Text>
              </View>
              {this.state.transfer.map((item, index) => { 
                return (
                  <View>
                      <TouchableHighlight underlayColor='none' onPress={()=>this.setState({item4:!this.state.item4})}>
                        <View style={Styles.detailRow}>
                          <Text style={Styles.detailText}>{item.question}</Text>
                          {this.state.item4==true ? 
                          <Icon name="chevron-up" style={Styles.rightIcon} />
                          :
                          <Icon name="chevron-down" style={Styles.rightIcon} />
                          }
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
      </ImageBackground>
      </View>
    );
  }
}
