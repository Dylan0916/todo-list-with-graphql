import { Item } from '@/types/ToDoList';

export type Mutations = {
  addToDo: (_root: unknown, { text }: { text: string }) => Item[];
  editToDo: (
    _root: unknown,
    { input }: { input: { id: string; text: string } }
  ) => Item[];
  deleteToDo: (_root: unknown, { id }: { id: string }) => Item[];
  toggleFinished: (_root: unknown, { id }: { id: string }) => Item[];
};
