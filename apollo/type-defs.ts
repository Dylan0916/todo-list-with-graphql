import { gql } from '@apollo/client';

export const typeDefs = gql`
  input EditToDoInput {
    id: ID!
    text: String!
  }

  type ToDoItem {
    id: ID!
    text: String!
    isFinished: Boolean
  }

  type Query {
    toDoList: [ToDoItem]
  }

  type Mutation {
    addToDo(text: String!): [ToDoItem]!
    editToDo(input: EditToDoInput!): [ToDoItem]!
    deleteToDo(id: ID!): [ToDoItem]!
    toggleFinished(id: ID!): [ToDoItem]!
  }
`;
