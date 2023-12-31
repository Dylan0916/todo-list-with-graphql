import { FC, useState, useCallback } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';

import EnterKeyTextField from '@/elements/EnterKeyTextField';
import { stopPropagation } from '@/utils/eventHandlers';
import useToDoList from '@/hooks/useToDoList';
import { Item } from '@/types/ToDoList';
import Actions from './Actions';

interface Props {
  item: Item;
}

const ToDoItem: FC<Props> = ({ item }) => {
  const { editToDo, toggleFinished } = useToDoList();
  const [text, setText] = useState(item.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    if (isEditing) {
      editToDo(item.id, text);
    }
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }, [item.id, text, editToDo]);

  return (
    <ListItem
      secondaryAction={
        <Actions
          id={item.id}
          isFinished={item.isFinished}
          isEditing={isEditing}
          onEidButtonClick={handleEdit}
        />
      }
      disablePadding
      sx={{ pt: 1, pb: 1, '&>.MuiListItemButton-root': { pr: 20 } }}
    >
      <ListItemButton
        sx={{ backgroundColor: grey[100], borderRadius: '3px' }}
        onClick={() => toggleFinished(item.id)}
      >
        {isEditing ? (
          <EnterKeyTextField
            variant="standard"
            fullWidth
            value={text}
            onClick={stopPropagation}
            onChange={(e) => setText(e.target.value)}
            onEnterKeyDown={handleEdit}
          />
        ) : (
          <ListItemText
            primary={text}
            sx={{
              textDecoration: item.isFinished ? 'line-through' : 'none',
              opacity: item.isFinished ? 0.4 : 1,
              overflowX: 'auto',
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default ToDoItem;
