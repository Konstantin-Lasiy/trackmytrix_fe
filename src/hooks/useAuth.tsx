import { useContext, useDebugValue } from "react";
import AuthContext from "../store/auth-context";

export default function useAuth() {
  const context = useContext(AuthContext);
  useDebugValue(context.user, (user) => (user ? "Logged In" : "Logged Out"));
  return context;
}
