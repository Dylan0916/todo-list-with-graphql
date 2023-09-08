import { FC } from 'react';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import useToDoList from '@/hooks/useToDoList';
import { Item } from '@/types/ToDoList';

interface Props {
  text: string;
  id: Item['id'];
  isFinished: Item['isFinished'];
  isEditing: boolean;
  toggleEditing: () => void;
}

const Actions: FC<Props> = ({
  text,
  id,
  isFinished,
  isEditing,
  toggleEditing,
}) => {
  const { editToDo, deleteToDo, toggleFinished } = useToDoList();

  const onEidButtonClick = () => {
    if (isEditing) {
      editToDo(id, text);
    }
    toggleEditing();
  };

  return (
    <>
      <Checkbox
        checked={isFinished}
        onClick={() => toggleFinished(id)}
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
