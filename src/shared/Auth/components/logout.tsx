import React from "react";
import { logoutUser } from "../services/authService";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("User logged out!");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
