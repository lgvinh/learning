const { notificationMessageHandlerFactory } = require('./notificationMessageHandler');

const {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
  updateMessage,
} = notificationMessageHandlerFactory();

module.exports.getMessages = getMessages;

module.exports.createMessage = createMessage;

module.exports.getMessage = getMessage;

module.exports.deleteMessage = deleteMessage;

module.exports.updateMessage = updateMessage;
