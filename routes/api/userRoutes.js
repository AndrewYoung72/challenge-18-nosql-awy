const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);
// /api/users/:userId
router.route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);
// /api/users/:userId/friends/:friendsId
router.route("/:userId/friends").get(getSingleUser).post(createFriend);
router
  .route("/:userId/friends/:friendsId")
  .get(getSingleUser)
  .delete(removeFriend);

module.exports = router;
