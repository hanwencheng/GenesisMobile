import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import AppStyle from '../../../commons/AppStyle';
import Container from '../../../components/Container';
import NavigationHeader from '../../../components/NavigationHeader';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import TinodeAPI from '../../Chat/TinodeAPI';
import packageJson from '../../../package';
import { screensList } from '../../../navigation/screensList';

class MainSettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.MainSettings.title} />,
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
          title={screensList.AccountSecuritySettings.title}
          value={''}
          style={styles.singleDisplay}
          onClick={() => navigation.push(screensList.AccountSecuritySettings.label)}
        />
        <SingleLineDisplay
          title={t.ABOUT_TITLE}
          style={styles.singleDisplay}
          value={packageJson.version}
          onClick={() => navigation.navigate(screensList.About.label)}
        />
        <View style={{ flexGrow: 1 }} />
        <TouchableOpacity style={styles.logout} onPress={() => TinodeAPI.logout(navigation)}>
          <Text>{t.LOG_OUT_TITLE}</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default connect()(MainSettingsScreen);

const styles = StyleSheet.create({
  singleDisplay: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  logout: {
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
});

const t = {
  ABOUT_TITLE: 'About',
  LOG_OUT_TITLE: 'Log Out',
};
