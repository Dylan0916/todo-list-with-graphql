import { FC, KeyboardEvent, useRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type Props = TextFieldProps & {
  onEnterKeyDown: () => void;
};

const EnterKeyTextField: FC<Props> = ({ onEnterKeyDown, ...rest }) => {
  const isCompositingRef = useRef(false);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || isCompositingRef.current) return;

    onEnterKeyDown();
  };

  return (
    <TextField
      {...rest}
      onCompositionStart={() => (isCompositingRef.current = true)}
      onCompositionEnd={() => (isCompositingRef.current = false)}
      onKeyDown={onKeyDown}
    />
  );
};

export default EnterKeyTextField;
