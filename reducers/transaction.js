import { transactionActionType } from '../actions/transactionAction';

const TX_STATUS = {
  UNDEFINED: 0,
  STARTED: 1,
  INITIATED: 2,
  SIGNED: 3,
  SIGNED_SENT: 4,
  RECEIVED: 5,
  CONFIRMED: 6,

  transactionId: 0,
};

const INIT_STATE = {
  status: TX_STATUS.UNDEFINED,
};

export const transactionReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case transactionActionType.START:
      return { ...state, status: TX_STATUS.STARTED };
    case transactionActionType.INIT:
      return { ...state, status: TX_STATUS.INITIATED };
    case transactionActionType.SIGN:
      return { ...state, status: TX_STATUS.SIGNED };
    case transactionActionType.SEND_SIGNED:
      return { ...state, status: TX_STATUS.SIGNED_SENT };
    case transactionActionType.RECEIVE:
      return { ...state, status: TX_STATUS.RECEIVED };
    case transactionActionType.CONFIRM:
      return { ...state, status: TX_STATUS.CONFIRMED };
    default:
      return state;
  }
};
