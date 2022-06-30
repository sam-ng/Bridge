const messages = [];

const addMessage = (message) => {
  messages.push(message);

  return message;
};

const getChannelMessages = (channel) => {
  messages.filter((message) => message.channel === channel);
};

module.exports = { messages, addMessage, getChannelMessages };
