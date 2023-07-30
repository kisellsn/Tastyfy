import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { PlaylistProvider } from './context/playlistContext';
import { NewtracksProvider } from './context/newtracksContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistProvider>
        <NewtracksProvider>
          <App />
        </NewtracksProvider>
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
