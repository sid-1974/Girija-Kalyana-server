const AboutModel = require("../../models/profile/about");


const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};


const saveAboutDetails = async (req, res) => {
  try {
    const { age, address, pincode, city, state, country, dateOfBirth, height, gender, language, maritalStatus } = req.body;
    const userId = req.user.id; 

    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const aboutData = {
      age,
      address,
      pincode,
      city,
      state,
      country,
      dateOfBirth,
      height,
      gender,
      language,
      maritalStatus,
    };

    const existingAbout = await AboutModel.findOneAndUpdate(
      { id: userId }, 
      aboutData,
      { new: true, upsert: true } 
    );

    const message = existingAbout ? "Details updated successfully" : "Details saved successfully";
    return handleResponse(res, 200, message, true, existingAbout);
  } catch (error) {
    console.error("Error saving about details:", error);
    handleResponse(res, 500, "Failed to save details", false);
  }
};


const getUserAbout = async (req, res) => {
  try {
    const userId = req.user.id; 

    const userAboutDetails = await AboutModel.findOne({ id: userId });

    if (!userAboutDetails) {
      userAboutDetails = {
        age: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        dateOfBirth: "",
        height: "",
        gender: "",
        language: "",
        maritalStatus: "",
      };
      return res.status(404).json({ success: false, message: "No user details found" });
    }

    return res.status(200).json({ success: true, data: userAboutDetails });
  } catch (error) {
    console.error("Error fetching about details:", error);
    handleResponse(res, 500, "Failed to fetch details", false);
  }
};

module.exports = { saveAboutDetails, getUserAbout };
