import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './Context/UserContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
             <App />
         </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  </StrictMode>,
)
