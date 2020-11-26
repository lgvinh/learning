const {
  handlerFactory,
  Logger,
} = require('@kaercher/commonlambdahelper');

const {
  CONSTANT: { EVENT_TYPE },
  factory,
} = handlerFactory;

const { NotificationMessageManager } = require("../DAL/notificationMessageManager");

const logger = new Logger();

const getMessageConfig = {
  eventType: EVENT_TYPE.API_GATEWAY,
  validator: {
    user: {
      isUserRequired: false,
    },
  },
  transform: {
    event: {
      queryStringParameters: {
        key: 'params',
        transform: value => value,
      },
    },
  },
  response: {
    statusCode: 200,
  },
};

const getMessagesConfig = {
  eventType: EVENT_TYPE.API_GATEWAY,
  validator: {
    user: {
      isUserRequired: false,
    },
  },
  transform: {
    event: {
      queryStringParameters: {
        key: 'params',
        transform: value => value,
      },
    },
  },
  response: {
    statusCode: 200,
  },
};

const createMessageConfig = {
  eventType: EVENT_TYPE.API_GATEWAY,
  validator: {
    user: {
      isUserRequired: false,
    },
  },
  transform: {
    event: {
      body: {
        key: 'payload',
        transform: value => value,
      },
    },
  },
  response: {
    statusCode: 201,
  },
};

const updateMessageConfig = {
  eventType: EVENT_TYPE.API_GATEWAY,
  validator: {
    user: {
      isUserRequired: false,
    },
  },
  transform: {
    event: {
      body: {
        key: 'payload',
        transform: value => value,
      },
    },
  },
  response: {
    statusCode: 200,
  },
};

const deleteMessageConfig = {
  eventType: EVENT_TYPE.API_GATEWAY,
  validator: {
    user: {
      isUserRequired: false,
    },
  },
  transform: {
    event: {
      body: {
        key: 'payload',
        transform: value => value,
      },
    },
  },
  response: {
    statusCode: 204,
  },
};

// Default config for notificationMessageHandlerFactory's parameters
const handlerDefaultConfig = {
  getMessageConfig,
  getMessagesConfig,
  createMessageConfig,
  updateMessageConfig,
  deleteMessageConfig,
  tableName: process.env.TABLE_NAME || "WeatherData-v3",
};

// API layer
const notificationMessageHandlerFactory = (config = { ...handlerDefaultConfig }) => {
  const { tableName } = config;
  // Debug the config
  logger.debug("notificationMessageHandlerFactory config", config);
  // DAL
  const notificationMessageManager = new NotificationMessageManager({ tableName });

  const getMessageBusinessEntryPoint = mappedEvent => {
    const { params } = mappedEvent;
    const { messageId, language } = params || {};
    return notificationMessageManager.getNotificationMessage(messageId, language);
  };

  const getMessage = factory(getMessageConfig)({
    businessEntryPoint: getMessageBusinessEntryPoint,
    businessError: {
      actor: 'getMessage',
      message: 'error getting message',
      code: 24999,
    },
  });

  const getMessagesBusinessEntryPoint = mappedEvent => {
    const { params } = mappedEvent;
    const { nextTokens, limit } = params || {};
    return notificationMessageManager.getNotificationMessages(nextTokens, limit);
  };

  const getMessages = factory(getMessagesConfig)({
    businessEntryPoint: getMessagesBusinessEntryPoint,
    businessError: {
      actor: 'getMessages',
      message: 'error getting messages',
      code: 24999,
    },
  });

  const createMessageBusinessEntryPoint = mappedEvent => {
    const { payload } = mappedEvent;
    return notificationMessageManager.createNotificationMessage(payload);
  };

  const createMessage = factory(createMessageConfig)({
    businessEntryPoint: createMessageBusinessEntryPoint,
    businessError: {
      actor: 'createMessage',
      message: 'error creating message',
      code: 24999,
    },
  });

  const updateMessageBusinessEntryPoint = mappedEvent => {
    const { payload } = mappedEvent;
    return notificationMessageManager.updateNotificationMessage(payload);
  };

  const updateMessage = factory(updateMessageConfig)({
    businessEntryPoint: updateMessageBusinessEntryPoint,
    businessError: {
      actor: 'updateMessage',
      message: 'error updating message',
      code: 24999,
    },
  });

  const deleteMessageBusinessEntryPoint = mappedEvent => {
    const { messageId, language } = mappedEvent.payload;
    return notificationMessageManager.deleteNotificationMessage(messageId, language);
  };

  const deleteMessage = factory(deleteMessageConfig)({
    businessEntryPoint: deleteMessageBusinessEntryPoint,
    businessError: {
      actor: 'deleteMessage',
      message: 'error deleting message',
      code: 24999,
    },
  });

  return {
    getMessage,
    getMessages,
    deleteMessage,
    updateMessage,
    createMessage,
  };
};

module.exports = {
  notificationMessageHandlerFactory,
  handlerDefaultConfig,
};
