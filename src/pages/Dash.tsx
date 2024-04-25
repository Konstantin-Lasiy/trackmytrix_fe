import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_API_BACKEND;

interface WeightData {
  date: string;
  weight: number; //
}

const Dash: React.FC = () => {
  const axiosPrivateInstance = useAxiosPrivate();
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  useEffect(() => {
    const fetchWeightdata = async () => {
      try {
        const response = await axiosPrivateInstance.get(
          BACKEND_URL + "api/weight-entries/",
          {
            withCredentials: true,
          }
        );
        setWeightData(response.data);
      } catch (error) {
        console.error("Failed to fetch daily weights", error);
      }
    };

    fetchWeightdata();
  }, [axiosPrivateInstance]);
  const fabStyle = {
    position: "absolute",
    bottom: 100,
    right: 16,
  };
  const fab = {
    sx: fabStyle,
  };

  return (
    <div>
      <h1>Daily Weight Tracker</h1>
      {weightData.length > 0 ? (
        <ul>
          {weightData.map((entry, index) => (
            <li key={index}>
              Date: {entry.date}, Weight: {entry.weight} kg
            </li>
          ))}
        </ul>
      ) : (
        <p>No weight data available.</p>
      )}

      <Fab sx={fab.sx} color="primary" aria-label="add">
        <NavLink to="/createrun" style={{ textDecoration: "none" }}>
          <AddIcon />
        </NavLink>
      </Fab>
    </div>
  );
};

export default Dash;
