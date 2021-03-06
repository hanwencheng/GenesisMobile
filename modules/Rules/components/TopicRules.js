import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Entypo } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import { voteInfo } from '../../../config';
import SingleLineDisplay from '../../../components/SingleLineDisplay';
import SingleLineSingleValueDisplay from '../../../components/SingleLineSingleValueDisplay';
import { alertNormal } from '../../../utils/alertUtils';
import Container from '../../../components/Container';

class TopicRules extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    voteCached: PropTypes.object.isRequired,
    editEnabled: PropTypes.bool.isRequired,
    conditionalOpen: PropTypes.func.isRequired,
    isJoined: PropTypes.bool.isRequired,
  };

  render() {
    const { navigation, voteCached, editEnabled, conditionalOpen, isJoined } = this.props;
    const rules = voteCached;
    return (
      <Container style={styles.container}>
        {/*<View style={styles.introContainer}>*/}
        {/*<Entypo*/}
        {/*name="users"*/}
        {/*size={AppStyle.fontBig}*/}
        {/*color={AppStyle.blueIcon}*/}
        {/*style={styles.introIcon}*/}
        {/*/>*/}
        {/*<Text style={styles.introText}>{t.RULES_INTRO}</Text>*/}
        {/*</View>*/}
        {/* {isJoined && <Text style={styles.rulesTitle}>{t.PEOPLE_RULES_TITLE}</Text>}
        {isJoined && (
          <SingleLineSingleValueDisplay
            title={voteInfo.rulesDescription}
            onClick={() => {
              navigation.navigate(screensList.MemberRules.label, {
                editEnabled,
                rulesData: rules,
              });
            }}
          />
        )} */}

        <SingleLineDisplay
          title={t.SUPPORT_TITLE}
          value={rules.requiredApproved.toFixed(1) + '%'}
          onClick={() => conditionalOpen(screensList.AmendSupport.label)}
        />
        <SingleLineDisplay
          title={t.DURATION_TITLE}
          value={`${rules.requiredHour} Hours`}
          onClick={() => {
            conditionalOpen(screensList.AmendDuration.label);
          }}
        />
        <SingleLineDisplay
          title={t.COST_TITLE}
          // value={`- ${rules.voteCost} NES`}
          value={`- ${rules.entryCost} Wei`}
          onClick={() => conditionalOpen(screensList.AmendCost.label)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  voteCached: state.vote.cached,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(TopicRules));

const t = {
  RULES_INTRO:
    'Rules set governance of a virtual country. All rules changes must go through voting. ',
  PEOPLE_RULES_TITLE: 'People Rules',
  SUPPORT_TITLE: 'Voting Support',
  DURATION_TITLE: 'Membership Due',
  COST_TITLE: 'Cost',
  NO_EDIT: 'Please edit the proposing or current rules.',
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  introContainer: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  introText: {
    flex: 3,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  introIcon: {
    padding: 20,
  },
  rulesTitle: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
});
