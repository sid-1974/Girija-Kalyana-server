const AboutModel = require("../../../models/User/about");

const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};

const saveOtherDetails = async (req, res) => {
  try {
    const { bio } = req.body;
    const userId = req.user.id;
    if (!userId) {
        return handleResponse(res, 400, "User ID is required", false);
      }
 const othersData = {bio}
 const existingUser = await AboutModel.findOne({ id: userId });
 if (existingUser) {
    await AboutModel.updateOne(
      { id: userId },
      { $set: { others: [othersData] } }
    );
    return handleResponse(res, 200, "Details saved successfully", true);
  } else {
    const newOtherDetails = new AboutModel({
      id: userId,
      others: [othersData],
    });

    await newOtherDetails.save();
    return handleResponse(res, 200, "Details saved successfully", true);
  }
  } catch (error) {
    console.error("Error saving other details:", error);
    handleResponse(res, 500, "Failed to save details", false);
  }
};

const getUserOtherinfo = async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (!userId) {
        return handleResponse(res, 400, "User ID is required", false);
      }
  
      const userOtherDetails = await AboutModel.findOne({ id: userId });
  
      if (!userOtherDetails) {
        return handleResponse(res, 200, "No other details found", true, []);
      }
  
      if (
        !Array.isArray(userOtherDetails.others) ||
        userOtherDetails.others.length === 0
      ) {
        return handleResponse(res, 200, "No family details found", true, []);
      }
  
      return handleResponse(
        res,
        200,
        "other details fetched successfully",
        true,
        userOtherDetails.others
      );
    } catch (error) {
      console.error("Error fetching other details:", error);
      handleResponse(res, 500, "Failed to fetch details", false);
    }
  };

  module.exports = {saveOtherDetails,getUserOtherinfo}
