import { MouseEvent, FC } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';

import { UseToDoList } from '@/hooks/useToDoList';
import { Item } from '@/types/ToDoList';
import Actions from './Actions';

interface Props extends Omit<UseToDoList, 'todoList' | 'addToDo'> {
  item: Item;
}

const stopPropagation = (
  e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
) => {
  e.stopPropagation();
};

const ToDoItem: FC<Props> = ({
  item,
  editToDo,
  deleteToDo,
  toggleFinished,
  toggleEditing,
}) => {
  return (
    <ListItem
      secondaryAction={
        <Actions
          id={item.id}
          isFinished={item.isFinished}
          isEditing={item.isEditing}
          deleteToDo={deleteToDo}
          toggleFinished={toggleFinished}
          toggleEditing={toggleEditing}
        />
      }
      disablePadding
      sx={{ pt: 1, pb: 1 }}
    >
      <ListItemButton
        sx={{ backgroundColor: '#f4f4f4', borderRadius: '3px', pr: 20 }}
        onClick={() => toggleFinished(item.id)}
      >
        {item.isEditing ? (
          <TextField
            variant="standard"
            fullWidth
            value={item.text}
            onClick={stopPropagation}
            onChange={(e) => editToDo(item.id, e.target.value)}
          />
        ) : (
          <ListItemText
            primary={item.text}
            sx={{
              textDecoration: item.isFinished ? 'line-through' : 'none',
              opacity: item.isFinished ? 0.4 : 1,
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default ToDoItem;
