import _ from 'lodash';
import { voteActionType } from '../voteAction';

export const INIT_VALUE = {
  origin: {
    // Information extracted from topic
    countryName: 'New Country',
    countrydesc: 'A brand new country.',
    profile: {},

    // Information related to smart contract
    economicRule: 'Standard plan',
    treasury: '1000',
    requiredApproved: 50,
    requiredHour: 168,
    groupWebsitePrefix: 'Https://www.bacaoke.com/',
    entryCost: 100,
    tax: 50,
    voteCost: 1000,
    votepassrate: 50,
    voteduration: 60,
    seq: 1,
    memberRules: {
      default: [150, 150, 10, 1, 1],
    },
  },
  cached: {},
  currentNewVote: {},
};

export const voteReducer = (state = INIT_VALUE, action) => {
  switch (action.type) {
    case voteActionType.INIT: {
      const initData = action.data || INIT_VALUE.origin;
      return {
        ...state,
        origin: initData,
        cached: initData,
        currentNewVote: {},
      };
    }
    case voteActionType.SET: {
      return {
        ...state,
        cached: _.merge({}, state.cached, action.data),
        currentNewVote: {
          name: Object.keys(action.data)[0],
          value: Object.values(action.data)[0],
        },
      };
    }
    case voteActionType.RESET: {
      return {
        ...state,
        cached: state.origin,
        currentNewVote: {},
      };
    }
    case voteActionType.SUBMITED: {
      return {
        ...state,
        origin: state.cached,
        currentNewVote: {},
      };
    }
    default:
      return state;
  }
};
