const {saveAboutDetails,getUserAbout} = require("../controllers/user/profile/AboutData");
const { saveEducationDetails, getUserEducation } = require("../controllers/user/profile/EducationData");
const {saveFamilyDetails, getUserFamily} = require('../controllers/user/profile/FamilyData');
const { saveLifeStyleDetails, getUserLifeStyle } = require("../controllers/user/profile/LifeStyle");
const { saveOtherDetails, getUserOtherinfo } = require("../controllers/user/profile/Others");
const { savePhotoDetails, getUserPhoto, deletePhoto } = require("../controllers/user/profile/Photo");
const { savePreferenceDetails, getUserPreference } = require("../controllers/user/profile/Preference");
const router = require("express").Router();
const ensureAuthenticated = require('../Middlewares/auth')


router.post("/user-about",ensureAuthenticated , saveAboutDetails);
router.get("/user-about-details",ensureAuthenticated , getUserAbout);
router.post("/user-family",ensureAuthenticated , saveFamilyDetails);
router.get("/user-family-details",ensureAuthenticated , getUserFamily);
router.post("/user-education",ensureAuthenticated , saveEducationDetails);
router.get("/user-education-details",ensureAuthenticated , getUserEducation);
router.post("/user-lifestyle",ensureAuthenticated , saveLifeStyleDetails);
router.get("/user-lifestyle-details",ensureAuthenticated , getUserLifeStyle);
router.post("/user-preference",ensureAuthenticated , savePreferenceDetails);
router.get("/user-preference-details",ensureAuthenticated , getUserPreference);
router.post("/user-other",ensureAuthenticated , saveOtherDetails);
router.get("/user-other-details",ensureAuthenticated , getUserOtherinfo);
router.post("/user-image",ensureAuthenticated , savePhotoDetails);
router.get("/user-image-details",ensureAuthenticated , getUserPhoto);
router.delete("/user-delete-image",ensureAuthenticated , deletePhoto);

module.exports = router;
