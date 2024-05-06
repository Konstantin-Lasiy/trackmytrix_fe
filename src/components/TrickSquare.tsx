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
  last_used?: string;
}

export interface TimelineTrick extends Trick {
  timeline_id: string;
}

interface TrickSquareProps {
  trick: Trick | TimelineTrick;
  onClick?: () => void;
  onDelete?: () => void;
  sx?: SxProps<Theme>;
  small_sx?: object;
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
  textWrap: "wrap",
})) as typeof Box;

const littleCircleStyles = {
  width: "15%",
  height: "15%",
  borderRadius: "50%",
  backgroundColor: "#201658",
  padding: "5%",
  color: "white",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center", // Center content vertically
  textAlign: "center",
  justifyContent: "center", // Center content horizontally
};

const offset = "-9%";

export const TrickSquare: React.FC<TrickSquareProps> = ({
  trick,
  onClick,
  onDelete,
  sx,
  small_sx,
}) => {
  return (
    <TrickBox
      sx={{
        background: trick.successful
          ? "linear-gradient(-39deg, #4991f8 0%, #4bc1ff 0%)"
          : "linear-gradient(-39deg, #ff4a4a 0%, #ff7f7f 80%)",
        textAlign: "center",
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
            ...small_sx,
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
            width: "25%",
            height: "25%",
          }}
        >
          <CloseIcon sx={{ color: "white", fontSize: 13 }} />
        </Button>
      )}
    </TrickBox>
  );
};
