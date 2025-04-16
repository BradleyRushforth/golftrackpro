import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import SessionTimeout from "../shared/Auth/components/sessionTimeout/sessionTimeout";

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        localStorage.setItem("loginTime", Date.now().toString());
      } else {
        localStorage.removeItem("loginTime");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider value={user}>
      {user && <SessionTimeout />}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
