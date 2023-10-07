import { useMutation } from '@apollo/client';
import { useField } from '../utils/useField';
import { LOGIN } from '../graphql/mutations';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const username = useField('text');
  const password = useField('text');
  const navigate = useNavigate();

  const [loginMutate, result] = useMutation(LOGIN, {
    onError: () => console.log('error a zbi'),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setUser(token);
      localStorage.setItem('user-token-library', token);
      navigate('/');
    }
  }, [result.data, setUser, navigate]);

  const login = (e) => {
    e.preventDefault();
    loginMutate({
      variables: {
        username: username.props.value,
        password: password.props.value,
      },
    });
  };

  return (
    <div>
      <form onSubmit={login}>
        <div>
          username : <input {...username.props} />
        </div>
        <div>
          password : <input {...password.props} />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
