const AboutModel = require("../../models/profile/about");

const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};

const saveFamilyDetails = async (req, res) => {
  try {
    const {
      father,
      mother,
      sibling1,
      sibling2,
      religion,
      caste,
      subcaste,
      nakshatra,
      rashi,
      gotra,
    } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const familyData = {
      father,
      mother,
      sibling1,
      sibling2,
      religion,
      caste,
      subcaste,
      nakshatra,
      rashi,
      gotra,
    };

   
    const existingUser = await AboutModel.findOne({ id: userId });

    if (existingUser) {
     
      existingUser.family = [familyData];
      await existingUser.save();
      return handleResponse(res, 200, "Details updated successfully", true, existingUser);
    } else {
      
      const newFamilyDetails = new AboutModel({
        id: userId,
        family: [familyData],
      });
      await newFamilyDetails.save();
      return handleResponse(res, 200, "Details saved successfully", true, newFamilyDetails);
    }
  } catch (error) {
    console.error("Error saving family details:", error);
    handleResponse(res, 500, "Failed to save details", false);
  }
};

const getUserFamily = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const userFamilyDetails = await AboutModel.findOne({ id: userId });

    if (!userFamilyDetails) {
    
      return handleResponse(res, 200, "No family details found", true, []);
    }

    if (!Array.isArray(userFamilyDetails.family) || userFamilyDetails.family.length === 0) {
     
      return handleResponse(res, 200, "No family details found", true, []);
    }

    return handleResponse(res, 200, "Family details fetched successfully", true, userFamilyDetails.family);
  } catch (error) {
    console.error("Error fetching family details:", error);
    handleResponse(res, 500, "Failed to fetch details", false);
  }
};

module.exports = { saveFamilyDetails, getUserFamily };
