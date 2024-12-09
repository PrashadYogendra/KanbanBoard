const express = require('express');
const {
  createList,
  getLists,
  updateList,
  deleteList,
} = require('../Controllers/ListController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

// Create a list
router.post('/', authMiddleware, createList);

// Get all lists for a specific board
router.get('/:boardId', authMiddleware, getLists);

// Update a specific list
router.put('/:id', authMiddleware, updateList);

// Delete a specific list
router.delete('/:id', authMiddleware, deleteList);

module.exports = router;
