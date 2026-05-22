const prisma = require('../lib/prisma');

// Get all todos for a user
exports.getAllTodos = async (req, res) => {
  try {
    const { userId } = req.query;
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { created_at: 'asc' },
    });
    return res.json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const { userId } = req.query;

    const todo = await prisma.todo.create({
      data: {
        task,
        userId,
      },
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, completed, completed_time } = req.body;

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        task,
        completed,
        completed_time: completed_time ? new Date(completed_time) : null,
      },
    });

    return res.json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Delete a single todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({ where: { id } });
    return res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Delete all todos for a user
exports.deleteAllTodos = async (req, res) => {
  try {
    const { userId } = req.query;
    await prisma.todo.deleteMany({ where: { userId } });
    return res.json({ message: 'All todos deleted successfully', status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', status: 500 });
  }
};
