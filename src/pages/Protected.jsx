import { useEffect } from "react";
import { useAuth } from "../contexts/authcontext";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export default Protected;
