import { KeyboardEvent, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { handleEnterKeyDown } from '@/utils/eventHandlers';
import useToDoList from '@/hooks/useToDoList';

const AddItemInput = () => {
  const { isAddToDoLoading, addToDo } = useToDoList();
  const [inputValue, setInputValue] = useState('');

  const handleSubmitValue = () => {
    addToDo(inputValue);
    setInputValue('');
  };

  const onKeyDown = (e: KeyboardEvent) => {
    handleEnterKeyDown(e, handleSubmitValue);
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
      <LoadingButton
        loading={isAddToDoLoading}
        variant="contained"
        sx={{ marginLeft: 1 }}
      >
        ADD
      </LoadingButton>
    </Box>
  );
};

export default AddItemInput;
