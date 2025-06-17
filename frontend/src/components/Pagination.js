import { Button } from '@mui/material';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
      <Button
        variant="contained"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <span style={{ alignSelf: 'center' }}>
        Page {page} of {totalPages}
      </span>
      <Button
        variant="contained"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;