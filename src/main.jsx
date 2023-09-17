import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allBooks {
      author
      title
      genres
    }
  }
`;

client.query({ query }).then((res) => {
  console.log(res.data);
});

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
