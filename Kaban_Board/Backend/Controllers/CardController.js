const Card = require('../Models/CardModels');

// Create a new card
exports.createCard = async (req, res) => {
  try {
    const { title, description, dueDate, priority, listId } = req.body;

    const card = await Card.create({
      title,
      description,
      dueDate,
      priority,
      list: listId,
      user: req.user.id,
    });

    res.status(201).json({
      message: 'Card created successfully',
      card,
    });
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
};

// Get all cards for a specific list
exports.getCards = async (req, res) => {
  try {
    const { listId } = req.params;

    const cards = await Card.find({ list: listId, user: req.user.id });

    res.status(200).json({
      message: 'Cards fetched successfully',
      cards,
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

// Update a specific card
exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;

    const card = await Card.findById(id);

    if (!card || card.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this card' });
    }

    card.title = title || card.title;
    card.description = description || card.description;
    card.dueDate = dueDate || card.dueDate;
    card.priority = priority || card.priority;

    await card.save();

    res.status(200).json({
      message: 'Card updated successfully',
      card,
    });
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
};

// Delete a specific card
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);

    if (!card || card.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this card' });
    }

    await Card.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Card deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
};
