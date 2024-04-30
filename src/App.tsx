import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import UserDetails from './components/UserDetails/UserDetails';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { registerIcons } from '@fluentui/react';

function App() {
  console.log("Rendering App");

  const router = createBrowserRouter([
     {
      //parent element
      element: <Layout/>,
      children : [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/home",
          element: <Home/>
        },
        {
          path:"/users",
          element: <Users/>
        },
        {
          path:"/users/:userId",
          element:<UserDetails isNewUser={false}/>
        },
        {
          path:"/users/newUser",
          element:<UserDetails isNewUser={true}/>
        }
      ]
     }
  ]);

  initializeIcons();

  

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
