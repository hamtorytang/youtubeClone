import Root from './pages/Root';
import VideoDetail from './pages/VideoDetail';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
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
