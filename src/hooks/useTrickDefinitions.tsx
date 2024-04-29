import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { Trick } from "../components/TrickSquare";

const useTrickDefinitions = () => {
  const axiosPrivateInstance = useAxiosPrivate();
  const [trickDefinitions, setTrickDefinitions] = useState<Trick[]>([]); // Assuming trickDefinitions is an array
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrickDefinitions = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivateInstance.get<Trick[]>(
          "/api/trick_definitions"
        );
        const loaded_tricks = response.data.map((trick) => ({
          ...trick,
          successful: true,
        }));
        setTrickDefinitions(loaded_tricks); // Ensure your API returns the data correctly formatted
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch trick definitions:", error);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrickDefinitions();
  }, [axiosPrivateInstance]);

  return { trickDefinitions, setTrickDefinitions, isLoading, error };
};

export default useTrickDefinitions;
