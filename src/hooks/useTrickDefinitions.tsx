import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { Trick } from "../components/TrickSquare";

const useTrickDefinitions = () => {
  const axiosPrivateInstance = useAxiosPrivate();
  const [trickDefinitions, setTrickDefinitions] = useState<Trick[]>([]); // Assuming trickDefinitions is an array
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  function isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
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
        loaded_tricks.sort((a, b) => {
          // Convert 'last_used' to a timestamp, or to a very old date if invalid
          const timeA = a.last_used
            ? isValidDate(a.last_used)
              ? new Date(a.last_used).getTime()
              : new Date("1900-01-01").getTime()
            : 0;
          const timeB = b.last_used
            ? isValidDate(b.last_used)
              ? new Date(b.last_used).getTime()
              : new Date("1900-01-01").getTime()
            : 0;

          return timeB - timeA; // Sort descending
        });

        setTrickDefinitions(loaded_tricks);
        console.log(loaded_tricks);
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
