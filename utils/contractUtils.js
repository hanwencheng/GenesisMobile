import _ from 'lodash';
import TinodeAPI from '../modules/Chat/TinodeAPI';
import { contractInfo, environment } from '../config';
import { signTransaction } from './ethereumUtils';
import { resetNavigation, resetNavigationToTopic } from './navigationUtils';
import { screensList } from '../navigation/screensList';
import { ConstructorParams, ContractFnMap } from '../constants/ContractParams';

export const joinTopic = (
  topicId,
  walletAddress,
  userId,
  subscribedChatId,
  privateKey,
  navigation,
  contractAddress,
  countryName
) => {
  return TinodeAPI.initTransaction(topicId, {
    type: 'setcon',
    pubaddr: walletAddress,
    chainid: 3,
    conaddr: contractAddress,
    user: userId,
    fn: 'join',
    inputs: [],
  }).then(tx => {
    console.log('receive response tx', tx);
    const txRaw = {
      nonce: tx.nonce,
      gasLimit: tx.gaslimit,
      gasPrice: tx.gasprice,
      data: tx.data,
      value: contractInfo.joinDefaultValue,
      chainId: 3,
      to: contractAddress,
    };
    signTransaction(txRaw, privateKey).then(signature => {
      console.log('signature is ', signature);
      resetNavigation(navigation, screensList.ChatList.label);
      const txParams = {
        signedtx: signature,
        what: 'send',
        type: 'setcon',
        fn: tx.fn,
        inputs: [''],
      };
      TinodeAPI.unsubscribe(subscribedChatId);
      TinodeAPI.lightSubscribe(topicId, txParams).then(ctrl => {
        if (ctrl.code === 200) {
          resetNavigationToTopic(navigation, {
            topicId: ctrl.topic,
            title: countryName,
          });
        }
      });
    });
  });
};

export const createTopic = (walletAddress, userId, privateKey, topicParams, navigation) => {
  const { countryName, countrydesc, entryCost = 100, tax = 0 } = topicParams;
  const votePassRate = topicParams.requiredApproved || 50;
  const voteDuration = topicParams.requiredHour * 3600 || 3600;
  //Contract inputs need all be strings
  const inputs = [countryName, countrydesc, entryCost.toString(), tax.toString()];
  return TinodeAPI.initTransaction(null, {
    type: 'depcon',
    pubaddr: walletAddress,
    chainid: 3,
    user: userId,
    fn: 'constructor',
    inputs,
  }).then(tx => {
    console.log('receive response tx', tx);
    const txRaw = {
      nonce: tx.nonce,
      gasLimit: tx.gaslimit,
      gasPrice: tx.gasprice,
      data: tx.data,
      value: contractInfo.createDefaultValue,
      chainId: 3,
    };
    signTransaction(txRaw, privateKey).then(signature => {
      console.log('signature is ', signature);
      resetNavigation(navigation, screensList.ChatList.label);
      const txParams = {
        signedtx: signature,
        what: 'send',
        type: 'depcon',
        fn: tx.fn,
        inputs,
      };
      const constructorParams = {
        [ConstructorParams.VOTE_PASS_RATE]: votePassRate,
        [ConstructorParams.VOTE_DURATION]: environment.disableVoteDuration
          ? environment.mockDurationSecond
          : voteDuration,
        [ConstructorParams.COUNTRY_DESC]: countrydesc
      };
      TinodeAPI.createAndSubscribeNewTopic(topicParams, txParams, constructorParams).then(ctrl => {
        resetNavigationToTopic(navigation, {
          topicId: ctrl.topic,
          title: topicParams.countryName,
        });
      });
      // TinodeAPI.sendTransaction(topicId, _.assign(txRaw, txParams));
    });
  });
};

export const leaveTopic = (
  walletAddress,
  userId,
  privateKey,
  topicId,
  navigation,
  contractAddress
) => {
  return TinodeAPI.initTransaction(null, {
    type: 'setcon',
    pubaddr: walletAddress,
    chainid: 3,
    conaddr: contractAddress,
    user: userId,
    fn: 'leave',
    inputs: [],
  }).then(tx => {
    console.log('receive response tx', tx);
    const txRaw = {
      nonce: tx.nonce,
      gasLimit: tx.gaslimit,
      gasPrice: tx.gasprice,
      data: tx.data,
      value: contractInfo.leaveDefaultValue,
      chainId: 3,
      to: contractAddress,
    };
    signTransaction(txRaw, privateKey).then(signature => {
      console.log('signature is ', signature);
      resetNavigation(navigation, screensList.ChatList.label);
      const txParams = {
        signedtx: signature,
        what: 'send',
        type: 'setcon',
        fn: tx.fn,
        inputs: [],
      };
      TinodeAPI.leaveTopic(topicId, txParams).then(ctrl => {
        console.log('successful leave with ctrl', ctrl);
      });
      // TinodeAPI.sendTransaction(topicId, _.assign(txRaw, txParams));
    });
  });
};

const voteParamsConstractor = contractAddress => {
  return {
    pubaddr: contractAddress,
    ballot: 1,
  };
};

const getVoteDifference = (voteCached, voteOrigin) =>
  _.reduce(
    voteCached,
    (acc, value, key) => {
      if (value === voteOrigin[key]) return acc;
      return _.set(acc, key, value);
    },
    {}
  );

export const createVote = (
  walletAddress,
  userId,
  privateKey,
  topicParams,
  navigation,
  currentNewVote
) => {
  const { subs, conaddr } = topicParams;
  const voters = _.map(subs, 'user');
  const votePassRate = topicParams.votepassrate || 50;
  const voteDuration = environment.disableVoteDuration
    ? environment.mockDurationSecond
    : topicParams.voteduration || 3600;

  const paramsConstructor = _.get(ContractFnMap, `${currentNewVote.name}`, {
    name: '',
    value: () => [],
    isContract: false,
  });

  const newVote = {
    owner: userId /**/,
    duration: voteDuration,
    passrate: votePassRate,
    voters,
    isContract: paramsConstructor.isContract,
    conaddr,
    fn: paramsConstructor.name,
    inputs: paramsConstructor.value(currentNewVote.value),
  };
  //Contract inputs need all be strings
  TinodeAPI.createNewVote(topicParams.topic, walletAddress, newVote, userId).then(tx => {
    console.log('receive response tx', tx);
    TinodeAPI.getVoteInfo(topicParams.topic, walletAddress);
  });

  return resetNavigationToTopic(navigation, {
    topicId: topicParams.topic,
    title: topicParams.countryName,
  });
};

export const submitVote = (
  walletAddress,
  userId,
  privateKey,
  topicParams,
  navigation,
  isSupport
) => {
  const ballot = isSupport ? 1 : 0;
  //Contract inputs need all be strings
  TinodeAPI.submitVoteBallot(topicParams.topic, walletAddress, userId, ballot).then(tx => {
    console.log('receive response tx', tx);
    TinodeAPI.getVoteInfo(topicParams.topic, walletAddress);
  });

  return resetNavigationToTopic(navigation, {
    topicId: topicParams.topic,
    title: topicParams.countryName,
  });
};
