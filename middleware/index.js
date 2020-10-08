let express = require('express');
let auth = require('./auth');
let verify = require('./verification');
let router = express.Router();

router.post('/api/v1/register', auth.registrasi);
router.post('/api/v1/login', auth.login);
router.get('/api/v1/home', verify(), auth.homepage);

module.exports = router;