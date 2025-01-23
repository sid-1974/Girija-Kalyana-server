const {saveAboutDetails,getUserAbout} = require("../controllers/profile/AboutData");
const router = require("express").Router();
const ensureAuthenticated = require('../Middlewares/auth')


router.post("/user-about",ensureAuthenticated , saveAboutDetails);
router.get("/user-about-details",ensureAuthenticated , getUserAbout);

module.exports = router;