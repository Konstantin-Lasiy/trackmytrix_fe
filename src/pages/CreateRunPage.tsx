import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Trick, TrickSquare, TimelineTrick } from "../components/TrickSquare";
import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./CreateRunPage.css";
import axios from "axios";
import useTrickDefinitions from "../hooks/useTrickDefinitions";
import { styled } from "@mui/material/styles";

const StyledToggleButton = styled(ToggleButton)(() => ({
  width: "100px",
  "&.Mui-disabled": {
    "& .MuiTypography-root": {
      opacity: 0.15, // Setting opacity to show the button is disabled but keep text more readable
    },
  },
})) as typeof ToggleButton;

interface TrickModifierProps {
  trick: Trick;
  toggleOrientation: (trick: Trick) => void;
  toggleReverse: (trick: Trick) => void;
  toggleTwisted: (trick: Trick) => void;
  toggleSuccessful: (trick: Trick) => void;
  addTrickToHistory: (trick: Trick) => void;
}

const TrickAddition: React.FC<TrickModifierProps> = ({
  trick,
  toggleOrientation,
  toggleReverse,
  toggleTwisted,
  toggleSuccessful,
  addTrickToHistory,
}) => {
  const [isRight, setIsRight] = useState(trick.right);
  const [isReverse, setIsReverse] = useState(trick.reverse);
  const [isTwisted, setIsTwisted] = useState(trick.twisted);
  const [isSuccessful, setIsSuccessful] = useState(trick.successful);
  const handleToggle = (property: keyof Trick) => {
    switch (property) {
      case "right":
        toggleOrientation(trick);
        setIsRight((prev_right) => !prev_right);
        break;
      case "reverse":
        toggleReverse(trick);
        setIsReverse((prev_reverse) => !prev_reverse);
        break;
      case "twisted":
        toggleTwisted(trick);
        setIsTwisted((prev_twisted) => !prev_twisted);
        break;
      case "successful":
        toggleSuccessful(trick);
        setIsSuccessful((prev_successful) => !prev_successful);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "100vw",
        alignItems: "left",
        marginBottom: "10px",
      }}
    >
      <TrickSquare
        trick={trick}
        onClick={() => addTrickToHistory(trick)}
        sx={{
          minWidth: "80px", // Increased from the default size
          height: "80px", // Increased from the default size
          fontSize: "1rem", // Increase font size if needed
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          marginLeft: "1px",
          flexWrap: "wrap",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <ToggleButtonGroup fullWidth>
          <Button
            variant="outlined"
            onClick={() => handleToggle("right")}
            sx={{
              width: "25%",
              borderRadius: "0",
              bordercolor: "grey",
            }}
            {...(!trick.has_orientation ? { disabled: true } : {})}
          >
            {isRight ? "Right" : "Left"}
          </Button>
          <StyledToggleButton
            value="successful"
            selected={trick.successful}
            onChange={() => handleToggle("successful")}
            sx={{
              width: "25%",
            }}
          >
            <Typography
              sx={{
                textDecoration: isSuccessful ? "inherit" : "line-through",
              }}
            >
              Success
            </Typography>
          </StyledToggleButton>
          <StyledToggleButton
            value="reverse"
            selected={trick.reverse}
            onChange={() => handleToggle("reverse")}
            sx={{
              width: "25%",
            }}
            {...(trick.reverse_bonus == 0 ? { disabled: true } : {})}
          >
            <Typography
              sx={{
                textDecoration: isReverse ? "inherit" : "line-through",
              }}
            >
              Reverse
            </Typography>
          </StyledToggleButton>
          <StyledToggleButton
            value="twisted"
            selected={trick.twisted}
            onChange={() => handleToggle("twisted")}
            sx={{
              width: "25%",
            }}
            {...(trick.twisted_bonus == 0 ? { disabled: true } : {})}
          >
            <Typography
              sx={{
                textDecoration: isTwisted ? "inherit" : "line-through",
              }}
            >
              Twisted
            </Typography>
          </StyledToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

interface TrickTimelineProps {
  tricks: TimelineTrick[];
  onDelete: (timeline_id: string) => void;
}

const TrickTimeline: React.FC<TrickTimelineProps> = ({ tricks, onDelete }) => {
  const dummy = useRef<HTMLDivElement>(null);
  const prevTimelineLength = useRef<number>(tricks.length);

  useEffect(() => {
    if (dummy.current && prevTimelineLength.current < tricks.length) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
    prevTimelineLength.current = tricks.length;
  }, [tricks.length]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        whiteSpace: "nowrap",
        maxWidth: "100%", // Ensure the container does not grow beyond the viewport width
        flexWrap: "nowrap",
        "& > *": { flex: "0 0 auto" }, // Prevents flex items from shrinking
        height: "80px", // Fixed height to prevent vertical expansion
        mt: 2,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        justifyContent: "left", // Start squares on the left of the screen
        backgroundColor: "white",
      }}
    >
      {tricks.length > 0 ? (
        tricks.map((trick) => (
          <TrickSquare
            key={trick.timeline_id}
            trick={trick}
            onDelete={() => onDelete(trick.timeline_id)}
          />
        ))
      ) : (
        <Box sx={{ mx: "left" }}>Click On a Trick to Add to Timeline</Box>
      )}
      <div ref={dummy} />
    </Box>
  );
};

interface AvailableTrickListProps {
  tricks: Trick[];
  toggleProperty: (property: keyof Trick) => (trick: Trick) => void;
  addTrickToHistory: (trick: Trick) => void;
}

const AvailableTrickList: React.FC<AvailableTrickListProps> = ({
  tricks,
  toggleProperty,
  addTrickToHistory,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      {tricks.map((trick) => (
        <Box key={trick.id} sx={{ gap: "1px" }}>
          <TrickAddition
            trick={trick}
            toggleOrientation={toggleProperty("right")}
            toggleReverse={toggleProperty("reverse")}
            toggleTwisted={toggleProperty("twisted")}
            toggleSuccessful={toggleProperty("successful")}
            addTrickToHistory={addTrickToHistory}
          />
        </Box>
      ))}
    </Box>
  );
};

const TrickManagement: React.FC = () => {
  const { trickDefinitions, isLoading, setTrickDefinitions } =
    useTrickDefinitions();
  const [trickTimeline, setTrickTimeline] = useState<TimelineTrick[]>([]);
  const [addCount, setAddCount] = useState(0);

  const deleteTrickFromHistory = (timeline_id: string) => {
    setTrickTimeline(
      trickTimeline.filter((trick) => trick.timeline_id !== timeline_id)
    );
  };
  if (isLoading) return <p>Loading tricks...</p>;

  const toggleProperty = (property: keyof Trick) => (trick: Trick) => {
    const updatedTricks = trickDefinitions.map((t) => {
      if (t.id === trick.id) {
        return { ...t, [property]: !t[property] };
      }
      return t;
    });
    setTrickDefinitions(updatedTricks);
  };
  if (isLoading) return <p>Loading tricks...</p>;
  const addTrickToHistory = (trickToAdd: Trick) => {
    const uniqueId = `${trickToAdd.id}-${addCount}`; // Create a unique ID using a counter
    const newTrick: TimelineTrick = { ...trickToAdd, timeline_id: uniqueId };
    setTrickTimeline((prev) => [...prev, newTrick]);
    setAddCount(addCount + 1); // Increment the counter
  };

  interface submitButtonProps {
    tricks: TimelineTrick[];
  }
  const SubmitButton: React.FC<submitButtonProps> = ({ tricks }) => {
    const axiosPrivateInstance = useAxiosPrivate();
    console.log(tricks);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredTricks = tricks.map(
      ({ id, right, reverse, twisted, successful }) => ({
        id,
        right,
        reverse,
        twisted,
        successful,
      })
    );
    const handleSubmit = async () => {
      if (tricks.length === 0) {
        alert("Please add a trick to your timeline");
        return;
      }

      try {
        const response = await axiosPrivateInstance.post("api/upload_tricks/", {
          filteredTricks,
        });
        if (response.status === 200 || response.status === 201) {
          console.log("Success", response.data);
          alert("Submitted successfully");
        } else {
          throw new Error(response.data?.message || "Something went wrong");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error", error.response);
          alert(
            "Failed to submit: " +
              (error.response?.data.message || "unknown error occurred")
          );
        } else if (error instanceof Error) {
          console.error("Error", error);
          alert("Failed to submit: " + error.message);
        } else {
          console.error("Unknown Error", error);
          alert("Failed to submit: unknown error occured.");
        }
      }
    };

    return (
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          left: "0",
          right: 0,
          bottom: 0,
          height: 60,
          borderRadius: 0,
          width: "100%" /* Full width */,
          zIndex: 1500 /* Ensures it stays on top */,
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    );
  };
  return (
    <>
      <TrickTimeline tricks={trickTimeline} onDelete={deleteTrickFromHistory} />
      <AvailableTrickList
        tricks={trickDefinitions}
        toggleProperty={toggleProperty}
        addTrickToHistory={addTrickToHistory}
      />
      <SubmitButton tricks={trickTimeline} />
    </>
  );
};

const CreateRun: React.FC = () => {
  return (
    <>
      <TrickManagement />
    </>
  );
};

export default CreateRun;
