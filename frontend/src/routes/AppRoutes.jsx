import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PersonalityDetails from "../pages/personality/PersonalityDetails";
import CreatePersonality from "../pages/personality/CreatePersonality";
import ChatPage from "../pages/chat/ChatPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

        <Route
          path="/personality/:id"
          element={
           <ProtectedRoute>
              <PersonalityDetails />
            </ProtectedRoute>
        }
      />

         <Route
           path="/personality/create"
           element={
           <ProtectedRoute>
           <CreatePersonality />
           </ProtectedRoute>
        }
      />

           <Route
             path="/chat/:id"
             element={
             <ProtectedRoute>
             <ChatPage />
             </ProtectedRoute>
         }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>

      

  );
}

export default AppRoutes;
