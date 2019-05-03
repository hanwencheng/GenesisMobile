import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import { makeImageUrl } from '../modules/Chat/lib/blob-helpers';
import Images from '../commons/Images';
import MemberProfile from './MemberProfile';

export default class MemberList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    limit: PropTypes.number,
    withFutureMember: PropTypes.bool,
  };

  static defaultProps = {
    limit: 500,
    withFutureMember: true,
  };

  //TODO could use dynamic scroll to fetch the list, now set 500 as limit.
  renderMemberList(subs) {
    const { limit } = this.props;
    let renderList;
    if (subs.length > limit) {
      renderList = _.slice(subs, 0, 25);
    } else {
      renderList = subs;
    }
    return renderList.map(item => {
      let imageSource;
      if (item.public.photo) {
        imageSource = { uri: makeImageUrl(item.public.photo) };
      } else {
        imageSource = Images.blankProfile;
      }
      return (
        <MemberProfile
          title={item.public.fn}
          imageSource={imageSource}
          key={item.user}
          raw={item}
        />
      );
    });
  }

  renderFutureMember() {
    // return (
    //   <MemberProfile
    //     title={t.FUTURE_MEMBER_NAME}
    //     imageSource={Images.futureMember}
    //     key={t.FUTURE_MEMBER_NAME}
    //     raw={null}
    //   />
    // );
  }

  render() {
    const { list, withFutureMember } = this.props;
    return (
      <View style={styles.container}>
        {this.renderMemberList(list)}
        {withFutureMember && this.renderFutureMember()}
      </View>
    );
  }
}

const t = {
  FUTURE_MEMBER_NAME: 'Future Member',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
