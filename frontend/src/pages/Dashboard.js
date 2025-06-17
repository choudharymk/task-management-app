import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { taskAPI } from '../api';
import TaskCard from '../components/TaskCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { Button, Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../styles/App.module.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, filters, page]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await taskAPI.getTasks({ ...filters, page, limit: 10 });
      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskAPI.updateStatus(id, status);
      fetchTasks();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  if (!user) {
    return <Alert severity="info">Please login to view tasks</Alert>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Task Dashboard</h1>
        <Button variant="contained" component={Link} to="/task">
          Create Task
        </Button>
      </div>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      <FilterBar filters={filters} onFilterChange={setFilters} />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : tasks.length === 0 ? (
        <Alert severity="info">No tasks found</Alert>
      ) : (
        <div className={styles.grid}>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Dashboard;