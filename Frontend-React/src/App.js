import {Routes, BrowserRouter, Route, Navigate} from "react-router-dom"; 
import {Form} from './components/pages/form';
import { User } from "./components/pages/userPage";
import { UserPanel } from "./components/pages/userPanel";
import { UserGroup } from "./components/pages/userGroup";
import './App.css';

function App() {
  return (
    <div className="main-div">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/userPanel" element={<UserPanel/>}/>
          <Route path="/userGroup" element={<UserGroup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
