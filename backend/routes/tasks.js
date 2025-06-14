const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');

router.use(auth);
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', updateTaskStatus);

module.exports = router;