// Start of JSX file
// Template main.jsx; need to assign correct pages
// to their paths to connect them.
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleLog from './pages/SingleLog';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import FAQ from './pages/FAQPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/logs/:logId',
        element: <SingleLog />
      }, {
        path: '/faq',
        element: <FAQ />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
// End of JSX file