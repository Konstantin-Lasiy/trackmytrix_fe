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
} from "@mui/material";
import Paper from "@mui/material/Paper";

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

const calcStats = (tricks: TrickInstance[]): Record<string, number> => {
  const trickCounts: Record<string, number> = {};
  tricks.forEach((trick) => {
    const trickName = trick.trick_definition.name;
    trickCounts[trickName] = (trickCounts[trickName] || 0) + 1;
  });
  return trickCounts;
};

const RunSummary: React.FC = () => {
  const { id } = useParams();
  const axiosPrivateInstance = useAxiosPrivate();
  const [runData, setRunData] = useState<RunData>({
    date: "0",
    wing: "",
    tricks: [],
  });
  useEffect(() => {
    const fetchRundata = async () => {
      try {
        const response = await axiosPrivateInstance.get("api/runs/" + id, {
          withCredentials: true,
        });
        setRunData(response.data);
      } catch (error) {
        console.error("Failed to fetch Run", error);
      }
    };

    fetchRundata();
  }, [axiosPrivateInstance, id]);
  const stats = calcStats(runData.tricks);
  console.log("runData: ", runData);
  const fabStyle = {
    position: "absolute",
    bottom: 100,
    right: 16,
  };

  return (
    <Grid sx={{ padding: "20px", pt: 0 }}>
      <h1>Run {runData ? runData.date: "loading"}</h1>
      {runData ? (
        <>
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 200 }} aria-lable="tricks stats table">
              <TableHead>
                <TableRow>
                  <TableCell>Trick</TableCell>
                  <TableCell align="right">Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(stats).map(([key, value], index) => (
                  <TableRow
                    key={index}
                    sx={{ "&last-child td, &last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
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

export default RunSummary;
