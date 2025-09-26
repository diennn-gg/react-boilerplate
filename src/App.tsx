import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import AdminPage from "./pages/Admin";
import ForbiddenPage from "./pages/Forbidden";
import NotFoundPage from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchCurrentUser } from "./store/slices/authSlice";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading, initialized } = useAppSelector((s) => s.auth);
  if (!initialized || loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const RoleBasedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: string[];
}) => {
  const { user, loading, initialized } = useAppSelector((s) => s.auth);
  if (!initialized || loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/403" replace />;
  return children;
};

export default function App() {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector((s) => s.auth);
  
  useEffect(() => {
    // Only fetch current user if not initialized yet
    if (!initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route
            path="admin"
            element={
              <RoleBasedRoute roles={["admin"]}>
                <AdminPage />
              </RoleBasedRoute>
            }
          />
          <Route path="403" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
