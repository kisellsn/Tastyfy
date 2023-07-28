import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { PlaylistProvider } from './context/playlistContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
