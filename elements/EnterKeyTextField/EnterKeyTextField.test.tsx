import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EnterKeyTextField from './EnterKeyTextField';

jest.mock('@mui/material', () => ({
  TextField: ({ onEnterKeyDown, ...rest }) => (
    <input {...rest} data-testid="textInput" />
  ),
}));

describe('EnterKeyTextField', () => {
  const defaultProps = { onEnterKeyDown: jest.fn() };

  const createRenderer = (testProps = {}) => {
    return render(<EnterKeyTextField {...defaultProps} {...testProps} />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call props.onEnterKeyDown if "Enter" is pressed', async () => {
    const { getByTestId } = createRenderer();

    await userEvent.type(getByTestId('textInput'), '123{enter}');

    expect(defaultProps.onEnterKeyDown).toBeCalledTimes(1);
  });

  it('should call props.onEnterKeyDown correctly if it is compositing', async () => {
    const { getByTestId } = createRenderer();

    fireEvent.compositionStart(getByTestId('textInput'));

    await userEvent.type(getByTestId('textInput'), '123{enter}');

    expect(defaultProps.onEnterKeyDown).not.toBeCalled();

    fireEvent.compositionEnd(getByTestId('textInput'));

    await userEvent.type(getByTestId('textInput'), '{enter}');

    expect(defaultProps.onEnterKeyDown).toBeCalledTimes(1);
  });
});
