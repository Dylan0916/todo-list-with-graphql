import { KeyboardEvent, FC, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

import { UseToDoList } from '@/hooks/useToDoList';

interface Props {
  addToDo: UseToDoList['addToDo'];
}

const AddItemInput: FC<Props> = ({ addToDo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmitValue = () => {
    addToDo(inputValue);
    setInputValue('');
  };

  const onKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (key !== 'Enter') return;
    handleSubmitValue();
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <TextField
        label="Write your todo list here..."
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button
        variant="contained"
        sx={{ marginLeft: 1 }}
        onClick={handleSubmitValue}
      >
        ADD
      </Button>
    </Box>
  );
};

export default AddItemInput;
