import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import AppStyle from '../../../commons/AppStyle';
import Container from '../../../components/Container';
import Images from '../../../commons/Images';
import NavigationHeader from '../../../components/NavigationHeader';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import TinodeAPI from '../../Chat/TinodeAPI';
import packageJson from '../../../package';
import { screensList } from '../../../navigation/screensList';
import { lockScreen, resetPincode } from '../../Unlock/lockScreenUtils';
import { getPrivateKeyAsync } from '../../../utils/secureStoreUtils';
import { resetNavigation } from '../../../utils/navigationUtils';

class AccountSecuritySettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.AccountSecuritySettings.title} />,
    headerBackTitle: '',
    ...AppStyle.commonHeader,
  });

  static propTypes = {
    navigation: PropTypes.object,
    hasPassword: PropTypes.bool.isRequired,
  };

  render() {
    const { navigation, hasPassword } = this.props;
    return (
      <Container style={styles.container}>
        <SingleLineDisplay
          title={t.PASSCODE}
          value={hasPassword ? t.SET : t.NOT_SET}
          onClick={() => {
            if (hasPassword) {
              lockScreen(navigation)
                .then(() => resetPincode(navigation))
                .then(() => resetNavigation(navigation, screensList.Settings.label));
            } else {
              lockScreen(navigation).then(() =>
                resetNavigation(navigation, screensList.Settings.label)
              );
            }
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  hasPassword: state.appState.hasPassword,
});

export default connect(mapStateToProps)(AccountSecuritySettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
});

const t = {
  PASSCODE: 'Passcode',
  NOT_SET: 'Not Set',
  SET: 'Change the Passcode',
};
