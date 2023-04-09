import './App.css';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';



import {createBrowserRouter, RouterProvider} from "react-router-dom";


function App() {
  let routes = createBrowserRouter([{
      path:"", element:<Layout/>, children:[
      {index:true, element:<Register/>,},
      {path:"home", element:<Home/>},
      {path:"login", element:<Login/>},
      {path:"*", element:<Notfound/>}

    ]
  }])
  return (
    <>

 <RouterProvider router={routes}></RouterProvider>
 </>

  );
}

export default App;
