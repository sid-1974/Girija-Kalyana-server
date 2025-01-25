const AboutModel = require("../../../models/User/about");

const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};

const savePhotoDetails = async (req, res) => {
  try {
    const { image } = req.body;
    const userId = req.user.id;
    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }
    const photoData = { image };
    const existingUser = await AboutModel.findOne({ id: userId });
    if (existingUser) {
      await AboutModel.updateOne(
        { id: userId },
        { $set: { photo: [photoData] } }
      );
      return handleResponse(res, 200, "Image Uploaded successfully", true);
    } else {
      const newPhotoDetails = new AboutModel({
        id: userId,
        photo: [photoData],
      });

      await newPhotoDetails.save();
      return handleResponse(res, 200, "Image saved successfully", true);
    }
  } catch (error) {
    console.error("Error saving image :", error);
    handleResponse(res, 500, "Failed to save image", false);
  }
};

const getUserPhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const userPhotoDetails = await AboutModel.findOne({ id: userId });

    if (!userPhotoDetails) {
      return handleResponse(res, 200, "No image found", true, []);
    }

    if (
      !Array.isArray(userPhotoDetails.photo) ||
      userPhotoDetails.photo.length === 0
    ) {
      return handleResponse(res, 200, "No image details found", true, []);
    }

    return handleResponse(
      res,
      200,
      "image fetched successfully",
      true,
      userPhotoDetails.photo
    );
  } catch (error) {
    console.error("Error fetching image:", error);
    handleResponse(res, 500, "Failed to fetch image", false);
  }
};

const deletePhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return handleResponse(res, 400, "User ID is required", false);
    }
    const userimageDetails = await AboutModel.findOne({ id: userId });
    if (!userimageDetails || !userimageDetails.photo) {
        return handleResponse(res, 404, "No image found to delete", false);
      }
      userimageDetails.photo = null;
    await userimageDetails.save();
    return handleResponse(res, 200, "Image deleted successfully", true);
  } catch (error) {
    console.error("Error deleting image:", error);
    handleResponse(res, 500, "Failed to delete image", false);
  }
};

module.exports = {savePhotoDetails,getUserPhoto,deletePhoto}