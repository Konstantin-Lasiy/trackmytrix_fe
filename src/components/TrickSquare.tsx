import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/system";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./TrickSquare.css";
import { styled } from "@mui/material/styles";

export interface Trick {
  name: string;
  id: number;
  right: boolean;
  reverse: boolean;
  twisted: boolean;
  successful: boolean;
  has_orientation: boolean;
  cab_slide_bonus: number;
  description: "";
  devil_twist_bonus: number;
  devil_twist_stall_bonus: number;
  double_flipped_bonus: number;
  flipped_bonus: number;
  full_twisted_bonus: number;
  hardcore_enty_bonus: number;
  restrictions: [];
  reverse_bonus: number;
  technical_coefficient: number;
  twisted_bonus: number;
  twisted_exit_bonus: number;
}

export interface TimelineTrick extends Trick {
  timeline_id: string;
}

interface TrickSquareProps {
  trick: Trick | TimelineTrick;
  onClick?: () => void;
  onDelete?: () => void;
  sx?: SxProps<Theme>;
}

const TrickBox = styled(Box)(() => ({
  position: "relative",
  width: "50px",
  height: "50px",
  borderRadius: "5%", // Fully rounded
  borderColor: "black",
  borderStyle: "solid",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
  borderWidth: "1px",
  margin: "5px",
  minWidth: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "12px",
  color: "white",
  overflow: "visible",
  cursor: "pointer",
})) as typeof Box;

const littleCircleStyles = {
  width: "30%",
  height: "30%",
  borderRadius: "50%",
  backgroundColor: "#201658",
  padding: "5%",
  color: "white",
  fontSize: "0.7rem",
  boxShadow: "0 0 0 2px #fff",
  display: "flex",
  alignItems: "center", // Center content vertically
  justifyContent: "center", // Center content horizontally
};

const offset = "-9%";

export const TrickSquare: React.FC<TrickSquareProps> = ({
  trick,
  onClick,
  onDelete,
  sx,
}) => {
  return (
    <TrickBox
      sx={{
        backgroundColor: trick.successful ? "#2a9d85" : "#db504a",
        ...sx,
      }}
      onClick={onClick}
    >
      <div>{trick.name}</div>
      {trick.has_orientation && (
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
      )}

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
      {onDelete && (
        <Button
          className="delete-button"
          component="span"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            position: "absolute",
            top: offset,
            right: offset,
            minWidth: "auto",
            color: "white",
            backgroundColor: "rgba(0,0,0,1)",
            borderRadius: "50%",
            padding: "0.25em",
            width: "35%",
            height: "35%",
          }}
        >
          <CloseIcon fontSize="small" />
        </Button>
      )}
    </TrickBox>
  );
};
