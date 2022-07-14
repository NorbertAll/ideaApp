import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Home from './pages/Home';
import CreateIdea from './pages/CreateIdea';
import Idea from './pages/Idea';

function App() {
  
    return (
    
    <div className="App">
      <Router>
        <div className='nav'>
          <Link to="/createidea">Nowy pomysł</Link>
          <Link to="/">Strona Główna</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createidea" element={<CreateIdea/>}/>
          <Route path="/idea/:id" element={<Idea/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
