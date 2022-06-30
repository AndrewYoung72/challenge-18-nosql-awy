const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;