import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { StyledEngineProvider } from '@mui/material/styles';
import Login from 'src/components/Login/Login';
import Footer from "./components/Footer/footer";
import About from './components/About/About';
import Menu from './components/Menu/Menu';
import Privacy from './components/Privacy/Privacy';
import PlaylistGenerator from './components/PlaylistGenerator/PlaylistGenerator';
import Generator from './components/Generator/Generator';


function App() {

  return (
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/playlists" element={<PlaylistGenerator />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
            <Footer />
        </StyledEngineProvider>
      </HelmetProvider>
  );
}

export default App;
