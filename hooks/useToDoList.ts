import { useState, useRef, useCallback } from 'react';

import { Item } from '@/types/ToDoList';

const data = [
  { id: 0, text: 'TODO 1', isFinished: false, isEditing: false },
  { id: 1, text: 'TODO 2', isFinished: true, isEditing: false },
  { id: 2, text: 'TODO 3', isFinished: false, isEditing: false },
];

export interface UseToDoList {
  toDoList: Item[];
  addToDo: (text: string) => void;
  editToDo: (id: number, text: string) => void;
  deleteToDo: (id: number) => void;
  toggleFinished: (id: number) => void;
  toggleEditing: (id: number) => void;
}

export default function useToDoList() {
  const [toDoList, setToDoList] = useState<Item[]>(data);
  const idCounterRef = useRef(data.length);

  const addToDo = useCallback((text: string) => {
    if (text.trim().length === 0) return;

    setToDoList((prev) => {
      return prev.concat({
        id: idCounterRef.current,
        text,
        isFinished: false,
        isEditing: false,
      });
    });
    idCounterRef.current += 1;
  }, []);

  const editToDo = useCallback((id: number, text: string) => {
    setToDoList((prev) => {
      return prev.map((item) => (item.id === id ? { ...item, text } : item));
    });
  }, []);

  const deleteToDo = useCallback((id: number) => {
    setToDoList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleFinished = useCallback((id: number) => {
    setToDoList((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isFinished: !item.isFinished } : item
      );
    });
  }, []);

  const toggleEditing = useCallback((id: number) => {
    setToDoList((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      );
    });
  }, []);

  return {
    toDoList,
    addToDo,
    editToDo,
    deleteToDo,
    toggleFinished,
    toggleEditing,
  };
}
