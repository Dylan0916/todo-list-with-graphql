import { Card } from '@mui/material';

import ToDoHeader from '@/components/ToDoHeader';
import ToDoList from '@/components/ToDoList';
import { initializeApollo } from '@/apollo/client';
import useToDoList from '@/hooks/useToDoList';
import { ToDoListQuery } from '@/apollo/queries';

const Index = () => {
  const { toDoList, error, loading } = useToDoList();

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
      <ToDoHeader />
      <ToDoList toDoList={toDoList} />
    </Card>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ToDoListQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
