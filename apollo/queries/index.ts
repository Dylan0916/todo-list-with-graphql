import gql from 'graphql-tag';

import { ToDoItemFields } from '../fragments';

export const ToDoListQuery = gql`
  query ToDoList {
    toDoList {
      ...ToDoItemFields
    }
  }
  ${ToDoItemFields}
`;
