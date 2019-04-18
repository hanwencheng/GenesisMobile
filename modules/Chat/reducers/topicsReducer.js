import set from 'lodash/fp/set';
import _ from 'lodash';
import { topicsActionType } from '../actions/topicsAction';

const INITIAL_STATE = {
  topicsMap: {},
};

const getLastSeq = (messages) => {
  if(messages.length === 0)
    return 0;
  return _.last(messages).seq
}

const getFirstSeq = messages => {
  if(messages.length === 0)
    return 0;
  return _.head(messages).seq
}

const reformDate = data => {
  return _.mapValues(data, (value, key) => {
    if (key === 'created' || key === 'updated') {
      return new Date(value);
    }
    return value;
  });
};

export const topicsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case topicsActionType.UPDATE_TOPIC_MESSAGES: {
      const topicMessages = action.topicMessages;
      const oldMessages = _.get(state.topicsMap, `${action.topicName}.messages`, [])
      if(getFirstSeq(oldMessages) >= getLastSeq(topicMessages))
        return state;
      const topicsMap = set(`${action.topicName}.messages`, topicMessages, state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    //first fetch function to be called in the app
    case topicsActionType.UPDATE_TOPIC_META: {
      const initTopicData = { userInput: '', messages: [] };
      const newTopicData = _.merge(
        { topic: action.topicName },
        _.get(state.topicsMap, action.topicName, initTopicData),
        action.topicData
      );
      const topicsMap = set(action.topicName, newTopicData, state.topicsMap);

      console.log('topics map is', topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    case topicsActionType.UPDATE_TOPIC: {
      const newData = _.merge(_.get(state.topicsMap, action.topicId, {}), action.data);
      return {
        ...state,
        topicsMap: set(action.topicsMap, reformDate(newData), state.topicsMap),
      };
    }
    case topicsActionType.UPDATE_TOPIC_SUBS: {
      const topicsMap = set(`${action.topicName}.subs`, action.topicSubs, state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    case topicsActionType.UPDATE_TOPIC_USER_INPUT: {
      const topicsMap = set(`${action.topicName}.userInput`, action.userInput, state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    default:
      return state;
  }
};
