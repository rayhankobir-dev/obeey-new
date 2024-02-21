/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleLoginModal, handleOtpModal } from "@/redux/actions/modal.action";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: any) => {
  const { loading, isAuth }: any = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !loading) {
      handleLoginModal(true);
      navigate("/", { replace: true });
    }
  }, []);

  return children;
};

export const PrivateRoute = ({ children, ...rest }: any) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  return (
    <Route {...rest}>
      {!isAuthenticated ? <Navigate to="/login" /> : children}
    </Route>
  );
};

export default ProtectedRoute;
