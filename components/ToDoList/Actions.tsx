import { FC } from 'react';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { UseToDoList } from '@/hooks/useToDoList';
import { Item } from '@/types/ToDoList';

interface Props
  extends Pick<UseToDoList, 'deleteToDo' | 'toggleFinished' | 'toggleEditing'> {
  id: Item['id'];
  isFinished: Item['isFinished'];
  isEditing: Item['isEditing'];
}

const Actions: FC<Props> = ({
  id,
  isFinished,
  isEditing,
  deleteToDo,
  toggleFinished,
  toggleEditing,
}) => {
  return (
    <>
      <Checkbox
        checked={isFinished}
        onClick={() => toggleFinished(id)}
        disabled={isEditing}
      />
      <Button
        variant="text"
        disabled={isFinished}
        onClick={() => toggleEditing(id)}
      >
        {isEditing ? 'DONE' : 'EDIT'}
      </Button>
      <IconButton edge="end" aria-label="delete" onClick={() => deleteToDo(id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default Actions;
