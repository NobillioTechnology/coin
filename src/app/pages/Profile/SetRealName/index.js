import React, { Component } from 'react';
import {
  Text, View, Image, TextInput, ScrollView, Dimensions, TouchableHighlight, Modal, AsyncStorage
} from 'react-native';
import Styles from './style'
import Header from '../../Header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../../Utils';
import ImagePicker from 'react-native-image-picker';
import WebApi from '../../../Common/WebApi';
import ProgressBar from '../../ProgressBar';

const width = Dimensions.get('window').width;


let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state={
        name:'',
        validName:true,
        imageSelector:false,
        loading:false,
        loadingTitle:'Please Wait',
        loadingMessage:'',
        filePath:'',
        fileData:'',
        fileUri: '',
        fileName:'Upload File',
        selectImage:true,
    }
    this.stopLoading=this.stopLoading.bind(this);
    this.handleBackButtonClick=this.handleBackButtonClick.bind(this);
   }

   handleBackButtonClick(){
     if(this.state.imageSelector){
       this.setState({imageSelector:false});
       return true;
     }
   }

  selectImage(){
    if(!this.state.imageSelector && this.state.fileData=='')
    this.setState({imageSelector:true});
  }
  
  resetImage(){
    this.setState({
      imageSelector:false,
        fileData: '',
        fileUri: '',
        fileName:'Upload File',
    });
  }

  launchCamera = () => {
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

    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
          this.handleBackButtonClick();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
          this.handleBackButtonClick();
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
          this.handleBackButtonClick();
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response.fileName));
        this.setState({
          filePath: response,
          fileData: 'data:image/jpeg;base64,' + response.data,
          fileUri: response.uri,
          fileName:response.fileName,
          selectImage:true
        });
        console.log('fileData======================>', this.state.fileData.substring(this.state.fileData.length-50, this.state.fileData.length));
      }
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
          this.handleBackButtonClick();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
          this.handleBackButtonClick();
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
          this.handleBackButtonClick();
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
        console.log('fileData======================>', this.state.fileData.substring(0, 50));
      }
    });

  }

  validateName=async(name)=>{
    await this.setState({name:name});
    if(this.state.name.length>4){
      this.setState({validName:true});
    }else
      this.setState({validName:false});
  }

  setRealName=async()=>{    
    const _id=await AsyncStorage.getItem(Utils._id);
    if(this.state.name!='' && this.state.validName){
        this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Setting Name...'});
      await WebApi.setRealName(_id, this.state.name)
        .then(response => response.json())
                .then(json => {
                   this.setState({loading:false});
                     console.log('Response from setRealName===>', json);
                        if(json.responseCode==200){
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Updated successfully'});
                        }else{
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:json.responseMessage});
                        }
                    })
                    .catch(error => {
                         console.log('error from setRealName==>' , error)
                            this.setState({loading:true, loadingTitle:'Alert', loadingMessage:'Oops! '+error});
                    });
    }else
      this.setState({validateName:false, loading:true, loadingTitle:'Alert', loadingMessage:'Enter valid name!'});
  }

  stopLoading(){
    if(this.state.loading){
      this.resetImage();
      this.setState({loading:false});
    }
  }

  uploadImage=async()=>{
    if(this.state.selectImage && this.state.fileData!=''){
        this.setState({loading:true, loadingTitle:'Please Wait', loadingMessage:'Uploading...'});
       await WebApi.uploadProfile(this.state.fileData)
            .then(response => response.json())
              .then(json => {
                   this.setState({loading:false});
                     console.log('Response from uploadProfile===>', json);
                        if(json.responseCode==200){
                            this.setState({selectImage:false, loading:true, loadingTitle:'Success', loadingMessage:'Updated successfully'});
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
    else
      this.setState({selectImage:false});
  }

  render() {
    return (
      <View style={Styles.body}>
       <Header title='Set Real Name' data={this.props} style={Styles.header}/>
        <ProgressBar
          title={this.state.loadingTitle}
          message={this.state.loadingMessage}
          visible={this.state.loading}
          close={this.stopLoading}
          />
         <ScrollView style={{flex:0.8}} keyboardShouldPersistTaps={'always'}>
          <View style={Styles.container}>
              <View style={[Styles.cardView, Styles.shadow]}>
                <Text style={Styles.textHeading}>Name & Image</Text>
                <Image style={{height:1, width:'90%', backgroundColor:Utils.colorGray, alignSelf:'center', margin:10}}/>
                <View style={Styles.borderView}>
                  <Text style={Styles.textLabel}>Your Name:</Text>
                  <TextInput 
                    style={this.state.validName==false ? Styles.textInputError : Styles.textInput}
                    placeholder="Enter Your Name"
                    value={this.state.name}
                    onChangeText={(name)=>this.validateName(name)}
                    />
                  <Text style={Styles.texthint}>Enter Your name as it appears on bank account</Text>

                  <TouchableHighlight underlayColor='none' onPress={()=>this.setRealName()}>
                    <View style={Styles.sendButton}>
                      <Text style={{fontSize:Utils.subHeadSize}}>Set Real Name</Text>
                    </View>
                  </TouchableHighlight>
                  
                  <TouchableHighlight underlayColor='none' onPress={()=>this.selectImage()}>
                    <View style={this.state.selectImage==false ? Styles.textInputError : Styles.textInput}>
                      <Text style={{fontSize:Utils.subHeadSize, color:Utils.colorGray}}>{this.state.fileName}</Text>
                       <Icon name={this.state.fileData=='' ? 'paperclip' : 'close'} style={[Styles.rightIcon, {width:30, height:30, textAlign:'center', textAlignVertical:'center'}]} onPress={()=>{if(this.state.fileData!='')this.resetImage();else this.selectImage()}}/>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight underlayColor='none' onPress={()=>this.uploadImage()}>
                    <View style={Styles.sendButton}>
                     <Text >Upload Profile Picture</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
          </View>
        </ScrollView>
        {this.state.imageSelector==true && (
         <View>
           <Modal style={Styles.dialogue}
            isVisible={this.state.imageSelector}
            transparent={true}
            animationType={"fade"}
            onRequestClose={()=>this.setState({imageSelector:false})}
            >
             <View style={Styles.dialogue}>
              <View style={Styles.dialogueContainer}>
                  <Text style={Styles.dialogCamera} onPress={this.launchCamera}>Camera</Text>
                  <Image style={{width:280, height:1, backgroundColor:Utils.colorGray}} />
                  <Text style={Styles.dialogCamera} onPress={this.launchImageLibrary}>Gallery</Text>
                  <Image style={{width:280, height:1, backgroundColor:Utils.colorGray}} />
                  <Text style={Styles.dialogueCancel}
                    onPress={()=>this.setState({imageSelector:!this.state.imageSelector})}
                  >Close</Text>
                </View>
              </View>
            </Modal>
         </View>
        )}
      </View>
    );
  }
}
              // <Image source={this.state.fileData!='' ? {uri:this.state.fileData} : require('../../../assets/img/logo.png')} style={{width:100,height:100}}/>
