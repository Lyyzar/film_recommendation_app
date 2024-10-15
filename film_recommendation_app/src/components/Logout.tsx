import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      alert("User signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="underline underline-offset-1 hover:underline-offset-2"
    >
      Log Out
    </button>
  );
};

export default Logout;
