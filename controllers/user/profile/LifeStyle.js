const AboutModel = require("../../../models/User/about");

const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};

const saveLifeStyleDetails = async (req, res) => {
  try {
    const { drink, smoke, diet, blood, bodytype, skintype } = req.body;
    const userId = req.user.id;
    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }
    const lifeStyleData = {
      drink,
      smoke,
      diet,
      blood,
      bodytype,
      skintype,
    };
    const existingUser = await AboutModel.findOne({ id: userId });
    if (existingUser) {
      await AboutModel.updateOne(
        { id: userId },
        { $set: { lifestyle: [lifeStyleData] } }
      );
      return handleResponse(res, 200, "Details saved successfully", true);
    } else {
      const newLifeStyleDetails = new AboutModel({
        id: userId,
        lifestyle: [lifeStyleData],
      });
      await newLifeStyleDetails.save();
      return handleResponse(res, 200, "Details saved successfully", true);
    }
  } catch (error) {
    console.error("Error saving family details:", error);
    handleResponse(res, 500, "Failed to save details", false);
  }
};

const getUserLifeStyle = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }
    const userLifeStyleDetails = await AboutModel.findOne({ id: userId });
    if (!userLifeStyleDetails) {
      return handleResponse(res, 200, "No family details found", true, []);
    }
    if (
      !Array.isArray(userLifeStyleDetails.lifestyle) ||
      userLifeStyleDetails.lifestyle.length === 0
    ) {
      return handleResponse(res, 200, "No family details found", true, []);
    }
    return handleResponse(
      res,
      200,
      "Family details fetched successfully",
      true,
      userLifeStyleDetails.lifestyle
    );
  } catch (error) {
    console.error("Error fetching family details:", error);
    handleResponse(res, 500, "Failed to fetch details", false);
  }
};

module.exports = { saveLifeStyleDetails, getUserLifeStyle };
