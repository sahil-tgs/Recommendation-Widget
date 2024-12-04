import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Demo from './pages/Demo';
import ControlPanel from './pages/ControlPanel';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex gap-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Demo
            </Link>
            <Link to="/control" className="text-white hover:text-gray-300">
              Control Panel
            </Link>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Demo />} />
            <Route path="/control" element={<ControlPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;