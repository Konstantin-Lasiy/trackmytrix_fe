import useAuth from "./useAuth";
import { axiosPrivateInstance } from "../axios";

export default function useLogout() {
  const { setUser, setAccessToken, setCSRFToken } = useAuth();

  const logout = async () => {
    try {
      await axiosPrivateInstance.post("auth/logout");

      setAccessToken(null);
      setCSRFToken(null);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
}
