import React from 'react';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

const App = () => {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
  );
};

export default App;
