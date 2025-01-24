const AboutModel = require("../../../models/User/about");

const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};

const savePreferenceDetails = async (req, res) => {
  try {
    const {
      castepreference,
      agepreferencefrom,
      heightpreferencefrom,
      occupationcountrypreference,
      educationpreference,
      agepreferenceto,
      heightpreferenceto,
      maritalStatuspreference,
    } = req.body;
    const userId = req.user.id;
    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }
    const PreferenceData = {
      castepreference,
      agepreferencefrom,
      heightpreferencefrom,
      occupationcountrypreference,
      educationpreference,
      agepreferenceto,
      heightpreferenceto,
      maritalStatuspreference,
    };
    const existingUser = await AboutModel.findOne({ id: userId });

    if (existingUser) {
      await AboutModel.updateOne(
        { id: userId },
        { $set: { preference: [PreferenceData] } }
      );
      return handleResponse(res, 200, "Details saved successfully", true);
    } else {
      const newPreferenceDetails = new AboutModel({
        id: userId,
        preference: [PreferenceData],
      });

      await newPreferenceDetails.save();
      return handleResponse(res, 200, "Details saved successfully", true);
    }
  } catch (error) {
    console.error("Error saving preference details:", error);
    handleResponse(res, 500, "Failed to save details", false);
  }
};

const getUserPreference = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const userPreferenceDetails = await AboutModel.findOne({ id: userId });

    if (!userPreferenceDetails) {
      return handleResponse(res, 200, "No preference details found", true, []);
    }

    if (
      !Array.isArray(userPreferenceDetails.preference) ||
      userPreferenceDetails.preference.length === 0
    ) {
      return handleResponse(res, 200, "No preference details found", true, []);
    }

    return handleResponse(
      res,
      200,
      "Preference details fetched successfully",
      true,
      userPreferenceDetails.preference
    );
  } catch (error) {
    console.error("Error fetching preference details:", error);
    handleResponse(res, 500, "Failed to fetch details", false);
  }
};

module.exports = { savePreferenceDetails, getUserPreference };
