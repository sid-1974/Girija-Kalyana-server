const AboutModel = require("../../models/User/about");
const UserModel = require("../../models/User").UserModel;

const handleResponse = (res, status, message, success, data = null) => {
  res.status(status).json({ message, success, data });
};

const saveAllUserDetails = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    if (!currentUserId) {
      return handleResponse(res, 400, "User ID is required", false);
    }

    const allUsers = await AboutModel.aggregate([
      {
        $match: { id: { $ne: currentUserId } },
      },
      {
        $lookup: {
          from: "users",
          localField: "id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          "userDetails.fullName": 1,
          "userDetails.email": 1,
          "userDetails.phoneNumber": 1,
          "userDetails.userId": 1,

          id: 1,
          age: 1,
          address: 1,
          pincode: 1,
          city: 1,
          state: 1,
          country: 1,
          dateOfBirth: 1,
          height: 1,
          gender: 1,
          language: 1,
          maritalStatus: 1,
          family: 1,
          education: 1,
          photo: 1,
          lifestyle: 1,
          preference: 1,
          others: 1,
        },
      },
    ]);

    if (!allUsers || allUsers.length === 0) {
      return handleResponse(res, 404, "No users found", false);
    }

    return handleResponse(
      res,
      200,
      "All user details fetched successfully",
      true,
      allUsers
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Failed to fetch user details" });
  }
};

module.exports = saveAllUserDetails;
