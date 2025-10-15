import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </ReactRoutes>
    </Router>
  );
};

export default AppRoutes;
