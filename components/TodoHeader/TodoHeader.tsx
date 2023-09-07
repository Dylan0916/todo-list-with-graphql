import { Typography, Box } from '@mui/material';

import AddItemInput from '../AddItemInput';

const TodoHeader = () => {
  return (
    <Box textAlign="center" pt={4} pb={3} pl={[1, 9]} pr={[1, 9]}>
      <Typography variant="h2" mb={2}>
        TODO LIST
      </Typography>
      <AddItemInput />
    </Box>
  );
};

export default TodoHeader;
