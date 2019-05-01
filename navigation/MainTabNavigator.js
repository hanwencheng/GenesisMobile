import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import AboutScreen from '../modules/Settings/screens/AboutScreen';
import AccountSettingScreen from '../modules/Settings/screens/AccountSettingScreen';
import AmendCostScreen from '../modules/Vote/screens/AmendCostScreen';
import AmendCountryNameScreen from '../modules/Vote/screens/AmendCountryNameScreen';
import AmendDescriptionScreen from '../modules/Vote/screens/AmendDescriptionScreen';
import AmendDurationScreen from '../modules/Vote/screens/AmendDurationScreen';
import AmendMemberRulesScreen from '../modules/Vote/screens/AmendMemberRulesScreen';
import AmendSupportScreen from '../modules/Vote/screens/AmendSupportScreen';
import AppProfileScreen from '../modules/Apps/screens/AppProfileScreen';
import AppStoreScreen from '../modules/Apps/screens/AppStoreScreen';
import AppStyle from '../commons/AppStyle';
import ChatListScreen from '../modules/Chat/screens/ChatListScreen';
import CreateAccountScreen from '../modules/User/screens/CreateAccountScreen';
import CreateTopicScreen from '../modules/CreateTopic/screens/CreateTopicScreen';
import HomeScreen from '../screens/HomeScreen';
import ImportViaMnemonicScreen from '../modules/WalletImport/screens/ImportViaMnemonicScreen';
import ImportViaPrivateScreen from '../modules/WalletImport/screens/ImportViaPrivateScreen';
import LoginScreen from '../modules/User/screens/LoginScreen';
import MemberInfoScreen from '../modules/Chat/screens/MemberInfoScreen';
import MemberRulesScreen from '../modules/Rules/screens/MemberRulesScreen';
import MembersScreen from '../modules/Chat/screens/MembersScreen';
import PasswordSettingScreen from '../modules/Settings/screens/PasswordSettingScreen';
import RulesDescriptionScreen from '../modules/Rules/screens/RulesDescriptionScreen';
import RulesInfoScreen from '../modules/Rules/screens/RulesInfoScreen';
import ScanQRCodeScreen from '../modules/WalletImport/screens/ScanQRCodeScreen';
import SetPasswordScreen from '../modules/User/screens/SetPasswordScreen';
import SettingsScreen from '../modules/Settings/screens/SettingsScreen';
import MainSettingsScreen from '../modules/Settings/screens/MainSettingsScreen';
import AccountSecuritySettingsScreen from '../modules/Settings/screens/AccountSecuritySettingsScreen';

import StartScreen from '../modules/User/screens/StartScreen';
import StartVoteScreen from '../modules/Vote/screens/StartVoteScreen';
import TabBarIcon from '../components/TabBarIcon';
import TopicInfoScreen from '../modules/Chat/screens/TopicInfoScreen';
import TopicRulesScreen from '../modules/Rules/screens/TopicRulesScreen';
import TopicScreen from '../modules/Chat/screens/TopicScreen';
import TransactionsScreen from '../modules/Transactions/screens/TransactionsScreen';
import TreasureScreen from '../modules/Rules/screens/TreasureScreen';
import UnlockScreen from '../modules/Unlock/screens/UnlockScreen';
import UploadCountryProfileScreen from '../modules/CreateTopic/screens/UploadCountryProfileScreen';
import UploadUserProfileScreen from '../modules/User/screens/UploadUserProfileScreen';
import VerifyCredentialScreen from '../modules/User/screens/VerifyCredentialScreen';
import VoteInfoScreen from '../modules/Vote/screens/VoteInfoScreen';
import WalletCreateScreen from '../modules/WalletImport/screens/WalletCreateScreen';
import WalletImportScreen from '../modules/WalletImport/screens/WalletImportScreen';
import WalletScreen from '../screens/WalletScreen';
import { screensList } from './screensList';

const iconPropTypes = { focused: PropTypes.bool };

const checkIsVisible = navigation => {
  let tabBarVisible = true;
  const currentRouter = _.last(navigation.state.routes).routeName;
  if (navigation.state.index > 0 || currentRouter === screensList.Login.label) {
    tabBarVisible = false;
  }
  return tabBarVisible;
};

const commonScreens = {
  Unlock: UnlockScreen,
  Transactions: TransactionsScreen,
};

const HomeStackIcon = ({ focused }) => <TabBarIcon focused={focused} name={'ios-chatbubbles'} />;
HomeStackIcon.propTypes = iconPropTypes;

const HomeStack = createStackNavigator(
  {
    Login: LoginScreen,
    // Start: StartScreen,
    SetPassword: SetPasswordScreen,
    CreateAccount: CreateAccountScreen,
    AppStore: AppStoreScreen,
    AppProfile: AppProfileScreen,
    UploadCountryProfile: UploadCountryProfileScreen,
    VoteInfo: VoteInfoScreen,
    AmendCost: AmendCostScreen,
    AmendSupport: AmendSupportScreen,
    AmendMemberRules: AmendMemberRulesScreen,
    AmendDuration: AmendDurationScreen,
    AmendDescription: AmendDescriptionScreen,
    AmendCountryName: AmendCountryNameScreen,
    StartVote: StartVoteScreen,
    RulesInfo: RulesInfoScreen,
    MemberRules: MemberRulesScreen,
    TopicRules: TopicRulesScreen,
    Treasure: TreasureScreen,
    RulesDescription: RulesDescriptionScreen,
    MemberInfo: MemberInfoScreen,
    Members: MembersScreen,
    TopicInfo: TopicInfoScreen,
    Topic: TopicScreen,
    VerifyCredential: VerifyCredentialScreen,
    ChatList: ChatListScreen,
    CreateTopic: CreateTopicScreen,
    ...commonScreens,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyle.headerBackGroundColor,
      },
      headerTransparent: false,
      headerTintColor: 'white',
      headerTruncatedBackTitle: '',
    },
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: screensList.Home.title,
      tabBarIcon: HomeStackIcon,
      tabBarVisible: checkIsVisible(navigation),
    }),
  }
);

const UserStackIcon = ({ focused }) => <TabBarIcon focused={focused} name={'md-person'} />;
UserStackIcon.propTypes = iconPropTypes;

const UserStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    MainSettings: MainSettingsScreen,
    AccountSecuritySettings: AccountSecuritySettingsScreen,
    Wallet: WalletScreen,
    About: AboutScreen,
    PasswordSetting: PasswordSettingScreen,
    AccountSetting: AccountSettingScreen,
    UploadUserProfile: UploadUserProfileScreen,
    WalletImport: WalletImportScreen,
    WalletCreate: WalletCreateScreen,
    ImportViaPrivate: ImportViaPrivateScreen,
    ImportViaMnemonic: ImportViaMnemonicScreen,
    ScanQRCode: ScanQRCodeScreen,
    ...commonScreens,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: AppStyle.headerBackGroundColor,
      },
      headerTransparent: false,
      headerTintColor: 'white',
      headerTruncatedBackTitle: '',
    },
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Me',
      tabBarIcon: UserStackIcon,
      tabBarVisible: checkIsVisible(navigation),
    }),
  }
);

export default createBottomTabNavigator(
  {
    HomeStack,
    UserStack,
  },
  {
    initialRouteName: 'HomeStack',
    tabBarOptions: {
      style: {
        borderTopWidth: 0.5,
        borderTopColor: AppStyle.chatBorder,
        backgroundColor: AppStyle.headerBackGroundColor,
      },
    },
  }
);
