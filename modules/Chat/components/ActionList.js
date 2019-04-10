import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import AppStyle from '../../../commons/AppStyle';
import Images from '../../../commons/Images';
import { screensList } from '../../../navigation/screensList';
import TinodeAPI from '../TinodeAPI';
import { popupAction } from '../../../actions/popupAction';
import { contractInfo } from '../../../config';
import { createTopic } from '../../../utils/contractUtils';

class ActionList extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    walletAddress: PropTypes.string,
    showPopup: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  renderList() {
    const { navigation, topic, walletAddress, showPopup, userId } = this.props;
    const dappList = [
      {
        name: 'vote',
        imageSource: Images.vote,
        action: () => navigation.navigate(screensList.VoteInfo.label),
      },
      // TODO disable App Store now.
      // {
      //   name: 'AppStore',
      //   imageSource: Images.appStore,
      //   action: () => {
      //     navigation.navigate(screensList.AppStore.label);
      //   },
      // },
      {
        name: 'initTransaction',
        imageSource: Images.appStore,
        action: () => {
          if (_.isEmpty(walletAddress)) {
            showPopup(t.NO_WALLET);
          } else {
            createTopic(topic, walletAddress, userId);
          }
        },
      },
      {
        name: 'sendTransaction',
        imageSource: Images.appStore,
        action: () => {
          TinodeAPI.sendTransaction(topic.topic, {
            pubaddr: walletAddress,
            chainid: 3,
            type: 'depcon',
            signedtx: '',
            user: userId,
            fn: '',
            inputs: ['kingdom', 'this is a new country', '100', '200'],
          });
        },
      },
    ];

    return dappList.map(item => (
      <TouchableOpacity style={styles.dappContainer} key={item.name} onPress={item.action}>
        <View style={styles.imageContainer}>
          <Image source={item.imageSource} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    ));
  }

  render() {
    if (!this.props.show) return null;
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}

const mapStateToProps = state => ({
  walletAddress: state.appState.walletAddress,
  userId: state.chat.userId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  showPopup: popupAction.showPopup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(ActionList));

const t = {
  NO_WALLET: 'please first set up the wallet',
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  dappContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
    color: AppStyle.lightGrey,
  },
});
