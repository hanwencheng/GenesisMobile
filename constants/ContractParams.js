import _ from 'lodash';

export const VoteTypes = {
  NEW: 'new',
  VOTE: 'vote',
  STATUS: 'status',
  PARAMS: 'param',
};

export const VoteParams = {
  WALLET_ADDRESS: 'pubaddr',
  NEW_VOTE: 'newvote',
  BALLOT: 'ballot',
  USER: 'user',
};

export const confirmStatus = {
  UNKNOWN: 'unknown',
  SENT: 'sent',
  OK: 'ok',
  NOK: 'nok',
};

export const ConstructorParams = {
  CONTRACT_ADDRESS: 'conaddr',
  COUNTRY_NAME: 'countryname',
  COUNTRY_DESC: 'countrydesc',
  ENTRY_CONST: 'entrycost',
  TAX: 'tax',
  PROGRAM_URL: 'programurl',
  PROGRAM_ADDRESS: 'programaddr',
  VOTE_PASS_RATE: 'votepassrate',
  VOTE_DURATION: 'voteduration',
};

export const ContractFnMap = {
  countrydesc: {
    name: 'setDescription',
    value: v => [v],
    isContract: true,
  },
  requiredApproved: {
    name: 'setVotePassrate',
    value: v => [v.toString()],
    isContract: false,
  },
  requiredHour: {
    name: 'setVoteDuration',
    value: v => [(v * 3600).toString()],
    isContract: false,
  },
  entryCost: {
    name: 'setCost',
    value: v => [v.toString(), '100'],
    isContract: true,
  },
  kickOut: {
    name: 'kickOut',
    value: v => [v],
    isContract: true,
  },
};
