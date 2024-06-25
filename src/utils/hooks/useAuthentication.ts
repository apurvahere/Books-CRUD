import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthentication = (isAuthenticated: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthentication;
