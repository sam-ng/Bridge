const messages = [
  { content: 'Hello World', user: 'user1' },
  { content: 'Hello World as well', user: 'user2' },
  { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  { content: 'Hello World', user: 'user1' },
  { content: 'Hello World as well', user: 'user2' },
  { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  { content: 'Hello World', user: 'user1' },
  { content: 'Hello World as well', user: 'user2' },
  { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  { content: 'Hello World', user: 'user1' },
  { content: 'Hello World as well', user: 'user2' },
  { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  { content: 'omg is the server working', user: 'user1' },
];

const addMessage = (message) => {
  messages.push(message);

  return message;
};

module.exports = { messages, addMessage };
