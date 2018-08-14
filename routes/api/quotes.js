const router = require("express").Router();
const quotesController = require("../../controllers/quotesController");

// Matches with "/api/quotes"
router.route("/")
  .get(quotesController.findAll)
  .post(quotesController.create);

// Matches with "/api/quotes/:id"
router
  .route("/:id")
  .get(quotesController.findById)
  .put(quotesController.update)
  .delete(quotesController.remove);

module.exports = router;
