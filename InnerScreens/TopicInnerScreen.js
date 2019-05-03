import React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import AppStyle from '../commons/AppStyle';
import { screensList } from '../navigation/screensList';
import SingleLineDisplay from '../components/SingleLineDisplay';
import SingleSectionDisplay from '../components/SingleSectionDisplay';
import GenesisButton, { VariantList as variantList } from '../components/GenesisButton';
import { voteAction } from '../modules/Vote/voteAction';
import TinodeAPI from '../modules/Chat/TinodeAPI';
import { MemberListContainer, IntroContainer } from './components';
import { popupAction } from '../actions/popupAction';
import { lockScreen } from '../modules/Unlock/lockScreenUtils';
import { aboutInfo, contractInfo } from '../config';
import { createTopic, createVote, joinTopic, leaveTopic } from '../utils/contractUtils';
import { getPrivateKeyAsync } from '../utils/secureStoreUtils';
import VoteSession from '../modules/Chat/components/VoteSession';
import TopicRules from '../modules/Rules/components/TopicRules';
import { topicsAction } from '../modules/Chat/actions/topicsAction';
import { INIT_VALUE } from '../modules/Vote/reducer/voteReducer';
import { getBigNumber, getTreasury } from '../utils/ethereumUtils';

class TopicInnerScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    initVote: PropTypes.func.isRequired,
    resetVote: PropTypes.func.isRequired,
    edited: PropTypes.bool.isRequired,
    voteCached: PropTypes.object.isRequired,
    voteOrigin: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    showPopup: PropTypes.func.isRequired,
    rawPublicData: PropTypes.object.isRequired,
    subscribedChatId: PropTypes.string,
    chatMap: PropTypes.object.isRequired,
    topicsMap: PropTypes.object.isRequired,
    updateTopic: PropTypes.func.isRequired,

    currentNewVote: PropTypes.object.isRequired,
    topicId: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    allowEdit: PropTypes.bool.isRequired,
    isJoined: PropTypes.bool.isRequired,
    walletAddress: PropTypes.string,
  };

  get topicData() {
    const { topicId, topicsMap } = this.props;
    return _.get(topicsMap, topicId, {});
  }

  componentDidMount() {
    const { initVote, topicId, voteOrigin, userId, updateTopic, walletAddress } = this.props;
    const topic = this.topicData;

    initVote(voteOrigin);
    if (this.isCreatingNewTopic) return;

    TinodeAPI.getDescription(topicId).then(data => {
      updateTopic(topicId, data);
      const newVote = _.assign({}, voteOrigin, {
        countryName: _.get(data, 'public.fn', voteOrigin.countryName),
        countrydesc: _.get(data, 'countrydesc', voteOrigin.countrydesc),
        requiredHour: parseFloat(
          (_.get(data, 'voteduration', voteOrigin.voteduration) / 3600).toFixed(2)
        ),
        requiredApproved: _.get(data, 'votepassrate', voteOrigin.votepassrate),
      });

      if (!data.conaddr) return initVote(newVote);

      getTreasury(data.conaddr).then(data =>
        initVote(_.assign(newVote, { treasury: getBigNumber(data) }))
      );
    });

    TinodeAPI.getVoteInfo(topicId, walletAddress, userId)
      .then(data => {
        updateTopic(topicId, { vote: data });
      })
      .catch(error => {
        updateTopic(topicId, { vote: null });
      });
  }

  onNewVote() {
    const { navigation, userId, walletAddress, currentNewVote } = this.props;
    if (_.isEmpty(currentNewVote) || this.isCreatingNewTopic) return;

    this.prepareTransaction('Payment', contractInfo.joinDefaultValue, privateKey => {
      createVote(walletAddress, userId, privateKey, this.topicData, navigation, currentNewVote);
    });
  }

  onJoin() {
    const { topicId, walletAddress, userId, subscribedChatId, navigation } = this.props;
    const topic = this.topicData;
    this.prepareTransaction('Payment', contractInfo.joinDefaultValue, privateKey => {
      const countryName = topic.public.fn;
      joinTopic(
        topicId,
        walletAddress,
        userId,
        subscribedChatId,
        privateKey,
        navigation,
        topic.conaddr,
        countryName
      );
    });
  }

  onCreate() {
    const { voteCached, walletAddress, userId, showPopup, navigation } = this.props;
    const paramError = _.get(this.validateTopicParams(), 'error', null);
    if (paramError) return showPopup(paramError);
    this.prepareTransaction('Payment', contractInfo.createDefaultValue, privateKey => {
      createTopic(walletAddress, userId, privateKey, voteCached, navigation);
    });
  }

  onLeave() {
    const { topicId, walletAddress, userId, navigation } = this.props;
    this.prepareTransaction('Payment', contractInfo.leaveDefaultValue, privateKey => {
      leaveTopic(walletAddress, userId, privateKey, topicId, navigation, this.topicData.conaddr);
    });
  }

  prepareTransaction(title, value, callback) {
    const { walletAddress, navigation, showPopup } = this.props;
    const valueText = Number.parseFloat(value / contractInfo.ethBaseValue).toPrecision(3);
    const message = `${valueText} Eth`;
    Alert.alert(
      title,
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
                  showPopup(t.SEND_TRANSACTION);
                  callback(privateKey);
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
  }

  showVoteNeededAlert() {
    Alert.alert(
      'Cannot Vote',
      'Have not joined or a vote is running',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }

  get isCreatingNewTopic() {
    const { isJoined, allowEdit } = this.props;
    return !isJoined && allowEdit;
  }

  get isBlockedUser() {
    const { isJoined, allowEdit } = this.props;
    return !isJoined && !allowEdit;
  }

  get hasVote() {
    return !_.isEmpty(this.topicData.vote);
  }

  renderButton() {
    const { isJoined, edited, resetVote } = this.props;
    if (this.isCreatingNewTopic)
      return (
        <GenesisButton
          action={() => this.onCreate()}
          text={t.BUTTON_CREATE}
          variant={variantList.CREATE}
        />
      );
    if (edited)
      return (
        <React.Fragment>
          <GenesisButton
            action={() => resetVote()}
            text={t.BUTTON_RESET_EDIT}
            variant={variantList.PRIMARY}
          />
          <GenesisButton
            action={() => this.onNewVote()}
            text={t.BUTTON_CONFIRM_EDIT}
            variant={variantList.CONFIRM}
          />
        </React.Fragment>
      );
    if (isJoined)
      return (
        <GenesisButton
          action={() => this.onLeave()}
          text={t.BUTTON_LEAVE}
          variant={variantList.CANCEL}
        />
      );
    if (this.isBlockedUser)
      return (
        <GenesisButton
          action={() => this.onJoin()}
          text={t.BUTTON_JOIN}
          variant={variantList.CONFIRM}
        />
      );
  }

  validateTopicParams() {
    const { voteCached } = this.props;
    if (_.isEmpty(voteCached.countryName)) return { error: t.CREATE_NAME_ERROR };
    if (_.isEmpty(voteCached.countrydesc)) return { error: t.CREATE_DESCRIPTION_ERROR };
    // if (_.isEmpty(voteCached.profile)) return { error: t.CREATE_PHOTO_ERROR };
    return { error: null };
  }

  renderIntroOrMemberList() {
    const { isJoined, navigation, rawPublicData, userId } = this.props;
    if (isJoined) return <MemberListContainer subs={this.topicData.subs} navigation={navigation} />;
    if (this.isCreatingNewTopic)
      // return <IntroContainer iconName={iconName} description={t.CREATE_COUNTRY_INTRO} />;
      return (
        <MemberListContainer
          subs={[
            {
              user: userId,
              public: rawPublicData,
            },
          ]}
          navigation={navigation}
        />
      );
    return null;
  }

  conditionalOpen(screenLabel) {
    const { navigation, allowEdit, currentNewVote } = this.props;
    const that = this;
    if (allowEdit && !this.hasVote) {
      navigation.navigate(screenLabel, {
        onGoBack: () => {
          that.onNewVote();
        },
      });
    } else {
      this.showVoteNeededAlert();
    }
  }

  render() {
    const { navigation, allowEdit, isJoined, voteCached } = this.props;
    //TODO remove defensive check
    if (_.isEmpty(voteCached)) return null;

    const topicTitle = voteCached.countryName;
    const topicDescription = voteCached.countrydesc;

    return (
      <ScrollView style={styles.container}>
        {isJoined && allowEdit && this.hasVote && <VoteSession />}
        {this.renderIntroOrMemberList()}
        <View style={styles.infoContainer}>
          <SingleLineDisplay
            title={t.GROUP_TOPIC_TITLE}
            value={topicTitle}
            onClick={
              this.isCreatingNewTopic
                ? () => this.conditionalOpen(screensList.AmendCountryName.label)
                : null
            }
          />
          <SingleSectionDisplay
            title={t.TOPIC_DESCRIPTION_TITLE}
            value={topicDescription}
            onClick={() => this.conditionalOpen(screensList.AmendDescription.label)}
          />
          {isJoined && (
            <SingleLineDisplay
              title={t.TOPIC_META_TITLE}
              value={_.get(voteCached, 'treasury', '0')}
              onClick={() => navigation.navigate(screensList.Transactions.label)}
            />
          )}
        </View>

        {/*<Text style={styles.rulesTitle}>{t.VOTE_RULES_TITLE}</Text>*/}
        <TopicRules
          isJoined={isJoined}
          voteCached={voteCached}
          editEnabled={allowEdit && !this.hasVote}
          conditionalOpen={this.conditionalOpen.bind(this)}
        />
        {/*<RulesList*/}
        {/*voteOrigin={voteOrigin}*/}
        {/*voteCached={voteCached}*/}
        {/*isJoined={isJoined}*/}
        {/*hasVoting={false}*/}
        {/*isEdited={edited}*/}
        {/*allowEdit={allowEdit && !hasVote}*/}
        {/*/>*/}
        {/* TODO disable Dapp Store Now <Text style={styles.rulesTitle}>{t.MINI_DAPPS}</Text>*/}
        {/* TODO disable Dapp Store Now <DappsList />*/}
        <Text style={styles.bottomTip}>
          {this.isCreatingNewTopic
            ? t.CREATE_COUNTRY_INTRO
            : isJoined
            ? t.VOTE_INTRO
            : t.JOIN_INTRO}
        </Text>
        {this.renderButton()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  edited: !_.isEqual(state.vote.origin, state.vote.cached),
  voteCached: state.vote.cached,
  voteOrigin: state.vote.origin,
  userId: state.appState.userId,
  rawPublicData: state.chat.rawPublicData,
  walletAddress: state.appState.walletAddress,

  //only used for test
  topicsMap: state.topics.topicsMap,
  chatMap: state.chat.chatMap,
  currentNewVote: state.vote.currentNewVote,
  subscribedChatId: state.chat.subscribedChatId,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  initVote: voteAction.initVote,
  resetVote: voteAction.resetVote,
  showPopup: popupAction.showPopup,
  updateTopic: topicsAction.updateTopic,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(TopicInnerScreen));

const t = {
  // VOTE_INTRO: 'Current cost to start a vote is 500 ENS, paid to cover ETH smart contract fees.',
  VOTE_INTRO: 'Current cost to start a vote is 500 ETH, paid to cover ETH smart contract fees.',
  JOIN_INTRO: 'You will be asked to pay membership due immediately when you choose to join.',
  VOTE_RULES_TITLE: 'Rules',
  MINI_DAPPS: 'Dapps',
  GROUP_TOPIC_TITLE: 'Country Name',
  TOPIC_DESCRIPTION_TITLE: 'Description',
  TOPIC_RULES: 'Rules',
  TOPIC_META_TITLE: 'National Treasure',
  VIEW_MORE_MEMBERS: 'View more members',

  BUTTON_CONFIRM_EDIT: 'Confirm and start Voting',
  BUTTON_RESET_EDIT: 'Reset the rules',
  BUTTON_LEAVE: 'Delete and leave',
  BUTTON_JOIN: 'Join',
  BUTTON_CREATE: 'Create Country',

  // CREATE_COUNTRY_INTRO:
  //   'Current cost to start a virtual country is 1000 NES, paid to cover ETH smart contract fees.',
  CREATE_COUNTRY_INTRO:
    'Current cost to start a virtual country is 1000 ETH, paid to cover ETH smart contract fees.',
  CREATE_NAME_ERROR: 'Please fill a valid country name',
  CREATE_DESCRIPTION_ERROR: 'Please fill a description for your country',
  CREATE_PHOTO_ERROR: 'Please upload a profile photo for the country',

  NO_WALLET: 'please set wallet first',
  SEND_TRANSACTION: 'Transaction sending to the blockchain network',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
  },
  rulesTitle: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    ...AppStyle.fontRegularTitle,
    // color: AppStyle.lightGrey,
    // fontFamily: AppStyle.mainFont,
    // fontSize: AppStyle.fontMiddleSmall,
  },
  infoContainer: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  bottomTip: {
    padding: 40,
    marginTop: 20,
    color: AppStyle.bodyTextGrey,
  },
});
