import { Item } from '@/types/ToDoList';

export type Mutations = {
  addToDo: (_root: unknown, { text }: { text: string }) => Promise<Item[]>;
  editToDo: (
    _root: unknown,
    { input }: { input: { id: string; text: string } }
  ) => Promise<Item[]>;
  deleteToDo: (_root: unknown, { id }: { id: string }) => Promise<Item[]>;
  toggleFinished: (_root: unknown, { id }: { id: string }) => Promise<Item[]>;
};
