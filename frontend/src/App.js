import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Jobs from './pages/Jobs';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/jobs' element={<Jobs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
