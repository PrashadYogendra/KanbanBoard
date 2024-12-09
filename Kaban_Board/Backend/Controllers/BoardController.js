const Board = require('../Models/BoardModel');

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;


    // Create board with user ID from the authenticated token
    const board = await Board.create({
      name,
      user: req.user.id,
    });

    res.status(201).json({
      message: 'Board created successfully',
      board,
    });
  } catch (error) {
    console.error('Error creating board:', error);
    res.status(500).json({ error: 'Failed to create board' });
  }
};

// Get all boards for the authenticated user
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });

    res.status(200).json({
      message: 'Boards fetched successfully',
      boards,
    });
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

// Delete a specific board
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findById(id);

    if (!board || board.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this board' });
    }

    await Board.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Board deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting board:', error);
    res.status(500).json({ error: 'Failed to delete board' });
  }
};
