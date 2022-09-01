const { Router } = require('express');
const {
  getChannels,
  getChannelMessages,
  initializeChannels,
} = require('../controllers/channelsController');

const router = Router();

router.get('/', getChannels);

router.get('/:channelId/messages', getChannelMessages);

// TODO: DELETE - For testing purposes only
router.get('/initialize', (req, res) => {
  initializeChannels();
  return res.sendStatus(200);
});

module.exports = router;
