import { FC } from 'react';
import { Button, IconButton, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface Props {
  isFinished: boolean;
}

const Actions: FC<Props> = ({ isFinished }) => {
  return (
    <>
      <Checkbox checked={isFinished} />
      <Button variant="text">EDIT</Button>
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default Actions;
