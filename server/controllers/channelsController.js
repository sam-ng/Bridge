const mongoose = require('mongoose');
const Channel = require('../models/channel');

const getChannels = async (req, res) => {
  const channels = await Channel.find().exec();
  return res.status(200).json({ channels });
};

const getChannelMessages = async (req, res) => {
  const { channelId } = req.params;
  const channel = await Channel.findById(channelId)
    .populate({
      path: 'messages',
      populate: { path: 'user', select: 'username' },
    })
    .exec();
  return res.status(200).json({ messages: channel.messages });
};

// TODO: DELETE - For testing purposes only
const initializeChannels = () => {
  Channel.create([
    {
      name: 'General',
      users: [],
      messages: [
        {
          content: 'Hello World',
          user: mongoose.Types.ObjectId('630ed7be14c08c76e3183baa'),
        },
        {
          content: 'Hello World as well',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'paoijfepoaijf oie fpaief pafe',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'Hello World',
          user: mongoose.Types.ObjectId('630ed7be14c08c76e3183baa'),
        },
        {
          content: 'Hello World as well',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'paoijfepoaijf oie fpaief pafe',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'Hello World',
          user: mongoose.Types.ObjectId('630ed7be14c08c76e3183baa'),
        },
        {
          content: 'Hello World as well',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'paoijfepoaijf oie fpaief pafe',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'Hello World',
          user: mongoose.Types.ObjectId('630ed7be14c08c76e3183baa'),
        },
        {
          content: 'Hello World as well',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'paoijfepoaijf oie fpaief pafe',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'paoijfepoaijf oie fpaief pafe',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'paoijfepoaijf oie fpaief pafe',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'paoijfepoaijf oie fpaief pafe',
          user: mongoose.Types.ObjectId('630ed7cb14c08c76e3183bad'),
        },
        {
          content: 'omg is the server working',
          user: mongoose.Types.ObjectId('630ed7be14c08c76e3183baa'),
        },
      ],
    },
    { name: 'Channel 1', users: [], messages: [] },
    { name: 'Channel 2', users: [], messages: [] },
  ]);
};

module.exports = { getChannels, getChannelMessages, initializeChannels };
