import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/system";

interface BaseTrick {
  name: string;
  right: boolean;
  reverse: boolean;
  twisted: boolean;
  successful: boolean;
}

export interface Trick extends BaseTrick {
  id: number;
}

export interface TimelineTrick extends BaseTrick {
  id: string;
}

interface TrickSquareProps {
  trick: Trick | TimelineTrick;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}
export const TrickSquare: React.FC<TrickSquareProps> = ({
  trick,
  onClick,
  sx,
}) => {
  const offset = "-9%";
  const littleCircleStyles = {
    width: "30%",
    height: "30%",
    borderRadius: "50%",
    backgroundColor: "#201658",
    padding: "5%",
    color: "white",
    fontSize: "0.7rem",
    boxShadow: '0 0 0 2px #fff',
    display: "flex",
    alignItems: "center",  // Center content vertically
    justifyContent: "center",  // Center content horizontally
  }
  return (
    <Box
      sx={{
        position: "relative",
        width: "50px",
        height: "50px",
        borderRadius: "5%", // Fully rounded
        borderColor: "black",
        borderStyle: "solid",
        boxShadow: 3,
        borderWidth: "1px",
        backgroundColor: trick.successful ? "#2a9d85" : "#db504a",
        margin: "5px",
        minWidth: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        color: "white",
        overflow: "visible",
        cursor: "pointer", // Indicating it's clickable
        ...sx, // Optional
      }}
      onClick={onClick}
    >
      <div>{trick.name}</div>
      <Box
        component="span"
        sx={{
          position: "absolute",
          top: offset,
          left: offset,
          ...littleCircleStyles,
        }}
      >
        {trick.right === true ? "R" : "L"}
      </Box>
      {trick.reverse && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            bottom: offset,
            left: offset,
            ...littleCircleStyles,
          }}
        >
          Rev
        </Box>
      )}
      {trick.twisted && (
        <Box
          component="span"
          sx={{
            position: "absolute",
            bottom: offset,
            right: offset,
            ...littleCircleStyles,
          }}
        >
          T
        </Box>
      )}
    </Box>
  );
};
