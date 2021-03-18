const User = require("../../models/User");

exports.CreateUser = async (_, { name, email, avatar, bio }) => {
  try {
    const user = new User({
      name,
      email,
      avatar,
      bio,
      follower: [],
      following: [],
      postIds: [],
    });
    await user.save();
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
};

exports.DeleteUser = async (_, { id }) => {
  try {
    const findUser = await User.findById(id);
    await User.deleteOne({ _id: id });
    return findUser;
  } catch (err) {
    console.log(err);
  }
};
