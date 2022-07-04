const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);
// /api/thoughts/:thoughtId/reactions
// router.route("/thoughts/thoughtId:/reactions")
//   .get(getReactions);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
// Post reactions and delete
router
  .route("/:thoughtId/reactions")
  .get(getSingleThought)
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
