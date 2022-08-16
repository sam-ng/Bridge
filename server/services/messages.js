const messages = [];

const addMessage = (message) => {
  messages.push(message);

  return message;
};

module.exports = { messages, addMessage };
