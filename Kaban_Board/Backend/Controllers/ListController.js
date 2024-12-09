const List = require('../Models/ListModel');

// Create a new list
exports.createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ error: 'Title and Board ID are required' });
    }

    const list = await List.create({
      title,
      board: boardId,
      user: req.user.id,
    });

    res.status(201).json({
      message: 'List created successfully',
      list,
    });
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ error: 'Failed to create list' });
  }
};

// Get all lists for a specific board
exports.getLists = async (req, res) => {
  try {
    const { boardId } = req.params;

    const lists = await List.find({ board: boardId, user: req.user.id });

    res.status(200).json({
      message: 'Lists fetched successfully',
      lists,
    });
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
};

// Update a specific list
exports.updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const list = await List.findById(id);

    if (!list || list.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this list' });
    }

    list.title = title || list.title;
    await list.save();

    res.status(200).json({
      message: 'List updated successfully',
      list,
    });
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({ error: 'Failed to update list' });
  }
};

// Delete a specific list
exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;

    const list = await List.findById(id);

    if (!list || list.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this list' });
    }

    await list.remove();

    res.status(200).json({
      message: 'List deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(500).json({ error: 'Failed to delete list' });
  }
};
