import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../graphql/queries';

const BooksView = () => {
  const result = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState(null);

  const getGenres = (allBooks) => {
    let genresFilters = [];
    allBooks
      .map((book) => book.genres)
      .forEach((genres) => {
        genresFilters = genresFilters.concat(...genres);
      });

    genresFilters = genresFilters.filter(
      (genre, index, genresFilters) => genresFilters.indexOf(genre) === index,
    );
    return genresFilters;
  };

  const filterBooksBygenre = (genre) => () => {
    if (genre === filter) return setFilter(null);
    setFilter(genre);
  };

  if (result.loading) {
    return <div>Loading...</div>;
  }

  let genresFilters = [];
  let booksToShow = [];
  if (result.data) {
    genresFilters = getGenres(result.data.allBooks);
    if (filter)
      booksToShow = result.data.allBooks.filter((book) =>
        book.genres.includes(filter),
      );
    else booksToShow = result.data.allBooks;
  }

  return (
    <>
      <h2>books</h2>
      {genresFilters.map((genre, index) => (
        <button key={index} onClick={filterBooksBygenre(genre)}>
          {genre}
        </button>
      ))}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {booksToShow.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BooksView;
