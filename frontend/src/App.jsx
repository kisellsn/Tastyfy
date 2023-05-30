import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import questTheme from 'src/MyDesignSystemLightTheme';
import Login from 'src/components/Login/Login';
import Footer from "./components/Footer/footer";
import About from './components/About/About';
import Menu from './components/Menu/Menu';
import Privacy from './components/Privacy/Privacy';
import PlotComponent from './components/PlotSircle/PlotSircle';

function App() {

  return (
      <HelmetProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={questTheme}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/plot" element={<PlotComponent />} />
            </Routes>
            <Footer />
          </ThemeProvider>
        </StyledEngineProvider>
      </HelmetProvider>
  );
}

export default App;
