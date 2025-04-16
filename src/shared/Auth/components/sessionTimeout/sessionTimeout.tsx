import { useEffect } from "react";
import { getAuth, signOut } from "@firebase/auth";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

const SessionTimeout = () => {
  const auth = getAuth();

  useEffect(() => {
    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        console.log("You have been logged out due to inactivity.");
        signOut(auth);
      }, INACTIVITY_TIMEOUT);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    );
    resetInactivityTimer();

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      );
    };
  }, [auth]);

  return null;
};

export default SessionTimeout;
