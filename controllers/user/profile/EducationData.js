const AboutModel = require("../../../models/User/about");

const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};

const saveEducationDetails = async (req, res) => {
  try {
    const { qualification, occupation, incomeperannum, occupationcountry } =
      req.body;
    const userId = req.user.id;

    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const EducationData = {
      qualification,
      occupation,
      incomeperannum,
      occupationcountry,
    };
    const existingUser = await AboutModel.findOne({ id: userId });
    if (existingUser) {
      await AboutModel.updateOne(
        { id: userId },
        { $set: { education: [EducationData] } }
      );
      return handleResponse(res, 200, "Details saved successfully", true);
    } else {
      const newEducationDetails = new AboutModel({
        id: userId,
        education: [EducationData],
      });
      await newEducationDetails.save();
      return handleResponse(res, 200, "Details saved successfully", true);
    }
  } catch (error) {
    console.error("Error saving family details:", error);
    handleResponse(res, 500, "Failed to save details", false);
  }
};

const getUserEducation = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const userEducationDetails = await AboutModel.findOne({ id: userId });
    if (!userEducationDetails) {
      return handleResponse(res, 200, "No educational details found", true, []);
    }
    if (
      !Array.isArray(userEducationDetails.education) ||
      userEducationDetails.education.length === 0
    ) {
      return handleResponse(res, 200, "No Education details found", true, []);
    }
    return handleResponse(
      res,
      200,
      "Education details fetched successfully",
      true,
      userEducationDetails.education
    );
  } catch (error) {
    console.error("Error fetching education details:", error);
    handleResponse(res, 500, "Failed to fetch details", false);
  }
};

module.exports = { saveEducationDetails, getUserEducation };
