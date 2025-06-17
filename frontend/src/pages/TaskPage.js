import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskAPI } from '../api';
import TaskForm from '../components/TaskForm';
import { Alert } from '@mui/material';
import styles from '../styles/App.module.css';

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await taskAPI.getTasks({ id });
      setTask(res.data.tasks[0]);
    } catch (err) {
      setError('Failed to fetch task');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (id) {
        await taskAPI.updateTask(id, formData);
      } else {
        await taskAPI.createTask(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className={styles.center}>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      <TaskForm onSubmit={handleSubmit} initialData={task || {}} />
    </div>
  );
};

export default TaskPage;