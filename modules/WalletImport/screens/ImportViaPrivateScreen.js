import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import Checker from '../../../utils/Checker';
import { walletImportAction } from '../walletImportAction';
import { loaderAction } from '../../../actions/loaderAction';
import { getAddressFromMnemonic, getAddressFromPrivateKey } from '../../../utils/ethereumUtils';
import { dataEntry } from '../../../reducers/loader';
import TextWithQRInput from '../components/TextWithQRInput';
import TinodeAPI from "../../Chat/TinodeAPI";
import {popupAction} from "../../../actions/popupAction";
import AppStyle from '../../../commons/AppStyle';

class ImportViaPrivateScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    saveAppData: PropTypes.func.isRequired,
    showPopup: PropTypes.func.isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    ...AppStyle.commonHeader,
 });

  generateKey = privateKey =>
    new Promise((resolve, reject) => {
      const { saveAppData, showPopup } = this.props;
      //TODO now I should get the public key and then save it into loader;s place and save private key into secure store.
      // and then split the default screen into two different screens.
      const wallet = getAddressFromPrivateKey(privateKey);
      if (!wallet) {
        return reject();
      }
      TinodeAPI.bindWallet(wallet.address)
      .then(()=> {
        saveAppData({
          [dataEntry.walletAddress.stateName]: wallet.address,
          [dataEntry.publicKey.stateName]: wallet.signingKey.publicKey,
        });
        resolve(wallet);
      })
      .catch( err => {
        showPopup(t.WALLET_BIND_ERROR);
        reject(err)
      })
      // saveAppData({
      //   [dataEntry.walletAddress.stateName]: wallet.address,
      //   [dataEntry.publicKey.stateName]: wallet.signingKey.publicKey,
      // });
      // return resolve(wallet);
    });

  validate = privateKey => privateKey === '' || !_.isEmpty(Checker.checkPrivateKey(privateKey));

  render() {
    return (
      <TextWithQRInput 
        generateKey={this.generateKey}
        validate={this.validate}
        errorText={t.INVALID_PRIVATE_KEY}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({
  ...walletImportAction,
  saveAppData: loaderAction.saveAppData,
  showPopup: popupAction.showPopup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportViaPrivateScreen);

const t = {
  INVALID_PRIVATE_KEY: 'Invalid Private Key.',
  WALLET_BIND_ERROR: 'You have already bind another wallet before.'
};
