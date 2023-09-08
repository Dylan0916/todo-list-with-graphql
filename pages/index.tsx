import { Card, Typography } from '@mui/material';

import ToDoHeader from '@/components/ToDoHeader';
import ToDoList from '@/components/ToDoList';
import { initializeApollo } from '@/apollo/client';
import useToDoList from '@/hooks/useToDoList';
import { ToDoListQuery } from '@/apollo/queries';

const Index = () => {
  const { toDoList, error, loading } = useToDoList();

  if (loading) {
    return (
      <Typography variant="h1" textAlign="center">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h1" textAlign="center">
        Something went wrong!
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 1024,
        margin: 'auto',
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
