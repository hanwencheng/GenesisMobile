import TinodeAPI from '../modules/Chat/TinodeAPI';
import { contractInfo } from '../config';
import {signTransaction} from "./ethereumUtils";
import {resetNavigation, resetNavigationToTopic} from "./navigationUtils";
import {screensList} from "../navigation/screensList";
import _ from "../InnerScreens/TopicInnerScreen";

export const joinGroup = (topic, walletAddress, userId) => {
  return TinodeAPI.initTransaction(topic.topic, {
    type: 'setcon',
    pubaddr: walletAddress,
    chainid: 3,
    signedtx: '',
    conaddr: contractInfo.testAddress,
    user: userId,
    fn: 'join',
    inputs: ['kingdom', 'this is a new country', '100', '200'],
  });
};

export const createTopic = (walletAddress, userId, privateKey, topicParams, navigation) => {
  const {countryName, description, entryCost, exitCost} = topicParams
  const inputs = [countryName, description, entryCost.toString(), exitCost.toString()]
  return TinodeAPI.initTransaction(null, {
    type: 'depcon',
    pubaddr: walletAddress,
    chainid: 3,
    // signedtx: '',
    // conaddr: '',
    user: userId,
    fn: 'constructor',
    inputs,
  }).then((tx)=> {
    console.log('tx is', tx)
    const txRaw = {
      nonce: tx.nonce,
      gasLimit: tx.gaslimit,
      gasPrice: tx.gasprice,
      data: tx.data,
      value: contractInfo.defaultValue,
      chainId: 3,
    };
    signTransaction(
      txRaw,
      privateKey
    ).then(signature => {
      console.log('signature is ', signature);
      console.log('receive response', tx);
      resetNavigation(navigation, screensList.ChatList.label);
      const txParams = {
        signedtx: signature,
        what: 'send',
        type: 'depcon',
        fn: tx.fn,
        inputs: ['kingdom', 'this is a new country', '100', '200'],
      }
      TinodeAPI.createAndSubscribeNewTopic(topicParams, txParams).then(ctrl => {
        resetNavigationToTopic(navigation, {
          topicId: ctrl.topic,
          title: topicParams.countryName,
        });
      });
      // TinodeAPI.sendTransaction(topicId, _.assign(txRaw, txParams));
    });
  
  });
};
