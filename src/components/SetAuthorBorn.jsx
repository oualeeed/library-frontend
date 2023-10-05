import { useMutation } from '@apollo/client';
import { useField } from '../utils/useField';
import { EDIT_AUTHOR } from '../graphql/mutations';
import { ALL_AUTHORS } from '../graphql/queries';

const SetAuthorBorn = ({ authors }) => {
  const name = useField('text');
  const born = useField('text');
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const editAuthorBorn = (event) => {
    event.preventDefault();
    editAuthor({
      variables: {
        name: event.target['name'].value,
        setBornTo: +born.props.value,
      },
    });
    name.reset();
    born.reset();
  };
  return (
    <div>
      <h2>hello</h2>
      <form onSubmit={editAuthorBorn}>
        <select name="name">
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born <input {...born.props} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetAuthorBorn;
