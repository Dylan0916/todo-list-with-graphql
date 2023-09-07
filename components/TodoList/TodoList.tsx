import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import Actions from './Actions';

const data = [
  { id: 0, name: 'TODO 1', isFinished: false },
  { id: 1, name: 'TODO 2', isFinished: true },
  { id: 2, name: 'TODO 3', isFinished: false },
];

const TodoList = () => {
  return (
    <>
      <Typography textAlign="center">LIST OF WORKS TODO:</Typography>
      <List>
        {data.map((datum) => (
          <ListItem
            key={datum.id}
            secondaryAction={<Actions isFinished={datum.isFinished} />}
            disablePadding
            sx={{ pt: 1, pb: 1 }}
          >
            <ListItemButton
              sx={{ backgroundColor: '#f4f4f4', borderRadius: '3px' }}
            >
              <ListItemText
                primary={datum.name}
                sx={{
                  textDecoration: datum.isFinished ? 'line-through' : 'none',
                  opacity: datum.isFinished ? 0.4 : 1,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TodoList;
