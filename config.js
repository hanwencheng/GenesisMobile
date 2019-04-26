export const environment = {
  disableQRScan: false,
  disableVoteDuration: false,
  mockDurationSecond: 20,
};

const baseValue = 100000000000000;

export const contractInfo = {
  address: '0xa74ae2d3a4c3f6d9454634fee91dc7aab6724cf9',
  testAddress: '0xD4ad64EC942bA176c1f55BE98cfBec69C898De17',
  joinDefaultValue: baseValue * 5,
  createDefaultValue: baseValue * 10,
  leaveDefaultValue: 0,
  voteDefaultValue: baseValue,
  ethBaseValue: baseValue * 10000,
  kickOutDefaultValue: baseValue,
};

export const countryProps = ['lastmsg', 'countrydesc'];

export const contractProps = [
  'VoteName',
  'conaddr',
  'entrycost',
  'tax',
  'voteduration',
  'votepassrate',
];

export const aboutInfo = {
  appName: 'Genesis Space Mobile',
  date: '2019-02-10',
  designer: ['历', 'Alex'],
  developer: ['heawen110', '傻米', 'handez', 'lambdari', 'moehringen', 'cuiny', 'ranger-woo'],
  contact: ['Thegenesisspace@gmail.com'],
  todo: 'Coming soon',
};

export const wsInfo = {
  appName: 'TinodeWeb/0.15.11-rc2',
  serverAddress: 'dusai.de:6060',
  // serverAddress: 'api.tinode.co',
  apiKey: 'AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K',
  isHttps: false,
  // Network transport to use, either `ws`/`wss` for websocket or `lp` for long polling.
  transport: null,
  // one of 'web'/'ios'/'android'
  platform: 'web',
};

export const voteInfo = {
  rulesDescription: '(Join/Quit/Tax/Vote/Status)',
};

export const ethereumConfig = {
  network: 'ropsten',
};

export const imageConfig = {
  /** Maximum in-band (included directly into the message) attachment size which fits into
   * a message of 256K in size, assuming base64 encoding and 1024 bytes of overhead.
   * This is size of an object *before* base64 encoding is applied.
   * Increase this limit to a greater value in production, if desired. Also increase
   * max_message_size in server config.
   * MAX_INBAND_ATTACHMENT_SIZE = base64DecodedLen(max_message_size - overhead);**/
  MAX_INBAND_ATTACHMENT_SIZE: 195840,
  /** Maximum allowed linear dimension of an inline image in pixels. You may want
   * to adjust it to 1600 or 2400 for production.**/
  MAX_IMAGE_DIM: 768,

  MAX_PHOTO_SIZE: 4194304,
};

export const groupMetaRules = {
  VOTE_COST: 'voteCost',
  REQUIRED_APPROVED: 'requiredApproved',
  REQUIRED_HOUR: 'requiredHour',
  COUNTRY_NAME: 'countryName',
  DESCRIPTION: 'countrydesc',
  MEMBER_RULES: 'memberRules',
  PROFILE: 'profile',
};

export const chatConfig = {
  messagePerPage: 10,
  online_now: {
    id: 'online_now',
    defaultMessage: 'online now',
    description: 'Indicator that the user or topic is currently online',
  },
  last_seen: {
    id: 'last_seen_timestamp',
    defaultMessage: 'Last seen',
    description: 'Label for the timestamp of when the user or topic was last online',
  },
  not_found: {
    id: 'title_not_found',
    defaultMessage: 'Not found',
    description: 'Title shown when topic is not found',
  },
};
