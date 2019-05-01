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

class AccountSecuritySettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.AccountSecuritySettings.title} />,
    headerBackTitle: '',
    ...AppStyle.commonHeader,
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <SingleLineDisplay
          title={t.PASSCODE}
          value={'Not Set'}
          onClick={() => navigation.push(screensList.Unlock.label)}
        />
      </Container>
    );
  }
}

export default connect()(AccountSecuritySettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
});

const t = {
  PASSCODE: 'Passcode',
};
