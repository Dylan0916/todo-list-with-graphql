import { useCallback } from 'react';
import { useQuery, useMutation, ApolloCache } from '@apollo/client';

import { ToDoListQuery } from '@/apollo/queries';
import {
  AddToDoMutation,
  EditToDoMutation,
  DeleteToDoMutation,
  ToggleFinishedMutation,
} from '@/apollo/mutations';
import { Item } from '@/types/ToDoList';

export type UseToDoList = ReturnType<typeof useToDoList>;

function updateToDoList(cache: ApolloCache<unknown>, nextToDoList: Item[]) {
  cache.writeQuery({
    query: ToDoListQuery,
    data: { toDoList: nextToDoList },
  });
}

export default function useToDoList() {
  const {
    data: { toDoList },
    error,
    loading,
  } = useQuery<{ toDoList: Item[] }>(ToDoListQuery);
  const [addToDoMutation, { loading: isAddToDoLoading }] =
    useMutation(AddToDoMutation);
  const [editToDoMutation] = useMutation(EditToDoMutation);
  const [deleteToDoMutation] = useMutation(DeleteToDoMutation);
  const [toggleFinishedMutation] = useMutation(ToggleFinishedMutation);

  const addToDo = useCallback(
    (text: string) => {
      if (text.trim().length === 0) return;

      addToDoMutation({
        variables: { text },
        update(cache, { data: { addToDo: nextToDoList } }) {
          updateToDoList(cache, nextToDoList);
        },
      });
    },
    [addToDoMutation]
  );

  const editToDo = useCallback(
    (id: string, text: string) => {
      const prevToDoItem = toDoList.find((item) => item.id === id);

      if (prevToDoItem?.text === text) return;

      editToDoMutation({
        variables: { input: { id, text } },
        update(cache, { data: { editToDo: nextToDoList } }) {
          updateToDoList(cache, nextToDoList);
        },
      });
    },
    [toDoList, editToDoMutation]
  );

  const deleteToDo = useCallback(
    (id: string) => {
      deleteToDoMutation({
        variables: { id },
        update(cache, { data: { deleteToDo: nextToDoList } }) {
          updateToDoList(cache, nextToDoList);
        },
      });
    },
    [deleteToDoMutation]
  );

  const toggleFinished = useCallback(
    (id: string) => {
      toggleFinishedMutation({
        variables: { id },
        update(cache, { data: { toggleFinished: nextToDoList } }) {
          updateToDoList(cache, nextToDoList);
        },
      });
    },
    [toggleFinishedMutation]
  );

  return {
    toDoList: toDoList || [],
    error,
    loading,
    addToDo,
    isAddToDoLoading,
    editToDo,
    deleteToDo,
    toggleFinished,
  };
}
