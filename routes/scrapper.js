const express = require("express");
const router = express.Router();
const { ScrapTextData } = require("../controllers/scrapper.js");

router.get("/scrape", ScrapTextData);

module.exports = router;
