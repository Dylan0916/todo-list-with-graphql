import { FC } from 'react';
import { Typography, List } from '@mui/material';

import { UseToDoList } from '@/hooks/useToDoList';
import ToDoItem from './ToDoItem';

type Props = Omit<UseToDoList, 'addToDo'>;

const ToDoList: FC<Props> = ({
  toDoList,
  editToDo,
  deleteToDo,
  toggleFinished,
  toggleEditing,
}) => {
  return (
    <>
      <Typography textAlign="center">LIST OF WORKS TODO:</Typography>
      <List>
        {toDoList.map((item) => (
          <ToDoItem
            key={item.id}
            item={item}
            editToDo={editToDo}
            deleteToDo={deleteToDo}
            toggleFinished={toggleFinished}
            toggleEditing={toggleEditing}
          />
        ))}
      </List>
    </>
  );
};

export default ToDoList;
