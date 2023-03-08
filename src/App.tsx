import Root from './pages/Root';
import VideoDetail from './pages/VideoDetail';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    errorElement: <NotFound/>,
    children: [
      {
        index:true,
        element:<Home/>
      },
      {
        path:"/:search",
        element:<Home/>
      },
      {
        path:"/video/:id",
        element: <VideoDetail/>
      },
    ]
  }
]);
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
