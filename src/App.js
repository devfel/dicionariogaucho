import React from 'react';
import WordsForm from './WordsForm';
import WordsList from './WordsList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WordsList />} />
        <Route path="/cadastro" element={<WordsForm />} />
      </Routes>
    </Router>
  );
}

export default App;