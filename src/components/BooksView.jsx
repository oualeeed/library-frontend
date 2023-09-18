import { useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries';

const BooksView = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BooksView;
