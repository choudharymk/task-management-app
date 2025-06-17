import { Card, CardContent, Typography, Button, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  return (
    <Card sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description || 'No description'}
        </Typography>
        <Typography variant="caption">
          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
        </Typography>
        <Chip
          label={task.priority}
          color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
          size="small"
        />
        <Chip
          label={task.status}
          color={task.status === 'completed' ? 'success' : 'default'}
          size="small"
          onClick={() => onStatusChange(task._id, task.status === 'pending' ? 'completed' : 'pending')}
        />
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            component={Link}
            to={`/task/${task._id}`}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;