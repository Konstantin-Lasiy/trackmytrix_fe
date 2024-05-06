import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { AxiosError } from "axios";

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
  date: string;
  wing: string;
  tricks: TrickInstance[];
}

const calcStats = (
  tricks: TrickInstance[] | undefined
): Record<
  string,
  { count: number; successes: number; success_rate?: number }
> => {
  const stats: Record<
    string,
    { count: number; successes: number; success_rate?: number }
  > = {};

  tricks?.forEach((trick) => {
    const trickName = trick.trick_definition.name;

    // Initialize the stats object for trickName if it doesn't exist
    if (!stats[trickName]) {
      stats[trickName] = { count: 0, successes: 0, success_rate: 0 };
    }

    // Increment count
    stats[trickName].count += 1;

    // Increment successes if the trick was successful
    if (trick.successful) {
      stats[trickName].successes += 1;
    }
  });

  // Calculate success rates
  Object.keys(stats).forEach((key) => {
    if (stats[key].count > 0) {
      // Ensure we do not divide by zero
      stats[key].success_rate = Math.round(
        (stats[key].successes / stats[key].count) * 100
      );
    }
  });
  return stats;
};
const RunSummary: React.FC = () => {
  const { id } = useParams();
  const axiosPrivateInstance = useAxiosPrivate();
  const [runData, setRunData] = useState<RunData>();
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchRundata = async () => {
      try {
        const response = await axiosPrivateInstance.get("api/runs/" + id, {
          withCredentials: true,
        });
        const delay = 1000;
        if (import.meta.env.VITE_DELAY_REQUESTS == "true") {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        setRunData(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error?.response?.status);
          if (error?.response?.status == 403) {
            setError("403");
          }
        }
        console.error("Failed to fetch Run", error);
      }
    };

    fetchRundata();
  }, [axiosPrivateInstance, id]);
  const stats = calcStats(runData?.tricks);
  const fabStyle = {
    position: "absolute",
    bottom: 100,
    right: 16,
  };
  if (error == "403") return <> NOT YOUR RUN </>;
  const skeletons = [];
  for (let i = 0; i < 3; i++) {
    skeletons.push(<Skeleton height={40} />);
  }
  return (
    <Grid sx={{ padding: "20px", pt: 0 }}>
      <h1>Run {runData ? runData.date : ""}</h1>
      {runData ? (
        <>
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 200 }} aria-label="tricks stats table">
              <TableHead>
                <TableRow>
                  <TableCell>Trick</TableCell>
                  <TableCell align="right">Count</TableCell>
                  <TableCell align="right">Success %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(stats).map(([trick, stat], index) => (
                  <TableRow
                    key={index}
                    sx={{ "&last-child td, &last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {trick}
                    </TableCell>
                    <TableCell align="right">{stat["count"]}</TableCell>
                    <TableCell align="right">{stat["success_rate"]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <h3> Run Detail</h3>
          <ul>
            {runData.tricks.map((trick, index) => (
              <li key={index}>
                {trick.trick_definition.name},{" "}
                {trick.successful ? <CheckBox /> : "X"}
              </li>
            ))}
          </ul>
        </>
      ) : (
        skeletons
      )}

      <Fab
        component={Link}
        to="/createrun"
        sx={{
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

export default RunSummary;
