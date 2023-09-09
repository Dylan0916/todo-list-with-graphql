import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useToDoList from '@/hooks/useToDoList';
import AddItemInput from './AddItemInput';

jest.mock('@mui/lab', () => ({
  LoadingButton: ({ loading, onClick, children }) => (
    <>
      <p>loading-{`${loading}`}</p>
      <button onClick={onClick}>{children}</button>
    </>
  ),
}));
jest.mock('@/hooks/useToDoList', () => jest.fn());
jest.mock('@/elements/EnterKeyTextField', () => ({ value, onChange }) => (
  <input value={value} onChange={onChange} data-testid="textInput" />
));

describe('AddItemInput', () => {
  const createRenderer = () => render(<AddItemInput />);

  const mockUseToDoList = (v) => {
    (useToDoList as jest.Mock).mockReturnValue(v);
  };

  it('should has loading status if the isAddToDoLoading is true', () => {
    mockUseToDoList({ isAddToDoLoading: true });

    const { queryByText } = createRenderer();

    expect(queryByText('loading-true')).not.toBeNull();
    expect(queryByText('loading-false')).toBeNull();
  });

  it('should has loading status if the isAddToDoLoading is true', () => {
    mockUseToDoList({ isAddToDoLoading: false });

    const { queryByText } = createRenderer();

    expect(queryByText('loading-true')).toBeNull();
    expect(queryByText('loading-false')).not.toBeNull();
  });

  it('should trigger the addToDo and reset text value when add button is clicked', async () => {
    const mockAddToDo = jest.fn();

    mockUseToDoList({ isAddToDoLoading: false, addToDo: mockAddToDo });

    const { getByText, getByTestId } = createRenderer();
    const inputValue = 'test123';

    expect(getByTestId('textInput')).toHaveProperty('value', '');

    await userEvent.type(getByTestId('textInput'), inputValue);

    expect(getByTestId('textInput')).toHaveProperty('value', inputValue);

    await userEvent.click(getByText('ADD'));

    expect(mockAddToDo).toBeCalledWith(inputValue);
    expect(getByTestId('textInput')).toHaveProperty('value', '');
  });
});
