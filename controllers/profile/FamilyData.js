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
    const familyData = [
      {
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
      },
    ];

    const existingFamily = await AboutModel.findOneAndUpdate(
      { id: userId },
      { $set: { "family.0": familyData } },
      { new: true, upsert: true }
    );
    const message = existingFamily
      ? "Details updated successfully"
      : "Details saved successfully";
    return handleResponse(res, 200, message, true, existingFamily);
  } catch (error) {
    console.error("Error saving about details:", error);
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
  
      if (!userFamilyDetails || !userFamilyDetails.family.length) {
        return handleResponse(res, 404, "No family details found", false);
      }
  
      return handleResponse(res, 200, "Family details fetched successfully", true, userFamilyDetails.family);
    } catch (error) {
      console.error("Error fetching family details:", error);
      handleResponse(res, 500, "Failed to fetch details", false);
    }
  };
  

module.exports = { saveFamilyDetails,getUserFamily };
