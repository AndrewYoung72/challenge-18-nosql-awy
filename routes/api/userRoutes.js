const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/")
  .get(getUsers)
  .post(createUser);
// /api/users/:userId
router.route("/:userId")
  .get(getSingleUser)
  .delete(deleteUser);
// /api/users/:userId/friends
router.route('/:userId/friends')
  .get(getSingleUser)
  .post(addFriend);

module.exports = router;
