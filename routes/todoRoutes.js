const express = require('express');
const router = express.Router();

const todosController = require('../controllers/todosController');

// GET TODOS
router.get('/', todosController.get);
// CREATE NEW TODOS
router.post('/', todosController.post);
// DELETE TODOS
router.delete('/:id', todosController.deleteFn);

module.exports = router;