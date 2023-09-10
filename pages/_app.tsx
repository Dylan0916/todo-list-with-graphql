import { ApolloProvider } from '@apollo/client';
import { GlobalStyles } from '@mui/material';
import { grey } from '@mui/material/colors';

import { useApollo } from '@/apollo/client';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles
        styles={{ body: { backgroundColor: grey[300], overflowX: 'hidden' } }}
      />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
