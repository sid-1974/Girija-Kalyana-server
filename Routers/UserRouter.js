const {saveAboutDetails,getUserAbout} = require("../controllers/profile/AboutData");
const {saveFamilyDetails, getUserFamily} = require('../controllers/profile/FamilyData')
const router = require("express").Router();
const ensureAuthenticated = require('../Middlewares/auth')


router.post("/user-about",ensureAuthenticated , saveAboutDetails);
router.get("/user-about-details",ensureAuthenticated , getUserAbout);
router.post("/user-family",ensureAuthenticated , saveFamilyDetails);
router.get("/user-family-details",ensureAuthenticated , getUserFamily);

module.exports = router;