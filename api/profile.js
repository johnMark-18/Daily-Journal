const express = require("express");
const router = express.Router();
const authMiddleware=require("./middleware");

const contactContent = "contact no:9876543210";

router.get('/',authMiddleware, function (req, res) {
    res.render('contact', { cContent: contactContent });
})

module.exports = router;