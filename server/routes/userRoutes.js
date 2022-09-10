const { Router } = require('express');
const { addMacro, deleteMacro } = require('../controllers/userController');

const router = Router();

router.post('/macro/add', addMacro);
router.post('/macro/delete', deleteMacro);

module.exports = router;
