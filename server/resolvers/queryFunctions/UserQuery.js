const User = require("../../models/User");

exports.Users = async () => {
  try {
    const users = User.find().populate("postIds");
    if (!users) {
      console.log("user not found");
    }
    return users;
  } catch (err) {
    throw err;
  }
};

exports.FetchUser = async (_, { id }) => {
  console.log("hello", id);
  try {
    const fetchUser = await User.findOne({ _id: id }).populate("postIds");
    return fetchUser;
  } catch (err) {
    throw err;
  }
};
