import {
  BrowserRouter as Router,
  Routes as ReactRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <ReactRoutes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* صفحات محافظت شده */}
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
