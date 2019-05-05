/** Here store the raw data of user. **/
import _ from 'lodash';
import set from 'lodash/fp/set';
import { chatActionType } from '../actions/chatAction';

const INITIAL_STATE = {
  connected: false,
  chatMap: {},
  userId: '',
  userInfo: {
    name: '',
    avatar: '',
    bindWallet: '',
  },
  rawPublicData: {},
  subscribedChatId: null,
};

export const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chatActionType.LOGIN: {
      return state;
    }
    case chatActionType.CONNECTED:
      return {
        ...state,
        connected: true,
      };
    case chatActionType.UPDATE_CHAT_MAP: {
      const topicId = action.data.topic || action.data.name;
      const oldSeq = _.get(state.chatMap, `${topicId}.seq`, -2);
      const currentSeq = _.get(action.data, 'seq', -2);
      if (currentSeq < oldSeq) {
        return state;
      } else {
        action.data.isSubscribed = currentSeq > -2;
        return {
          ...state,
          chatMap: set(topicId, action.data, state.chatMap),
        };
      }
    }
    case chatActionType.SET_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case chatActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
        rawPublicData: action.rawPublicData,
      };
    case chatActionType.SUBSCRIBE_CHAT: {
      let newChatMap = state.chatMap;
      // ignore if it is new chat and light subscribe
      if (action.chatId && state.chatMap.hasOwnProperty(action.chatId)) {
        const newTopic = _.assign({}, state.chatMap[action.chatId], {
          isSubscribed: true,
          seq: 0, //TODO do not use seq to indicate subscribed status.
        });
        newChatMap = set(action.chatId, newTopic, state.chatMap);
      }
      return {
        ...state,
        chatMap: newChatMap,
        subscribedChatId: action.chatId,
      };
    }
    case chatActionType.UNSUBSCRIBE_CHAT:
      let newChatMap = state.chatMap;
      if (action.chatId && state.chatMap.hasOwnProperty(action.chatId)) {
        const newTopic = _.assign({}, state.chatMap[action.chatId], {
          isSubscribed: false,
          seq: -1,
        });
        newChatMap = set(action.chatId, newTopic, state.chatMap);
      }
      return {
        ...state,
        chatMap: newChatMap,
        subscribedChatId: null,
      };
    case chatActionType.CLEAR_CHAT_MAP:
      return {
        ...INITIAL_STATE,
      };
    case chatActionType.BIND_WALLET: {
      const newUserInfo = _.merge({}, state.userInfo, { bindAddress: action.walletAddress });
      return {
        ...state,
        userInfo:  newUserInfo,
      }
    }
    default:
      return state;
  }
};
