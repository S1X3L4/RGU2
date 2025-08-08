const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Use auth middleware for all todo routes
router.use(authMiddleware);

// Get all todos for logged in user
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new todo
router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });

  try {
    const todo = new Todo({
      userId: req.user.id,
      text,
      completed: false
    });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle completed
router.put('/:id', async (req, res) => {
  const { completed } = req.body;
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
