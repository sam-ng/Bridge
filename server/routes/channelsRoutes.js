const { Router } = require('express');
const {
  initializeChannels,
  getChannels,
} = require('../controllers/channelsController');

const router = Router();

router.get('/', getChannels);

router.get('/:channelId/messages', (req, res) => {
  const { channelId } = req.params;
  const messages = getChannelMessages(channelId);
  console.log(messages);

  return res.json({ messages });
});

// TODO: DELETE - For testing purposes only
router.get('/initialize', (req, res) => {
  initializeChannels();
  return res.sendStatus(200);
});

module.exports = router;
