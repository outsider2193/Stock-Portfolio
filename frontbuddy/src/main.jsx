import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Corrected import
import './index.css';
import App from './App.jsx';
import { PortfolioProvider } from './components/PortfolioContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <PortfolioProvider>
      <App />
      </PortfolioProvider>
    </BrowserRouter>
  </StrictMode>
);
