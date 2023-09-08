import gql from 'graphql-tag';

export const ToDoItemFields = gql`
  fragment ToDoItemFields on ToDoItem {
    id
    text
    isFinished
  }
`;
