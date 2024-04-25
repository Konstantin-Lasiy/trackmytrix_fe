import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { AxiosError } from "axios";

export default function useUser() {
  const { setUser } = useAuth();
  const axiosPrivateInstance = useAxiosPrivate();

  async function getUser() {
    try {
      const { data } = await axiosPrivateInstance.get("auth/user");
      setUser(data);
    } catch (error: unknown) {
      // Change type to unknown for more secure type checking
      if (error instanceof AxiosError) {
        // Type guard to check if it is an AxiosError
        console.log(error.response);

        // Check for error response and status code
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access - 401 error");
          // Handle 401 error specifically
        } else {
          console.log("Other error", error.response?.status);
          // Handle other errors
        }
      } else {
        // Handle case where error is not an AxiosError
        console.error("Error occurred that is not an axios error:", error);
      }
    }
  }

  return getUser;
}
