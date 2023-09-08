import { ToDoList } from '@/sql';

import { Mutations } from './types/mutations';

const queries = {
  toDoList() {
    return ToDoList.findAll();
  },
};

const mutations: Mutations = {
  addToDo: async (_root, { text }) => {
    if (text.trim().length === 0) return;

    try {
      await ToDoList.create({ text });

      return ToDoList.findAll();
    } catch (error) {
      return error;
    }
  },
  editToDo: async (_root, { input }) => {
    const { id, text } = input;

    try {
      const foundToDo = await ToDoList.findOne({ where: { id } });

      if (!foundToDo) {
        throw new Error('ToDo not found');
      }

      await foundToDo.update({ text });

      return ToDoList.findAll();
    } catch (error) {
      return error;
    }
  },
  deleteToDo: async (_root, { id }) => {
    try {
      await ToDoList.destroy({ where: { id } });

      return ToDoList.findAll();
    } catch (error) {
      return error;
    }
  },
  toggleFinished: async (_root, { id }) => {
    try {
      const foundToDo = await ToDoList.findOne({ where: { id } });

      if (!foundToDo) {
        throw new Error('ToDo not found');
      }

      await foundToDo.update({ isFinished: !foundToDo.isFinished });

      return ToDoList.findAll();
    } catch (error) {
      return error;
    }
  },
};

export const resolvers = {
  Query: queries,
  Mutation: mutations,
};
