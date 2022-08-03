const UserSchema = require("../models/UserSchema");

//get all users
module.exports.GetAllUsers = async (req, res) => {
  const data = await UserSchema.find();
  if (data.length == 0)
    return res.status(400).send({ message: "No users found" });

  return res.status(200).send({ data });
};

//get user by username
module.exports.SearchUserByUserName = async (req, res) => {
  const data = await UserSchema.findOne({ username: req.params.username });
  if (!data) return res.status(400).send({ message: "User not found" });
  return res.status(200).send({ data });
};
//create user
module.exports.CreateUser = async (req, res) => {
  //check if user already exists
  const { username, firstname, lastname, country } = req.body;
  if (!username || !firstname || !lastname || !country)
    return res.status(400).send({ message: "Please fill all fields" });

  const data = await getUser(req.body.username);
  //if exist than return message
  if (data)
    return res
      .status(400)
      .send({ message: "User already exists with same username" });
  //if not create new user
  const newUser = new UserSchema(req.body);
  await newUser.save();
  if (!newUser) return res.status(400).send({ message: "User not created" });
  return res.status(200).send({ message: "User created successfully" });
};
module.exports.DeleteUser = async (req, res) => {
  const data = await UserSchema.findOneAndDelete({
    username: req.params.username,
  });
  if (!data) return res.status(400).send({ message: "User not found" });
  return res.status(200).send({ message: "User deleted successfully" });
};
//get user by username function
function getUser(username) {
  return UserSchema.findOne({ username: username });
}

//update  user
module.exports.UpdateUser = async (req, res) => {
  const data = await UserSchema.findOneAndUpdate(
    { username: req.params.username },
    req.body,
    { new: true }
  );
  if (!data) return res.status(400).send({ message: "User not found" });
  return res.status(200).send({ message: "User updated successfully" });
};
