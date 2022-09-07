const { Router } = require('express');

const loginLimiter = require('../middleware/loginLimiter');
const {
  signup,
  login,
  logout,
  refreshToken,
} = require('../controllers/authController');

const router = Router();

router.post('/signup', signup);
router.post('/login', loginLimiter, login);
router.get('/logout', logout);
router.get('/refresh', refreshToken);

module.exports = router;
