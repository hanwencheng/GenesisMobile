import TinodeAPI from '../modules/Chat/TinodeAPI';
import { contractInfo } from '../config';
import {signTransaction} from "./ethereumUtils";
import {resetNavigation, resetNavigationToTopic} from "./navigationUtils";
import {screensList} from "../navigation/screensList";
import _ from "lodash";

export const joinTopic = (topicId, walletAddress, userId, subscribedChatId, privateKey, navigation, contractAddress, countryName) => {
  return TinodeAPI.initTransaction(topicId, {
    type: 'setcon',
    pubaddr: walletAddress,
    chainid: 3,
    conaddr: contractAddress,
    user: userId,
    fn: 'join',
    inputs: [],
  }).then(tx => {
    console.log('receive response tx', tx)
    const txRaw = {
      nonce: tx.nonce,
      gasLimit: tx.gaslimit,
      gasPrice: tx.gasprice,
      data: tx.data,
      value: contractInfo.joinDefaultValue,
      chainId: 3,
      to: contractAddress,
    };
    signTransaction(
      txRaw,
      privateKey
    ).then(signature => {
      console.log('signature is ', signature);
      resetNavigation(navigation, screensList.ChatList.label);
      const txParams = {
        signedtx: signature,
        what: 'send',
        type: 'setcon',
        fn: tx.fn,
        inputs: [''],
      }
      TinodeAPI.unsubscribe(subscribedChatId)
      TinodeAPI.lightSubscribe(topicId, txParams).then(ctrl=>{
        if(ctrl.code === 200) {
          resetNavigationToTopic(navigation, {
            topicId: ctrl.topic,
            title: countryName,
          });
        }
      });
    })
  });
};

export const createTopic = (walletAddress, userId, privateKey, topicParams, navigation) => {
  const {countryName, description, entryCost, exitCost} = topicParams
  const inputs = [countryName, description, entryCost.toString(), exitCost.toString()]
  return TinodeAPI.initTransaction(null, {
    type: 'depcon',
    pubaddr: walletAddress,
    chainid: 3,
    user: userId,
    fn: 'constructor',
    inputs,
  }).then((tx)=> {
    console.log('receive response tx', tx)
    const txRaw = {
      nonce: tx.nonce,
      gasLimit: tx.gaslimit,
      gasPrice: tx.gasprice,
      data: tx.data,
      value: contractInfo.createDefaultValue,
      chainId: 3,
    };
    signTransaction(
      txRaw,
      privateKey
    ).then(signature => {
      console.log('signature is ', signature);
      resetNavigation(navigation, screensList.ChatList.label);
      const txParams = {
        signedtx: signature,
        what: 'send',
        type: 'depcon',
        fn: tx.fn,
        inputs,
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

export const leaveTopic = (walletAddress, userId, privateKey, topicId, navigation, contractAddress) => {
  return TinodeAPI.initTransaction(null, {
    type: 'setcon',
    pubaddr: walletAddress,
    chainid: 3,
    conaddr: contractAddress,
    user: userId,
    fn: 'leave',
    inputs: [],
  }).then((tx)=> {
    console.log('receive response tx', tx)
    const txRaw = {
      nonce: tx.nonce,
      gasLimit: tx.gaslimit,
      gasPrice: tx.gasprice,
      data: tx.data,
      value: contractInfo.leaveDefaultValue,
      chainId: 3,
      to: contractAddress,
    };
    signTransaction(
      txRaw,
      privateKey
    ).then(signature => {
      console.log('signature is ', signature);
      resetNavigation(navigation, screensList.ChatList.label);
      const txParams = {
        signedtx: signature,
        what: 'send',
        type: 'setcon',
        fn: tx.fn,
        inputs: [],
      }
      TinodeAPI.leaveTopic(topicId, txParams).then(ctrl => {
        console.log('successful leave with ctrl', ctrl)
      });
      // TinodeAPI.sendTransaction(topicId, _.assign(txRaw, txParams));
    });
  });
}

const voteParamsConstractor = (contractAddress, ) => {
  return {
    pubaddr: contractAddress,
    ballot: 1,
    newvote: {},
  }
}

export const vote = () => {

}
