const { Router } = require('express');
const { signup } = require('../controllers/authController');

const router = Router();

router.post('/signup', signup);
router.post('login');

module.exports = router;
