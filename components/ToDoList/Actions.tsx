import { FC } from 'react';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import useToDoList from '@/hooks/useToDoList';
import { Item } from '@/types/ToDoList';

interface Props {
  id: Item['id'];
  isFinished: Item['isFinished'];
  isEditing: boolean;
  onEidButtonClick: () => void;
}

const Actions: FC<Props> = ({
  id,
  isFinished,
  isEditing,
  onEidButtonClick,
}) => {
  const { deleteToDo, toggleFinished } = useToDoList();

  return (
    <>
      <Checkbox
        checked={isFinished}
        onChange={() => toggleFinished(id)}
        disabled={isEditing}
      />
      <Button variant="text" disabled={isFinished} onClick={onEidButtonClick}>
        {isEditing ? 'DONE' : 'EDIT'}
      </Button>
      <IconButton edge="end" aria-label="delete" onClick={() => deleteToDo(id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default Actions;
