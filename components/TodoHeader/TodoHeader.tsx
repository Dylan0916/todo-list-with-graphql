import { FC } from 'react';
import { Typography, Box } from '@mui/material';

import { UseToDoList } from '@/hooks/useToDoList';
import AddItemInput from '../AddItemInput';

interface Props {
  addToDo: UseToDoList['addToDo'];
}

const TodoHeader: FC<Props> = ({ addToDo }) => {
  return (
    <Box textAlign="center" pt={4} pb={3} pl={[1, 9]} pr={[1, 9]}>
      <Typography variant="h2" mb={2}>
        TODO LIST
      </Typography>
      <AddItemInput addToDo={addToDo} />
    </Box>
  );
};

export default TodoHeader;
