// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import HomePage from './pages/HomePage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import './index.css' // App.css yerine genel stilleri buradan alabiliriz.
// src/main.jsx
// ... importlar ...
import AdminPage from './pages/AdminPage.jsx';


// 2. TÜM rotaları TEK BİR konfigürasyon içinde birleştirelim
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Ana layout bileşeni
    children: [
      {
        index: true, // path: "/" olduğunda bu gösterilecek
        element: <HomePage />,
      },
      {
        path: "post/:postId", // Yazı detay sayfası
        element: <PostDetailPage />,
      },
      {
        path: "admin", // Admin paneli sayfası
        element: <AdminPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)