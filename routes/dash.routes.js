const express = require('express');

const router = express.Router();
const { dashAdmin, dashUser } = require('../controllers/dash.controller');

const { auth, user, admin } = require('../middlewares/auth.middleware');

router.get('/user', user, auth, dashUser);
router.get('/admin', admin, auth, dashAdmin);

module.exports = router;
