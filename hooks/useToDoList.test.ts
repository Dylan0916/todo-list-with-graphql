import { renderHook } from '@testing-library/react';
import * as apolloClient from '@apollo/client';

import useToDoList from './useToDoList';

describe('useToDoList', () => {
  const createHook = () => renderHook(useToDoList);

  const mutation = jest.fn();

  const mockUseQuery = (v) => {
    jest.spyOn(apolloClient, 'useQuery').mockReturnValue(v);
  };

  const mockUseMutation = (v) => {
    jest.spyOn(apolloClient, 'useMutation').mockReturnValue(v);
  };

  beforeEach(() => {
    mockUseMutation([mutation, {}]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('query', () => {
    it('should return an empty toDoList array if the query return empty array', () => {
      mockUseQuery({ data: { toDoList: [] }, error: null, loading: false });

      const { result } = createHook();

      expect(result.current).toEqual(
        expect.objectContaining({ toDoList: [], error: null, loading: false })
      );
    });

    it('should return an empty toDoList array if the query still loading', () => {
      mockUseQuery({ data: undefined, error: null, loading: true });

      const { result } = createHook();

      expect(result.current).toEqual(
        expect.objectContaining({ toDoList: [], error: null, loading: true })
      );
    });

    it('should return the same value as the query return value', () => {
      mockUseQuery({
        data: { toDoList: [1, 2, 3] },
        error: null,
        loading: false,
      });

      const { result } = createHook();

      expect(result.current).toEqual(
        expect.objectContaining({
          toDoList: [1, 2, 3],
          error: null,
          loading: false,
        })
      );
    });
  });

  describe('mutations', () => {
    beforeEach(() => {
      mockUseQuery({});
    });

    describe('addToDo', () => {
      it('should do nothing if the text are all blank', () => {
        const { result } = createHook();

        result.current.addToDo('     ');

        expect(mutation).not.toBeCalled();
      });

      it('should call the mutation', () => {
        const { result } = createHook();

        result.current.addToDo(' 123   ');

        expect(mutation).toBeCalledWith({
          variables: { text: '123' },
          update: expect.any(Function),
        });
      });
    });

    describe('editToDo', () => {
      it('should do nothing if the new value is the same as the old value', () => {
        mockUseQuery({
          data: { toDoList: [{ id: '0', text: '123' }] },
        });

        const { result } = createHook();

        result.current.editToDo('0', '123');

        expect(mutation).not.toBeCalled();
      });

      it('should call the mutation', () => {
        const { result } = createHook();

        result.current.editToDo('0', '123');

        expect(mutation).toBeCalledWith({
          variables: { input: { id: '0', text: '123' } },
          update: expect.any(Function),
        });
      });
    });

    describe('deleteToDo', () => {
      it('should call the mutation', () => {
        const { result } = createHook();

        result.current.deleteToDo('0');

        expect(mutation).toBeCalledWith({
          variables: { id: '0' },
          update: expect.any(Function),
        });
      });
    });

    describe('toggleFinished', () => {
      it('should call the mutation', () => {
        const { result } = createHook();

        result.current.toggleFinished('0');

        expect(mutation).toBeCalledWith({
          variables: { id: '0' },
          update: expect.any(Function),
        });
      });
    });
  });
});
