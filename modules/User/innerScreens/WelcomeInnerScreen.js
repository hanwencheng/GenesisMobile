import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header, withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import GenesisButton from '../../../components/GenesisButton';

class WelcomeInnerScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    loginToken: PropTypes.string,
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.intro} key="intro">
          {t.INTRO}
        </Text>
        <View style={styles.buttonContainer}>
          <GenesisButton
            action={() => navigation.navigate(screensList.CreateAccount.label)}
            text={t.BUTTON_TEXT}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTip}>{t.LOGIN_TIP}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(screensList.Login.label)}>
            <Text style={styles.loginText}>{t.LOGIN_TEXT}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginToken: state.appState.loginToken,
  isLoaded: state.appState.isLoaded,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(WelcomeInnerScreen));

const styles = StyleSheet.create({
  container: {
    paddingTop: Header.HEIGHT,
    flex: 1,
    backgroundColor: AppStyle.userBackgroundColor,
    flexDirection: 'column',
  },
  intro: {
    padding: 60,
    marginTop: 110,
    flex: 2,
    color: AppStyle.mainBlackColor,
    fontSize: AppStyle.fontLarge,
    fontFamily: AppStyle.mainFontBold,
  },
  buttonContainer: {
    marginTop: 75,
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 50,
  },
  loginTip: {
    paddingLeft: 10,
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.grayColor,
  },
  loginText: {
    fontSize: AppStyle.fontMiddle,
    color: AppStyle.mainBlue,
  },
});

const t = {
  INTRO: 'Welcome to \nGenesis Space',
  LOGIN_TIP: 'Have an account already? ',
  BUTTON_TEXT: 'Create account',
  LOGIN_TEXT: 'Log in',
};
