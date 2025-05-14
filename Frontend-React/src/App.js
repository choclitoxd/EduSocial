import {Routes, BrowserRouter, Route, Navigate} from "react-router-dom"; 
import {Form} from './components/pages/form';
import { User } from "./components/pages/userPage";
import { UserPanel } from "./components/pages/userPanel";
import { UserGroup } from "./components/pages/userGroup";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="main-div">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/" element={<Form />} />
            <Route path="/" element={<UserPanel />} />
            <Route path="/" element={<UserGroup />} />
            {/* <Route
              path="/user"
              element={
                <PrivateRoute>
                  <Form />
                </PrivateRoute>
              }
            />
            <Route
              path="/userPanel"
              element={
                <PrivateRoute>
                  <UserPanel />
                </PrivateRoute>
              }
            />
            <Route
              path="/userGroup"
              element={
                <PrivateRoute>
                  <UserGroup />
                </PrivateRoute>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;