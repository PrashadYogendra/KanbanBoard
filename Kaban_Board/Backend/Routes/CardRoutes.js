const express = require('express');
const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
} = require('../Controllers/CardController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

// Create a new card
router.post('/', authMiddleware, createCard);

// Get all cards for a specific list
router.get('/:listId', authMiddleware, getCards);

// Update a specific card
router.put('/:id', authMiddleware, updateCard);

// Delete a specific card
router.delete('/:id', authMiddleware, deleteCard);

module.exports = router;
