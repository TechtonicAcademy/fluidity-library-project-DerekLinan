const router = require('express').Router();
const bookController = require('../controllers/bookController');
const logger = require('morgan');

router.use(logger(':url'));
router.route('/?').get(bookController.search);
router.route('/').get(bookController.findAll).post(bookController.create);
router
  .route(':id')
  .get(bookController.findById)
  .put(bookController.update)
  .delete(bookController.delete);

module.exports = router;