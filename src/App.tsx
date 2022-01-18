import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GlobalProvider } from './context';
import { Home } from './pages/Home';

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Layout children={<Home />} />} />
      </Routes>
    </GlobalProvider>
  );
};

export default App;
