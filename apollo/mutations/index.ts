import gql from 'graphql-tag';

import { ToDoItemFields } from '../fragments';

export const AddToDoMutation = gql`
  mutation AddToDo($text: String!) {
    addToDo(text: $text) {
      ...ToDoItemFields
    }
  }
  ${ToDoItemFields}
`;

export const EditToDoMutation = gql`
  mutation EditToDo($input: EditToDoInput!) {
    editToDo(input: $input) {
      ...ToDoItemFields
    }
  }
  ${ToDoItemFields}
`;

export const DeleteToDoMutation = gql`
  mutation DeleteToDo($id: ID!) {
    deleteToDo(id: $id) {
      ...ToDoItemFields
    }
  }
  ${ToDoItemFields}
`;

export const ToggleFinishedMutation = gql`
  mutation ToggleFinished($id: ID!) {
    toggleFinished(id: $id) {
      ...ToDoItemFields
    }
  }
  ${ToDoItemFields}
`;
