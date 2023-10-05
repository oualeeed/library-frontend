import { useState } from 'react';
import { useField } from '../utils/useField';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS } from '../graphql/queries';

const AddBook = () => {
  const [genres, setGenres] = useState([]);
  const [addBookMutation] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });
  const title = useField('text');
  const author = useField('text');
  const published = useField('text');
  const genre = useField('text');

  const alreadySelected = () => genres.includes(genre.props.value);

  const addGenre = (event) => {
    event.preventDefault();
    if (alreadySelected()) return;
    setGenres(genres.concat(genre.props.value));
    genre.reset();
  };

  const createBook = (event) => {
    event.preventDefault();
    addBookMutation({
      variables: {
        title: title.props.value,
        author: author.props.value,
        published: +published.props.value,
        genres,
      },
    });
    title.reset();
    author.reset();
    published.reset();
    setGenres([]);
  };

  return (
    <div>
      <h2>Add new Book</h2>
      <form onSubmit={createBook}>
        <div>
          title <input {...title.props} />
        </div>
        <div>
          author <input {...author.props} />
        </div>
        <div>
          published <input {...published.props} />
        </div>
        <div>
          <input {...genre.props} />
          <button onClick={addGenre}>add genre</button> <br></br>
          genres : {genres.join(' ')}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default AddBook;
