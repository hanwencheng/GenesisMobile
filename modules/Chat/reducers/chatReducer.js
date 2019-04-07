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
  },
  rawPublicData: {},
  subscribedChatId: null,
};

const reformDate = data => {
  return _.mapValues(data, (value, key) => {
    if(key === 'created' || key === 'updated') {
      return new Date(value);
    }
    return value;
  })
}

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
      const oldSeq = _.get(state.chatMap, `${topicId}.seq`, -1);
      const currentSeq = _.get(action.data, 'seq', -1);
      if (currentSeq < oldSeq) {
        return state;
      } else {
        action.data.isSubscribed = currentSeq > -1;
        return {
          ...state,
          chatMap: set(topicId, action.data, state.chatMap),
        };
      }
    }
    case chatActionType.UPDATE_CHAT_DESC: {
      const newData = _.merge(
        _.get(state.chatMap, action.topicId, {}),
        action.data
      )
      return {
        ...state,
        chatMap: set(action.topicId, reformDate(newData), state.chatMap)
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
      let newChatMap = state.chatMap
      // ignore if it is new chat and light subscribe
      if (action.chatId && state.chatMap.hasOwnProperty(action.chatId)) {
        newChatMap = set(`${action.chatId}.isSubscribed`, true, state.chatMap)
      }
      return {
        ...state,
        chatMap: newChatMap,
        subscribedChatId: action.chatId,
      };
    }
    case chatActionType.UNSUBSCRIBE_CHAT:
      return {
        ...state,
        chatMap: set(
          action.chatId,
          {
            isSubscribed: false,
            seq: -1,
          },
          state.chatMap
        ),
      };
    
    default:
      return state;
  }
};
