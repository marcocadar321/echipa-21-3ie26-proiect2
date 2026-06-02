import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar /> {/* Aici stă fix, deasupra tuturor paginilor */}

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Când vei crea About și Contact, le vei adăuga aici */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;