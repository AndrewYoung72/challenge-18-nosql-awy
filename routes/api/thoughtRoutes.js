const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/")
  .get(getThoughts)
  .post(createThought);
// /api/thoughts/:thoughtId/reactions
// router.route("/thoughts/thoughtId:/reactions")
//   .get(getReactions);
router.route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)
  .post(createReaction)
  .delete(deleteReaction);


module.exports = router;
