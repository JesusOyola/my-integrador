
import RegisterView from "./components/RegisterView/RegisterView";
import LoginView from "./components/LoginView/LoginView";
import {Route, Routes} from "react-router-dom";
import NavView from "./components/NavView/NavView";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getUser} from "./redux/actions/user";


function App() {

  

  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(getUser())
    .catch(err => console.log(err))
  },[])

    
  return (
    <div className="App">
    <NavView/>
    <Routes>
    
    <Route path="/" element={<h1> Integrador</h1>}/>
    <Route path="/home" element={<h1> Este es el Home</h1>}/>
    <Route path="/register" element={<RegisterView/>}/>
    <Route path="/login" element={<LoginView/>}/>
    
     </Routes>
    </div>
  );
}

export default App;
