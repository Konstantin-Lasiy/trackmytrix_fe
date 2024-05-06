import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

interface TrickInstance {
  id: number;
  successful: boolean;
  right?: boolean;
  reverse?: boolean;
  twisted?: boolean;
  trick_definition: {
    name: string;
  };
}

interface RunData {
  id: number;
  user: string;
  date: string;
  wing: string;
  tricks: TrickInstance[];
}

const RunList: React.FC = () => {
  const axiosPrivateInstance = useAxiosPrivate();
  const [runData, setRunData] = useState<RunData[]>([]);
  useEffect(() => {
    const fetchRundata = async () => {
      try {
        const response = await axiosPrivateInstance.get("api/runs", {
          withCredentials: true,
        });
        setRunData(response.data);
      } catch (error) {
        console.error("Failed to fetch Runs", error);
      }
    };

    fetchRundata();
  }, [axiosPrivateInstance]);
  const fabStyle = {
    position: "absolute",
    bottom: 100,
    right: 16,
  };

  return (
    <Grid sx={{ padding: "20px", pt: 0 }}>
      <h1>
        {" "}
        {runData
          ? runData.length + " run" + (runData.length > 1 ? "s" : "")
          : "loading"}
      </h1>
      {runData ? (
        runData.map((run) => (
          <li key={run.id}>
            {" "}
            <Link to={`/runs/${run.id}`}>
              {" "}
              {run.tricks.length} : {run.user}{" "}
            </Link>
          </li>
        ))
      ) : (
        <p>Nothing Yet.</p>
      )}

      <Fab
        component={Link}
        to="/createrun"
        sx={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          ...fabStyle,
        }}
        color="primary"
        aria-label="add"
      >
        <AddIcon sx={{ color: "white" }} />
      </Fab>
    </Grid>
  );
};

export default RunList;
