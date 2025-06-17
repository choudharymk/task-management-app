import { TextField, MenuItem } from '@mui/material';

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '16px' }}>
      <TextField
        label="Search Tasks"
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        fullWidth
      />
      <TextField
        select
        label="Status"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </TextField>
      <TextField
        select
        label="Priority"
        value={filters.priority}
        onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
    </div>
  );
};

export default FilterBar;