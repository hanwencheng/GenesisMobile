export const transactionActionType = {
  START: 'TRANSACTION_START',
  INIT: 'TRANSACTION_INIT',
  SIGN: 'TRANSACTION_SIGN',
  SEND_SIGNED: 'TRANSACTION_SEND',
  RECEIVE: 'TRANSACTION_RECEIPT',
  CONFIRM: 'TRANSACTION_CONFIRM',
};

export const transactionAction = {
  init: () => ({ type: transactionActionType.INIT }),
  sign: () => ({ type: transactionActionType.SIGN }),
  sendSigned: () => ({ type: transactionActionType.SEND_SIGNED }),
  receive: () => ({ type: transactionActionType.RECEIVE }),
  confirm: () => ({ type: transactionActionType.CONFIRM }),
};
