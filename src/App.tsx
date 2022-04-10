import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';
import { GlobalProvider } from './context';
import { Anime } from './pages/Anime';
import { Directory } from './pages/Directory';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';
import { Week } from './pages/Week';

import 'tw-elements';

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Layout children={<Home />} />} />
        <Route path="/directorio" element={<Layout children={<Directory />} />}>
          <Route path="/directorio/:page" element={<Layout children={<Directory />} />} />
        </Route>
        <Route path="/programacion" element={<Layout children={<Week />} />} />
        <Route path="ver/:id" element={<Layout children={<Watch />} />} />
        <Route path="anime/:id" element={<Layout children={<Anime />} />} />
        <Route path="*" element={<Layout children={<NotFound />} />} />
      </Routes>
    </GlobalProvider>
  );
};

export default App;
