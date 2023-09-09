import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useToDoList from '@/hooks/useToDoList';
import Actions from './Actions';

jest.mock('@/hooks/useToDoList', () => jest.fn().mockReturnValue({}));
jest.mock('@mui/material', () => ({
  Checkbox: (props) => <input type="checkbox" {...props} />,
  Button: (props) => <button {...props} />,
  IconButton: (props) => <button {...props} />,
}));

describe('Actions', () => {
  const defaultProps = {
    id: '0',
    isFinished: false,
    isEditing: false,
    onEidButtonClick: jest.fn(),
  };

  const createRenderer = (testProps = {}) => {
    return render(<Actions {...defaultProps} {...testProps} />);
  };

  const mockUseToDoList = (v) => {
    (useToDoList as jest.Mock).mockReturnValue(v);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Checkbox', () => {
    it('should have checked status if the isFinished is true', () => {
      const { getByRole } = createRenderer({ isFinished: true });

      expect(getByRole('checkbox')).toHaveProperty('checked', true);
    });

    it('should does not have checked status if the isFinished is false', () => {
      const { getByRole } = createRenderer({ isFinished: false });

      expect(getByRole('checkbox')).toHaveProperty('checked', false);
    });

    it('should call toggleFinished when is clicked', async () => {
      const mockToggleFinished = jest.fn();

      mockUseToDoList({ toggleFinished: mockToggleFinished });

      const { getByRole } = createRenderer();

      expect(mockToggleFinished).not.toBeCalled();

      await userEvent.click(getByRole('checkbox'));

      expect(mockToggleFinished).toBeCalledWith(defaultProps.id);
    });

    it('should not call toggleFinished when is clicked if the isEditing is true', async () => {
      const mockToggleFinished = jest.fn();

      mockUseToDoList({ toggleFinished: mockToggleFinished });

      const { getByRole } = createRenderer({ isEditing: true });

      expect(mockToggleFinished).not.toBeCalled();

      await userEvent.click(getByRole('checkbox'));

      expect(mockToggleFinished).not.toBeCalled();
    });
  });

  describe('edit/done button', () => {
    it('should render EDIT text if the isEditing is false', () => {
      const { queryByText } = createRenderer({ isEditing: false });

      expect(queryByText('DONE')).toBeNull();
      expect(queryByText('EDIT')).not.toBeNull();
    });

    it('should render DONE text if the isEditing is true', () => {
      const { queryByText } = createRenderer({ isEditing: true });

      expect(queryByText('DONE')).not.toBeNull();
      expect(queryByText('EDIT')).toBeNull();
    });

    it('should call onEidButtonClick when is clicked', async () => {
      const { getByText } = createRenderer();

      expect(defaultProps.onEidButtonClick).not.toBeCalled();

      await userEvent.click(getByText('EDIT'));

      expect(defaultProps.onEidButtonClick).toBeCalled();
    });

    it('should not call onEidButtonClick when is clicked if the isFinished is true', async () => {
      const { getByText } = createRenderer({ isFinished: true });

      expect(defaultProps.onEidButtonClick).not.toBeCalled();

      await userEvent.click(getByText('EDIT'));

      expect(defaultProps.onEidButtonClick).not.toBeCalled();
    });
  });

  describe('delete button', () => {
    it('should call deleteToDo when is clicked ', async () => {
      const mockDeleteToDo = jest.fn();

      mockUseToDoList({ deleteToDo: mockDeleteToDo });

      const { getByRole } = createRenderer();

      expect(mockDeleteToDo).not.toBeCalled();

      await userEvent.click(getByRole('button', { name: 'delete' }));

      expect(mockDeleteToDo).toBeCalledWith(defaultProps.id);
    });
  });
});
