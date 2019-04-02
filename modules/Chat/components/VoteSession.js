import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import SingleLineSingleValueDisplay from '../../../components/SingleLineSingleValueDisplay';

class VoteSession extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static defaultProps = {};

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SingleLineSingleValueDisplay
          title={t.VOTE_IN_SESSION}
          fontColor="white"
          style={{ backgroundColor: AppStyle.blueButton }}
          onClick={() => {
            navigation.navigate(screensList.VoteInfo.label);
          }}
        />
      </View>
    );
  }
}

export default withNavigation(VoteSession);

const t = {
  VOTE_IN_SESSION: 'Vote in Session!',
};

const styles = StyleSheet.create({
  container: {},
});
