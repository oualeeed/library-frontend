import { Link, Route, Routes } from 'react-router-dom';
import AuthorsView from './components/AuthorsView';
import BooksView from './components/BooksView';
import './App.css';

const App = () => {
  return (
    <div>
      <div>
        <Link to="/books">Books</Link>
        <Link to="/authors">Authors</Link>
      </div>

      <Routes>
        <Route path="/authors" element={<AuthorsView />} />
        <Route path="/books" element={<BooksView />} />
      </Routes>
    </div>
  );
};

export default App;
