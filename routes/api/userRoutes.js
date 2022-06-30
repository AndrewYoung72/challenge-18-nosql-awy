const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addThought,
  removeThought
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser);
// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
// /api/users/:userId/thoughts
router.route('/:studentId/thoughts').post(addThought);
// /api/users/:userId/thoughts/:thoughId
router.route('/:studentId/thoughts/:athoughtId').delete(removeThought);

module.exports = router;