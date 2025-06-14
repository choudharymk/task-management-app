const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10, status, priority, search } = req.query;
  const query = { userId: req.user.id };

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) query.title = { $regex: search, $options: 'i' };

  try {
    const tasks = await Task.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Task.countDocuments(query);
    res.json({ tasks, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      userId: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};