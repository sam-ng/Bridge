const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: { type: String, required: [true, 'No channel name provided.'] },
  users: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  messages: [
    { content: { type: String } },
    { user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' } },
  ],
});

module.exports = mongoose.model('Channel', channelSchema);
