const express = require('express');
const {
  createBoard,
  getBoards,
  deleteBoard,
} = require('../Controllers/BoardController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

// Create a board
router.post('/', authMiddleware, createBoard);

// Get all boards for the authenticated user
router.get('/', authMiddleware, getBoards);

// Delete a specific board
router.delete('/:id', authMiddleware, deleteBoard);

module.exports = router;
