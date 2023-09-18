import { Link, Route, Routes } from 'react-router-dom';
import AuthorsView from './components/AuthorsView';
import BooksView from './components/BooksView';
import './App.css';
import Home from './components/Home';

const App = () => {
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
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<AuthorsView />} />
        <Route path="/books" element={<BooksView />} />
      </Routes>
    </div>
  );
};

export default App;
