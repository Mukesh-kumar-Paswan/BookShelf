import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import SingleBookLoader from "../Loader/SingleBookLoader";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <SingleBookLoader />
    );
  }

  return <div>{isLoggedIn ? children : <Navigate to="/login" />}</div>;
};

export default ProtectedRoute;
