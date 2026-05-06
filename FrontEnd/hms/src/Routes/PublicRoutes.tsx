import { jwtDecode } from "jwt-decode";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const reduxToken = useSelector((state: any) => state.jwt);
  const token = reduxToken || localStorage.getItem("token");

  if (token) {
    try {
      const user: any = jwtDecode(token);
      const role = user?.role?.toLowerCase();

      return <Navigate to={`/${role}/dashboard`} replace />;
    } catch (error) {
      console.log("Invalid token");
      localStorage.removeItem("token");
      return children;
    }
  }

  return children;
};

export default PublicRoute;