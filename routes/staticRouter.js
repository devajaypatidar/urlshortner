const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    return res.render("home");
})


router.get('/signup', function (req, res) {
    return res.render("signup");
});

router.get('/login', function (req, res) {
    return res.render("login");
})
module.exports =router;