import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { Wallet } from 'ethers';
import { withNavigation } from 'react-navigation';
import AppStyle from '../../../commons/AppStyle';
import { dataEntry } from '../../../reducers/loader';
import { saveMnemonicAsync, savePrivateKeyAsync } from '../../../utils/secureStoreUtils';
import { lockScreen } from '../../Unlock/lockScreenUtils';
import { loaderAction } from '../../../actions/loaderAction';
import Container from '../../../components/Container';
import { resetNavigationToWallet } from '../../../utils/navigationUtils';
import TinodeAPI from "../../Chat/TinodeAPI";
import {popupAction} from "../../../actions/popupAction";

class WalletCreateInnerScreen extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    saveAppData: PropTypes.func.isRequired,
    showPopup: PropTypes.func.isRequired,
    bindWalletAction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { saveAppData, navigation, showPopup, bindWalletAction } = this.props;

    const createWallet = new Promise((resolve, reject) => {
      //TODO now I should get the public key and then save it into loader;s place and save private key into secure store.
      // and then split the default screen into two different screens.
      const wallet = Wallet.createRandom();
      if (!wallet) {
        return reject();
      }
      TinodeAPI.bindWallet(wallet.address)
        .then(()=> {
          saveAppData({
            [dataEntry.walletAddress.stateName]: wallet.address,
            [dataEntry.publicKey.stateName]: wallet.signingKey.publicKey,
          });
          bindWalletAction(wallet.address)
          resolve(wallet);
        })
        .catch( err => {
          console.log(err)
          reject(err)
        })
    });

    createWallet
      .then(
        wallet =>
          new Promise((resolve, reject) => {
            savePrivateKeyAsync(
              wallet.privateKey,
              () => {
                resolve(wallet);
              },
              reject
            );
          })
      )
      .then(
        wallet =>
          new Promise((resolve, reject) => {
            saveMnemonicAsync(
              wallet.mnemonic,
              () => {
                resolve(wallet);
              },
              reject
            );
          })
      )
      .then(wallet => {
        console.log('all save successfully, created wallet is', wallet);
        return lockScreen(navigation);
      })
      .then(() => {
        resetNavigationToWallet(navigation);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.text}>Creating new wallet...</Text>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({
  saveAppData: loaderAction.saveAppData,
  showPopup: popupAction.showPopup,
  bindWalletAction: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(WalletCreateInnerScreen));

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppStyle.mainBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: AppStyle.fontMiddleSmall,
    fontFamily: AppStyle.mainFont,
  },
});
