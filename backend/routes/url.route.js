const express = require("express");
const { customURLCreator, fetchUrl } = require("../controllers/url.control");
const router = express.Router();

router.post("/createUrl", customURLCreator);
router.get("/getUrl", fetchUrl);

module.exports = router;
