const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: { type: String, required: [true, 'No channel name provided.'] },
  users: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  messages: [
    {
      content: { type: String, required: [true, 'Empty message.'] },
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'No user for this message.'],
      },
    },
  ],
});

module.exports = mongoose.model('Channel', channelSchema);
