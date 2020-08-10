import React, { Component } from 'react';
import { View, AsyncStorage, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator} from 'react-navigation-stack';
import SplashSc from '../pages/Splash';
import RegisterScreen from '../pages/Register';
import LoginScreen from '../pages/Login';
import HomeScreen from '../pages/Home';
import CustomDrawerNavigator from "../Common/Drawer/CustomDrawerNavigator";
import Header from '../pages/Header';
import NotificationScreen from '../pages/Notification';
import CreateAdScreen from '../pages/CreateAd';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from '../pages/Utils';
import LatestNewsScreen from '../pages/LatestNews';
import PrivacyScreen from '../pages/Privacy';
import BlogScreen from '../pages/Blog';
import HelpScreen from '../pages/Help';
import AboutScreen from '../pages/About';
import ContactScreen from '../pages/Contact';
import TradeScreen from '../pages/Trade';
import SecurityScreen from '../pages/Security';
import TwoFactorScreen from '../pages/TwoFactor';
import BasicUserInfoScreen from '../pages/Profile/BasicUserInfo';
import BuyHomeScreen from '../pages/BuyHome';
import BuyTradeScreen from '../pages/BuyHome/Trade';
import SendHomeScreen from '../pages/SendHome';
import ChangeEmailScreen from '../pages/Profile/ChangeEmail';
import UserDetails from '../pages/Profile/UserDetails';
import VerificationScreen from '../pages/Profile/Verification';
import SetRealNameScreen from '../pages/Profile/SetRealName';
import YoutubeScreen from '../pages/Youtube';
import ShareAppScreen from '../pages/ShareApp';
import SingleTradeScreen from '../pages/SingleTrade';
import EditAdScreen from '../pages/CreateAd/editAd';
import DetailsAdScreen from '../pages/TradeDetail/detailsAd';
import OpenTradeScreen from '../pages/TradeDetail/OpenTrade';
import AllTradeScreen from '../pages/TradeDetail/AllTrade';
import CompletedTradeScreen from '../pages/TradeDetail/CompletedTrade';
import CancelledTradeScreen from '../pages/TradeDetail/CancelledTrade';
import DisputedTradeScreen from '../pages/TradeDetail/DisputedTrade';
import LoginGuardScreen from '../pages/LoginGuard';
import WalletScreen from '../pages/wallet';
import LoginHistoryScreen from '../pages/Security/LoginHistory';
import FeedbackScreen from '../pages/Feedback';
import ZendeskScreen from '../pages/Zendesk';
import NewsDetails from '../pages/LatestNews/NewsDetails';


class Hidden extends React.Component {
  render() {
    return null;
  }
}

const mainNavigator = createDrawerNavigator({
   
    Home: {
        screen: HomeScreen,
          navigationOptions: {
              headerShown:false,
              drawerLabel: "Home",
              drawerIcon: ({ tintColor }) => (
                <Icon name="home" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
              ),
          },
    },
    Youtube:{
      screen:YoutubeScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel: "Youtube Tutorial",
          drawerIcon: ({ tintColor }) => (
            <Icon name="youtube" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),
      }
    },
    LatestNewsScreen:{
      screen:LatestNewsScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel: 'Latest News',
        drawerIcon:({tintColor})=>(
            <Icon name="rss-square" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),
      },
    },
    Privacy:{
      screen:PrivacyScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel: 'Privacy Policy',
        drawerIcon:({tintColor})=>(
            <Icon name="user-secret" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),
      },
    },
    Blog:{
      screen:BlogScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:'Blog',
        drawerIcon:({tintColor})=>(
            <Icon name="id-card" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),
      },
    },
    Help:{
      screen:HelpScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:'Help',
        drawerIcon:({tintColor})=>(
            <Icon name="question-circle" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),
      },
    },
    About:{
      screen:AboutScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:'About Us',
        drawerIcon:({tintColor})=>(
            <Icon name="users" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),    
      }
    },
    ShareApp:{
      screen:ShareAppScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:'Share App',
        drawerIcon:({tintColor})=>(
            <Icon name="share-alt" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),    
      }
    },
    Contact:{
      screen:ContactScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:'Contact Us',
        drawerIcon:({tintColor})=>(
            <Icon name="phone" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
          ),    
      }
    },
    Trade:{
      screen:TradeScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:<Hidden/>
      }
    },
    Security:{
      screen:SecurityScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:<Hidden/>
      }
    },
    Wallet:{
      screen:WalletScreen,
      navigationOptions:{
        headerShown:false,
        drawerLabel:<Hidden/>
      }
    },
    Logout: {
        screen: LoginScreen,
          navigationOptions: {
              headerShown:false,
              drawerLabel: "Logout",
              drawerIcon: ({ tintColor }) => (
                <Icon name="undo" style={{ color: tintColor, fontSize:20, color:Utils.colorDarkBlue}} />
              ),
      },
    },
},

{
    contentComponent: CustomDrawerNavigator
  })

const PublicRoute = createStackNavigator({
    
    Splash: {
        screen: SplashSc,
        navigationOptions: {
            headerShown: false,
        }
    },
    Register:{
        screen:RegisterScreen,
        navigationOptions:{
          headerShown:false,
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    CreateAd:{
      screen:CreateAdScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    TwoFactor:{
      screen:TwoFactorScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    BasicUser:{
      screen:BasicUserInfoScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    BuyHome:{
      screen:BuyHomeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    SendHome:{
      screen:SendHomeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    ChangeEmail:{
      screen:ChangeEmailScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    UserDetails:{
      screen:UserDetails,
      navigationOptions:{
        headerShown:false
      }
    },
    Verification:{
      screen:VerificationScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    SetRealName:{
      screen:SetRealNameScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    BuyTrade:{
      screen:BuyTradeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    OpenTrade:{
      screen:OpenTradeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    AllTrade:{
      screen:AllTradeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    CompletedTrade:{
      screen:CompletedTradeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    CancelledTrade:{
      screen:CancelledTradeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    DisputedTrade:{
      screen:DisputedTradeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    SingleTrade:{
      screen:SingleTradeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    EditAd:{
      screen:EditAdScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    DetailsAd:{
      screen:DetailsAdScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    Notification:{
      screen:NotificationScreen,
      navigationOptions:{
        headerShown:false
      }
    },
    LoginGuard:{
      screen:LoginGuardScreen,
      navigationOptions:{
        headerShown:false
      }
    },
   LoginHistory:{
     screen:LoginHistoryScreen,
     navigationOptions:{
       headerShown:false
     }
   },
   Zendesk:{
    screen:ZendeskScreen,
    navigationOptions:{
      headerShown:false
    }
   },
   NewsDetails:{
    screen:NewsDetails,
    navigationOptions:{
      headerShown:false
    }
   },
   Feedback:{
    screen:FeedbackScreen,
    navigationOptions:{
      headerShown:false
    }
   },

    mainNavigator:mainNavigator,

}, {
        initialRouteName:'Splash',
        defaultNavigationOptions: {
            gestureEnabled: false,
            swipeEnabled: false,
            headerShown:false
        }
    })

class AuthLoading extends Component {
    componentDidMount = async () => {
      
        this.props.navigation.navigate('PublicRoute')
    }
    render() {
        return (
            <View>
            </View>
        )
    }
}

const AppNavigator = createAppContainer(PublicRoute);
export default AppNavigator;