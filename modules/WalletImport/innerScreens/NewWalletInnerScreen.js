import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import Images from '../../../commons/Images';
import SmallCard from '../../../components/SmallCard';
import AppStyle from '../../../commons/AppStyle';
import { screensList } from '../../../navigation/screensList';
import _ from "lodash";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class NewWalletInnerScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    bindWallet: PropTypes.string.isRequired,
  };

  static navigationOptions = {
    title: screensList.WalletCreate.title,
    headerBackTitle: null,
  };
  
  get isFirstBinding () {
    const { bindWallet } = this.props;
    return _.isEmpty(bindWallet)
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.isFirstBinding && <SmallCard
          style={styles.card}
          title={t.createTitle}
          subtitle={t.createSubtitle}
          imageCard={Images.imgCardCreate}
          onPress={() => navigate(screensList.WalletCreate.label)}
          subtitleTextStyle={styles.subtitle}
        />}

        <SmallCard
          style={styles.card}
          title={this.isFirstBinding ? t.importTitle : t.recoverTitle}
          subtitle={this.isFirstBinding ? t.importSubtitle : t.recoverSubtitle}
          imageCard={Images.imgCardImport}
          onPress={() => navigate(screensList.WalletImport.label)}
          subtitleTextStyle={styles.subtitle}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  bindWallet: state.chat.userInfo.bindWallet,
});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(NewWalletInnerScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 40,
  },
  subtitle: {
    color: AppStyle.secondaryTextColor,
    marginTop: 4,
    fontSize: 16,
  },
});

const t = {
  createTitle: 'Create',
  createSubtitle: 'a new wallet',
  importTitle: 'Import',
  importSubtitle: 'an existed wallet',
  recoverTitle: 'Recover',
  recoverSubtitle: 'your previous wallet',
};
