import { FC } from 'react';
import { Typography, List, CardContent } from '@mui/material';

import { UseToDoList } from '@/hooks/useToDoList';
import ToDoItem from './ToDoItem';

type Props = Pick<UseToDoList, 'toDoList'>;

const ToDoList: FC<Props> = ({ toDoList }) => {
  return (
    <CardContent sx={{ '&:last-child': { p: [1, 2] } }}>
      <Typography textAlign="center">LIST OF WORKS TODO:</Typography>
      <List>
        {toDoList.map((item) => (
          <ToDoItem key={item.id} item={item} />
        ))}
      </List>
    </CardContent>
  );
};

export default ToDoList;
