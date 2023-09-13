import {BrowserRouter,Route,Routes} from 'react-router-dom';

import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Sigle from "./pages/single/Sigle";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user}=useContext(Context);
  return (
    <BrowserRouter>
      <Topbar/>
       <Routes>
         <Route path="/" element={<Home/>} exact/>
         <Route path="/register" element={user?(<Home/>):(<Register/>)}/>
         <Route path="/login" element={user?(<Home/>):(<Login/>)}/>
         <Route path="/write" element={user?(<Write/>):(<Register/>)}/>
         <Route path="/post/:postId" element={<Sigle/>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
