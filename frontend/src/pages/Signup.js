import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';
import styles from '../styles/App.module.css';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.center}>
      <div className={styles.formContainer}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Signup</h2>
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : 'Signup'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;