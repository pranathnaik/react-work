const router = require("express").Router();
const {
  GetAllUsers,
  SearchUserByUserName,
  CreateUser,
  DeleteUser,
  UpdateUser,
} = require("../controller/UserController");

//declaring routes
router.get("/", GetAllUsers);
router.post("/", CreateUser);
router.get("/:username", SearchUserByUserName);
router.delete("/:username", DeleteUser);
router.put("/:username", UpdateUser);

module.exports = router;
