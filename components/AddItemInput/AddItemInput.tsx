import { TextField, Box, Button } from '@mui/material';

const AddItemInput = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <TextField
        label="Write your todo list here..."
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
      />
      <Button variant="contained" sx={{ marginLeft: 1 }}>
        ADD
      </Button>
    </Box>
  );
};

export default AddItemInput;
