import { MouseEvent, FC, useState, useCallback } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';

import useToDoList from '@/hooks/useToDoList';
import { Item } from '@/types/ToDoList';
import Actions from './Actions';

interface Props {
  item: Item;
}

const stopPropagation = (
  e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
) => {
  e.stopPropagation();
};

const ToDoItem: FC<Props> = ({ item }) => {
  const { toggleFinished } = useToDoList();
  const [text, setText] = useState(item.text);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = useCallback(() => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }, []);

  return (
    <ListItem
      secondaryAction={
        <Actions
          id={item.id}
          isFinished={item.isFinished}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          text={text}
        />
      }
      disablePadding
      sx={{ pt: 1, pb: 1, '&>.MuiListItemButton-root': { pr: 20 } }}
    >
      <ListItemButton
        sx={{ backgroundColor: '#f4f4f4', borderRadius: '3px' }}
        onClick={() => toggleFinished(item.id)}
      >
        {isEditing ? (
          <TextField
            variant="standard"
            fullWidth
            value={text}
            onClick={stopPropagation}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <ListItemText
            primary={text}
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
