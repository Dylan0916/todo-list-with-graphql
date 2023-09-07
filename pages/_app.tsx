import { ApolloProvider } from '@apollo/client';
import { GlobalStyles } from '@mui/material';

import { useApollo } from '@/apollo/client';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles styles={{ body: { backgroundColor: '#e0e0e0' } }} />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
