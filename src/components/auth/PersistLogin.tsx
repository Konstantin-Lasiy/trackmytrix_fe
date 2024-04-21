import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import { AxiosError } from "axios";

export default function PersistLogin() {
  const refresh = useRefreshToken();
  const { accessToken, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    async function verifyUser() {
      try {
        await refresh();
        const { data } = await axiosPrivate.get("auth/user");
        setUser(data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error?.response);
        }
      } finally {
        isMounted && setLoading(false);
      }
    }

    !accessToken ? verifyUser() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, [accessToken, axiosPrivate, refresh, setUser]);

  return loading ? "Loading" : <Outlet />;
}
