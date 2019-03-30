import TinodeAPI from '../modules/Chat/TinodeAPI';
import { contractInfo } from '../config';

export const countryProps = ['lastmsg', 'countrydesc'];

export const contractProps = [
  'VoteName',
  'conaddr',
  'entrycost',
  'exitcost',
  'tax',
  'voteduration',
  'votepassrate',
];

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

export const createGroup = (walletAddress, userId) => {
  return TinodeAPI.initTransaction(null, {
    type: 'depcon',
    pubaddr: walletAddress,
    chainid: 3,
    signedtx: '',
    conaddr: '',
    user: userId,
    fn: 'constructor',
    inputs: ['kingdom', 'this is a new country', '100', '200'],
  });
};
