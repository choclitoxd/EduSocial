import {Routes, BrowserRouter, Route} from "react-router-dom"; 
import {Form} from './components/pages/form';
import { User } from "./components/pages/userPage";
import { UserPanel } from "./components/pages/userPanel";
import { UserGroup } from "./components/pages/userGroup";
import { AuthProvider } from "./context/AuthContext";
import { UserMessage } from "./components/pages/userMessage";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { ModeratorUser } from "./components/pages/moderatorUser";
import { ModeratorGraph } from "./components/pages/ModeratorGraph";
import { ModeratorPost } from "./components/pages/moderatorPost";
import { ModeratorReport } from "./components/pages/ModeratorReport";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="main-div-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/login" element={<Form />} />
            <Route path="/user" element={<UserPanel />} />
            <Route path="/group" element={<UserGroup />} />
            <Route path="/message" element={<UserMessage />} />
            <Route path="/moderator/users" element={
              <PrivateRoute>
                <ModeratorUser />
              </PrivateRoute>
            } />
            <Route path="/moderator/posts" element={
              <PrivateRoute>
                <ModeratorPost />
              </PrivateRoute>
            } />
            <Route path="/moderator/graph" element={
              <PrivateRoute>
                <ModeratorGraph />
              </PrivateRoute>
            } />
            <Route path="/moderator/reports" element={
              <PrivateRoute>
                <ModeratorReport />
              </PrivateRoute>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;