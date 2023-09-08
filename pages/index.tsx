import gql from 'graphql-tag';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { Card } from '@mui/material';

import ToDoHeader from '@/components/ToDoHeader';
import ToDoList from '@/components/ToDoList';
import { initializeApollo } from '@/apollo/client';
import useToDoList from '@/hooks/useToDoList';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`;

const Index = () => {
  const {
    toDoList,
    addToDo,
    editToDo,
    deleteToDo,
    toggleFinished,
    toggleEditing,
  } = useToDoList();

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 1024,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <ToDoHeader addToDo={addToDo} />
      <ToDoList
        toDoList={toDoList}
        editToDo={editToDo}
        deleteToDo={deleteToDo}
        toggleFinished={toggleFinished}
        toggleEditing={toggleEditing}
      />
    </Card>
  );
};
// const Index = () => {
//   const {
//     data: { viewer },
//   } = useQuery(ViewerQuery);

//   return (
//     <div>
//       You're signed in as {viewer.name} and you're {viewer.status} goto{' '}
//       <Link href="/about">static</Link> page.
//     </div>
//   );
// };

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
