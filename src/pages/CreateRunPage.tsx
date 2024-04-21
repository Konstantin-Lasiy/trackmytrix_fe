import { useState } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import { Trick, TrickSquare, TimelineTrick } from "../components/TrickSquare";
import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./CreateRunPage.css";

const availableTricks: Trick[] = [
  {
    id: 1,
    name: "Heli",
    right: true,
    reverse: false,
    twisted: false,
    successful: true,
  },
  {
    id: 2,
    name: "MacTwist",
    right: true,
    reverse: false,
    twisted: false,
    successful: true,
  },
  {
    id: 3,
    name: "Cork",
    right: true,
    reverse: false,
    twisted: false,
    successful: false,
  },
  {
    id: 4,
    name: "SS2I",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 5,
    name: "Misty",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 6,
    name: "Joker",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 7,
    name: "Full Stall",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 8,
    name: "Twister",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 9,
    name: "Twisty Twist",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 10,
    name: "Rhythmic",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 11,
    name: "SAT",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 12,
    name: "Spiral",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 13,
    name: "SAT2Heli",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 14,
    name: "Wingover",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 15,
    name: "Heli2SAT",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 16,
    name: "Tumble",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
  {
    id: 17,
    name: "Misty2Tumble",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },

  {
    id: 18,
    name: "Booster",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },

  {
    id: 19,
    name: "Loop",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },

  {
    id: 20,
    name: "Asymmetric Spiral",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },

  {
    id: 21,
    name: "Asymmetric SAT",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },

  {
    id: 22,
    name: "Dynamic Stall",
    right: true,
    reverse: false,
    twisted: true,
    successful: true,
  },
];

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
    console.log(property);
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
          >
            {isRight ? "Right" : "Left"}
          </Button>
          <ToggleButton
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
          </ToggleButton>
          <ToggleButton
            value="reverse"
            selected={trick.reverse}
            onChange={() => handleToggle("reverse")}
            sx={{
              width: "25%",
            }}
          >
            <Typography
              sx={{
                textDecoration: isReverse ? "inherit" : "line-through",
              }}
            >
              Reverse
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="twisted"
            selected={trick.twisted}
            onChange={() => handleToggle("twisted")}
            sx={{
              width: "25%",
            }}
          >
            <Typography
              sx={{
                textDecoration: isTwisted ? "inherit" : "line-through",
              }}
            >
              Twisted
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

interface TrickTimelineProps {
  tricks: TimelineTrick[];
}

const TrickTimeline: React.FC<TrickTimelineProps> = ({ tricks }) => {
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
        tricks.map((trick) => <TrickSquare key={trick.id} trick={trick} />)
      ) : (
        <Box sx={{ mx: "left" }}>Click On a Trick to Add to Timeline</Box>
      )}
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
  const [tricks, setTricks] = useState<Trick[]>(availableTricks);
  const [trickTimeline, setTrickTimeline] = useState<TimelineTrick[]>([]);
  const [addCount, setAddCount] = useState(0); // Counter for unique keys

  const toggleProperty = (property: keyof Trick) => (trick: Trick) => {
    const updatedTricks = tricks.map((t) => {
      if (t.id === trick.id) {
        return { ...t, [property]: !t[property] };
      }
      return t;
    });
    setTricks(updatedTricks);
  };

  const addTrickToHistory = (trickToAdd: Trick) => {
    const uniqueId = `${trickToAdd.id}-${addCount}`; // Create a unique ID using a counter
    const newTrick: TimelineTrick = { ...trickToAdd, id: uniqueId };
    setTrickTimeline((prev) => [newTrick, ...prev]);
    setAddCount(addCount + 1); // Increment the counter
  };

  interface submitButtonProps {
    tricks: TimelineTrick[];
  }
  const SubmitButton: React.FC<submitButtonProps> = ({ tricks }) => {
    return (
      <Button
        className="submit-button"
        variant="contained"
        onClick={() => console.log(tricks)}
      >
        Submit
      </Button>
    );
  };
  return (
    <>
      <TrickTimeline tricks={trickTimeline} />
      <AvailableTrickList
        tricks={tricks}
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
