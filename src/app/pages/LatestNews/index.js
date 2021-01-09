import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Picker, CheckBox
} from 'react-native';
import Styles from './style';
import Header from '../Header';
import Adapter from './Adapter';
import WebApi from '../../Common/WebApi';
import ProgressBar from '../ProgressBar';

var parseString = require('react-native-xml2js').parseString;

const width = Dimensions.get('window').width;

export default class Home extends Component {

  constructor(props) {
    super(props);
      this.state={
           loading:true, loadingTitle:'Please Wait', loadingMessage:'Loading...',
           data:[]
      }
      this.stopLoading=this.stopLoading.bind(this);
      this.openNews=this.openNews.bind(this);
   }

   componentDidMount=async()=>{
      await this.getText();
      this.setState({loading:false});
   }

   stopLoading(){
     this.setState({loading:false});
   }

   getText = async ()=>{
          var xhttp = new XMLHttpRequest();
          let dataA = [];
         
          xhttp.onreadystatechange =()=> {
            if (xhttp.readyState == 4 && xhttp.status == 200) {  

                parseString(xhttp.responseText, function (err, result) {

                 const length = result.rss.channel[0].item.length;
                 const data = result.rss.channel[0];
      
                for(let i =0; i<length; i++)
                {
                  // console.log('link =>', data.item[i].link[0]);

                      parseString(data.item[i].description[0], function(err, result1){
                      dataA.push({'title': data.item[i].title[0], 'link': data.item[i].link[0], img:result1.p.img[0].$.src}); 
                      
                    })
                }
              })
            this.setState({data:dataA});
            }
        }
          xhttp.open("GET", "https://news.bitcoin.com/feed/", true);
          xhttp.send();
      
  }

  openNews(link){
    this.props.navigation.navigate('NewsDetails', {'link':link});
  }

  render() {
   // if(this.props.navigation.state.key=='Icon')
    return (
      <View style={Styles.body}>
       <Header title="Latest News" menuCheck="true" data={this.props} style={Styles.header}/>
       <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
        />
        <ScrollView style={{flex:0.8}}>
          <View style={Styles.container}>
            {this.state.data.map((item)=>{
              return(
                   <Adapter
                     imageUri={item.img}
                     title={item.title}
                     subtitle=""
                     link={item.link}
                     openNews={this.openNews}
                   />
                )
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
