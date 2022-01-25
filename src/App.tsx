import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { GlobalProvider } from './context';
import { Home } from './pages/Home';
import { Watch } from './pages/Watch';
import 'tw-elements';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Anime } from './pages/Anime';
import { Directory } from './pages/Directory';
import { Week } from './pages/Week';
import { NotFound } from './components/NotFound';

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
