import React from 'react';
import { Button, StyleSheet, View, Text, ScrollView, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import NavigationHeader from '../../../components/NavigationHeader';
import { contractInfo, voteInfo } from '../../../config';
import SingleProfile from '../components/SingleProfile';
import Images from '../../../commons/Images';
import { makeImageUrl } from '../../Chat/lib/blob-helpers';
import HeaderButton from '../../../components/HeaderButton';
import { alertNormal } from '../../../utils/alertUtils';
import { createVote } from '../../../utils/contractUtils';
import { lockScreen } from '../../Unlock/lockScreenUtils';
import { getPrivateKeyAsync } from '../../../utils/secureStoreUtils';
import { popupAction } from '../../../actions/popupAction';

class MemberRulesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <NavigationHeader title={screensList.MemberRules.title} />,
    headerRight: (
      <HeaderButton
        title={screensList.RulesInfo.title}
        onPress={() => navigation.navigate(screensList.RulesInfo.label)}
        color={AppStyle.mainBlackColor}
      />
    ),
    headerBackTitle: '',
    ...AppStyle.commonHeader,
  });

  static propTypes = {
    navigation: PropTypes.object,
    subscribedChatId: PropTypes.string,
    topicsMap: PropTypes.object.isRequired,
    voteCached: PropTypes.object.isRequired,
    walletAddress: PropTypes.string.isRequired,
    showPopup: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
  };

  get topicData() {
    const { subscribedChatId, topicsMap } = this.props;
    return _.get(topicsMap, subscribedChatId, {});
  }

  renderItem = ({ item }) => {
    let imageSource;
    if (item.public.photo) {
      imageSource = { uri: makeImageUrl(item.public.photo) };
    } else {
      imageSource = Images.blankProfile;
    }

    return (
      <SingleProfile
        imageSource={imageSource}
        info={this.renderRulesValue(item.user)}
        name={item.public.fn}
        onPress={() => this.conditionalOpen(item.user)}
      />
    );
  };

  conditionalOpen(memberId) {
    const { navigation, userId, walletAddress, showPopup } = this.props;

    const editEnabled = navigation.getParam('editEnabled', false);
    if(memberId === this.topicData.subs[0].user)
      return showPopup(t.KICK_OWNER_ERROR);
    
    if (editEnabled) {
      const valueText = Number.parseFloat(
        contractInfo.kickOutDefaultValue / contractInfo.ethBaseValue
      ).toPrecision(3);
      const message = `${valueText} Eth`;
      Alert.alert(
        t.KICK_OUT_MEMBER,
        message,
        [
          {
            text: 'Pay now',
            onPress: () => {
              if (_.isEmpty(walletAddress)) {
                showPopup(t.NO_WALLET);
              } else {
                lockScreen(navigation)
                  .then(() => new Promise(getPrivateKeyAsync))
                  .then(privateKey => {
                    showPopup(t.SUBMIT_VOTE);
                    createVote(walletAddress, userId, privateKey, this.topicData, navigation, {
                      name: 'kickOut',
                      value: memberId,
                    });
                  });
              }
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
      /** //Origin opening function
       navigation.navigate(screensList.AmendMemberRules.label, {
         userId,
       });
       **/
    } else {
      alertNormal('Vote not available.');
    }
  }

  renderRulesValue(memberId) {
    const { voteCached, navigation } = this.props;
    const editEnabled = navigation.getParam('editEnabled', false);
    const rules = editEnabled ? voteCached : navigation.getParam('rulesData');
    const defaultRules = _.get(rules, 'memberRules.default');
    const memberRules = _.get(rules, `memberRules.${memberId}`, defaultRules);
    return memberRules.join('/');
  }

  render() {
    const { topicsMap, subscribedChatId, voteCached } = this.props;
    const topic = _.get(topicsMap, subscribedChatId);
    if (!topic) return null;
    console.log('in profile members, topic is', topic);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.rulesTitleText}>{voteInfo.rulesDescription}</Text>
        </View>
        {/*<SingleProfile*/}
          {/*imageSource={Images.blankProfile}*/}
          {/*info={this.renderRulesValue()}*/}
          {/*name={t.FUTURE_CITIZEN}*/}
          {/*onPress={() => this.conditionalOpen('default')}*/}
        {/*/>*/}

        <FlatList
          style={styles.memberList}
          data={topic.subs}
          extraData={voteCached}
          renderItem={this.renderItem}
          keyExtractor={item => item.user}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  subscribedChatId: state.chat.subscribedChatId,
  walletAddress: state.appState.walletAddress,
  userId: state.appState.userId,
  topicsMap: state.topics.topicsMap,
  voteCached: state.vote.cached,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  showPopup: popupAction.showPopup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberRulesScreen);

const t = {
  FUTURE_CITIZEN: 'Future Citizens',
  KICK_OUT_MEMBER: 'Kick Out Member',
  NO_WALLET: 'please first set up the wallet',
  SUBMIT_VOTE: 'Vote has been submitted',
  KICK_OWNER_ERROR: 'Cannot kick out the owner',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  rulesTitleText: {
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontSmall,
    color: AppStyle.lightGrey,
  },
  memberList: {
    marginTop: 10,
  },
});
