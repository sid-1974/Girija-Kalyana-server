const AboutModel = require("../../../models/User/about");


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

   
    const existingAbout = await AboutModel.findOne({ id: userId });

    if (existingAbout) {
      
      await AboutModel.updateOne({ id: userId }, { $set: aboutData });
      return handleResponse(res, 200, "Details updated successfully", true);
    } else {
   
      const newAbout = new AboutModel({ id: userId, ...aboutData });
      await newAbout.save();
      return handleResponse(res, 200, "Details saved successfully", true);
    }
  } catch (error) {
    console.error("Error saving about details:", error);
    handleResponse(res, 500, "Failed to save details", false);
  }
};



const getUserAbout = async (req, res) => {
  try {
    const userId = req.user.id; 

    let userAboutDetails = await AboutModel.findOne({ id: userId });

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
     
    }

    return res.status(200).json({ success: true, data: userAboutDetails });
  } catch (error) {
    
    handleResponse(res, 500, "Failed to fetch details", false);
  }
};

module.exports = { saveAboutDetails, getUserAbout };
