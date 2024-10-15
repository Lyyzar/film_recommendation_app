import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CheckAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const token = localStorage.getItem("token");
      if (user && !token) {
        console.log("Token missing. Redirecting to login page...");
        navigate("/signin");
      } else if (!user) {
        console.log("No user authenticated. Redirecting to login page...");
        navigate("/signin");
      }
    });
  }, [auth, history]);

  return null;
};

export default CheckAuth;
