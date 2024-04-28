import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

interface Run {
  wing: string;
  date: string;
  time: string;
  site: string;
  length: number;
}

const ProfilePage: React.FC = () => {
  const axios = useAxiosPrivate();
  const [runs, setRuns] = useState<Run[]>();
  useEffect(() => {
    const getRuns = async () => {
      try {
        const runs = await axios.get<Run[]>("/api/runs");
        setRuns(runs.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to fetch runs:", error);
        }
      } finally {
       // setLoading(false);
      }
    };
    getRuns();
  }, [axios]);

  const congratsMessage = (
    <div>
      Congrats, you've done {runs?.length} runs! <br></br>
      But can you do a Super stall to infinite yet?
    </div>
  );
  return <div>{runs ? congratsMessage : "loading"}</div>;
};

export default ProfilePage;
