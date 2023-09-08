import { Mutations } from './types/mutations';

const data = [
  { id: '0', text: 'TODO 1', isFinished: false },
  { id: '1', text: 'TODO 2', isFinished: true },
  { id: '2', text: 'TODO 3', isFinished: false },
];

let idCounter = data.length;

const queries = {
  toDoList() {
    return data;
  },
};

const mutations: Mutations = {
  addToDo: (_root, { text }) => {
    if (text.trim().length === 0) return;

    const newToDo = {
      id: `${idCounter++}`,
      text,
      isFinished: false,
    };

    data.push(newToDo);

    return data;
  },
  editToDo: (_root, { input }) => {
    const { id, text } = input;
    const foundToDo = data.find((datum) => datum.id === id);

    if (!foundToDo) {
      throw new Error('ToDo not found');
    }

    foundToDo.text = text;

    return data;
  },
  deleteToDo: (_root, { id }) => {
    const foundIndex = data.findIndex((datum) => datum.id === id);

    if (foundIndex === -1) {
      throw new Error('ToDo not found');
    }

    data.splice(foundIndex, 1);

    return data;
  },
  toggleFinished: (_root, { id }) => {
    const foundToDo = data.find((datum) => datum.id === id);

    if (!foundToDo) {
      throw new Error('ToDo not found');
    }

    foundToDo.isFinished = !foundToDo.isFinished;

    return data;
  },
};

export const resolvers = {
  Query: queries,
  Mutation: mutations,
};
