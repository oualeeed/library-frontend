import { Link, Route, Routes } from 'react-router-dom';
import AuthorsView from './components/AuthorsView';
import BooksView from './components/BooksView';
import './App.css';
import Home from './components/Home';
import AddBook from './components/AddBook';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginFrom';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('user-token-library');
    if (token) {
      setUser(token);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <nav className="nav-bar">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/books">
          Books
        </Link>
        <Link className="link" to="/authors">
          Authors
        </Link>
        {!user ? (
          <Link className="link" to="/login">
            login
          </Link>
        ) : (
          <>
            <Link className="link" to="/add-book">
              Add a book
            </Link>
            <Link onClick={logout} className="link" to="/login">
              logout
            </Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<AuthorsView />} />
        <Route path="/books" element={<BooksView />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
      </Routes>
    </div>
  );
};

export default App;
