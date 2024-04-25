import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useCallback } from "react";
// import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export default function useUser() {
  const { setUser } = useAuth();
  // const [loading, setLoading] = useState(true);
  const axiosPrivateInstance = useAxiosPrivate();

  const getUser = useCallback(async () => {
    try {
      const { data } = await axiosPrivateInstance.get("auth/user");
      setUser(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access - 401 error");
          throw(error);
        } else {
          console.log("Other error", error.response?.status);
          throw(error);
        }
      } else {
        console.error("Error occurred that is not an axios error:", error);
      }
    }
  }, [setUser, axiosPrivateInstance]);

  return getUser;
}
