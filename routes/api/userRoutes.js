const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  createFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);
// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);
// /api/users/:userId/friends
router.route("/:userId/friends").get(getSingleUser).post(createFriend);
// /api/users/:userId/friends/:friendsId
router.route("/:userId/friends/:friendsId").get(getSingleUser).delete(removeFriend);

module.exports = router;
