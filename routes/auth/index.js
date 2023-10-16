const router = require('express').Router();

const Usercontoller  = require('../../controller/auth');

router.get('/discord/redirect',Usercontoller.getUser)


module.exports =router