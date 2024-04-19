import React, { useState, createContext, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

type Props = {
  children?: ReactNode;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  refreshToken: string | null;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
  csrftoken: string | null;
  setCSRFToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  refreshToken: null,
  setRefreshToken: () => {},
  csrftoken: null,
  setCSRFToken: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [csrftoken, setCSRFToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        csrftoken,
        setCSRFToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
