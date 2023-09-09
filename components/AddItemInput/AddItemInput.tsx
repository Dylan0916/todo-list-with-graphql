import { useState } from 'react';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import EnterKeyTextField from '@/elements/EnterKeyTextField';
import useToDoList from '@/hooks/useToDoList';

const AddItemInput = () => {
  const { isAddToDoLoading, addToDo } = useToDoList();
  const [inputValue, setInputValue] = useState('');

  const handleSubmitValue = () => {
    addToDo(inputValue);
    setInputValue('');
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <EnterKeyTextField
        label="Write your todo list here..."
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onEnterKeyDown={handleSubmitValue}
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
