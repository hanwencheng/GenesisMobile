import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Header } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import InputWithValidation from '../components/InputWithValidation';
import GenesisButton from '../../../components/GenesisButton';
import { passwordRegex } from '../../../utils/regexUtils';
import { userRegisterAction } from '../actions/userRegiseterActions';
import { screensList } from '../../../navigation/screensList';
import Container from '../../../components/Container';
import TinodeAPI from '../../Chat/TinodeAPI';

class SetPasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...AppStyle.commonHeader,
  });

  constructor(props) {
    super(props);
    this.state = {
      isSet: false,
      repeatPassword: '',
    };
  }

  static propTypes = {
    navigation: PropTypes.object,
    password: PropTypes.string.isRequired,
    updateUserRegisterInfo: PropTypes.func.isRequired,
    photo: PropTypes.object,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  createAccountRequest = () => {
    const { navigation, username, password, email } = this.props;
    TinodeAPI.handleCreateNewAccount(navigation, email, password, username, null);
  };

  render() {
    const { password, updateUserRegisterInfo } = this.props;
    const { isSet, repeatPassword } = this.state;
    const validator = () => (isSet ? repeatPassword === password : passwordRegex.test(password));
    const onPress = () => (isSet ? this.createAccountRequest() : this.setState({ isSet: true }));

    return (
      <Container hasPadding style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{isSet ? t.REPEAT_TITLE : t.TITLE}</Text>
          <Text style={styles.subtitle}>{t.SUBTITLE}</Text>
        </View>  
        <View style={styles.inputContainer}>
          <InputWithValidation
            onChangeText={input => {
              isSet
                ? this.setState({ repeatPassword: input })
                : updateUserRegisterInfo({ password: input });
            }}
            isPassword
            value={isSet ? repeatPassword : password}
            validator={validator}
            placeholder={t.PLACEHOLDER}
            errorMessage={isSet ? t.REPEAT_ERROR : t.ERROR_MESSAGE}
          />
        </View>
        {isSet && (
          <TouchableOpacity onPress={() => this.setState({ isSet: false })} style={styles.reset}>
            <Text style={styles.resetText}>{t.RESET}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.button}>
          <GenesisButton disabled={!validator()} action={onPress} text={t.BUTTON_TEXT} />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  photo: state.userRegister.photo,
  username: state.userRegister.username,
  password: state.userRegister.password,
  email: state.userRegister.email,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  updateUserRegisterInfo: userRegisterAction.update,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPasswordScreen);

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'stretch',
  // },
  titleContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: 50,
    // paddingVertical: 10,
    textAlign: 'left',
    // backgroundColor: AppStyle.colorRed,
  },
  title: {
    flex: 1,
    ...AppStyle.fontRegularTitle,
    // paddingVertical: 60,
    paddingTop: 80,
    textAlign: 'left',
  },
  subtitle: {
    flex: 1,
    // paddingHorizontal: 50,
    textAlign: 'left',
    fontSize: AppStyle.fontMiddleSmall,
    color: AppStyle.mainBlackColor,
    fontFamily: AppStyle.fontFamilyBodyText,
  }, 
  inputContainer: {
    flex: 2,
  },
  button: {
    flex: 2,
  },
  reset: {
    paddingVertical: 30,
  },
  resetText: {
    textAlign: 'center',
    fontFamily: AppStyle.fontFamilyBodyText,
    color: AppStyle.mainBlue,
  },
});

const t = {
  TITLE: 'Set a password',
  REPEAT_TITLE: 'Repeat the password',
  SUBTITLE: 'Make sure it’s 6 characters or more.',
  BUTTON_TEXT: 'Next',
  PLACEHOLDER: 'Password',
  ERROR_MESSAGE: 'Sorry, this password is too weak',
  REPEAT_ERROR: 'this password is not the same as before',
  RESET: 'reset the password',
};
