import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("token");

      notification.success({
        message: "Successfull logout!",
        description: "You have succesfully logged out!",
      });
    } catch (error) {
      notification.error({
        message: "Failed to logout",
        description: "Something went wrong!",
      });
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
