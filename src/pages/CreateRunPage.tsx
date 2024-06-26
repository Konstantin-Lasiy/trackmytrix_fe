import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import * as React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Trick, TrickSquare, TimelineTrick } from "../components/TrickSquare";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Card,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import "./CreateRunPage.css";
import axios from "axios";
import useTrickDefinitions from "../hooks/useTrickDefinitions";
import { styled } from "@mui/material/styles";
import { StrictModeDroppable } from "../components/droppable/strick_droppable";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

const StyledToggleButton = styled(ToggleButton)(() => ({
  width: "100px",
  fontSize: "9px",
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
        padding: "0px",
        borderRadius: "0",
      }}
    >
      <TrickSquare
        trick={trick}
        onClick={() => addTrickToHistory(trick)}
        sx={{
          minWidth: "75px",
          height: "75px",
          fontSize: "0.8rem",
          fontFamily: "sans-serif"
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "1px",
          flexWrap: "wrap",
          overflow: "hidden",
          width: "100%",
          alignItems: "center",
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
              fontSize: "0.8rem",
              maxHeight: "75px",
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
              maxHeight: "75px",
            }}
          >
            <Typography
              sx={{
                textDecoration: isSuccessful ? "inherit" : "line-through",
                fontSize: "0.8rem",
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
              height: "75px",
              
            }}
            {...(trick.reverse_bonus == 0 ? { disabled: true } : {})}
          >
            <Typography
              sx={{
                textDecoration: isReverse ? "inherit" : "line-through",
                fontSize: "0.8rem",
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
              borderRadius: "0",
              maxHeight: "75px",
            }}
            {...(trick.twisted_bonus == 0 ? { disabled: true } : {})}
          >
            <Typography
              sx={{
                textDecoration: isTwisted ? "inherit" : "line-through",
                fontSize: "0.8rem",
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
      const scrollContainer = dummy.current.parentNode as HTMLElement; // Get the parent container

      if (scrollContainer) {
        // Calculate the left scroll offset for the dummy element
        const left = dummy.current.offsetLeft;
        const containerScrollWidth = scrollContainer.scrollWidth;
        const containerWidth = scrollContainer.clientWidth;

        // Only scroll if the dummy is not fully visible
        if (
          left + dummy.current.clientWidth >
          containerScrollWidth - containerWidth
        ) {
          // Scroll such that the dummy element is fully visible on the right
          scrollContainer.scrollTo({
            left: left + dummy.current.clientWidth - containerWidth,
            behavior: "smooth",
          });
        }
      }
    }
    prevTimelineLength.current = tricks.length;
  }, [tricks.length]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        maxWidth: "100%", // Ensure the container does not grow beyond the viewport width
        "& > *": { flex: "0 0 auto" }, // Prevents flex items from shrinking
        height: "80px", // Fixed height to prevent vertical expansion
        position: "sticky",
        top: 55,
        zIndex: 1000,
        borderRadius: "0",
        justifyContent: "left", // Start squares on the left of the screen
        backgroundColor: "white",
        alignItems: "center",
        padding: "0",
      }}
      elevation={6}
    >
      {tricks.length > 0 ? (
        tricks.map((trick) => (
          <TrickSquare
            key={trick.timeline_id}
            trick={trick}
            onDelete={() => onDelete(trick.timeline_id)}
            sx={{
              width: "50px",
              height: "50px",
              fontSize: "0.5rem",
              overflowWrap: "break-word",
            }}
            small_sx={{
              fontSize: "0.6rem",
            }}
          />
        ))
      ) : (
        <Box sx={{ mx: "left" }}>Click on a trick to add to timeline</Box>
      )}
      <div ref={dummy} />
    </Card>
  );
};

interface AvailableTrickListProps {
  tricks: Trick[];
  toggleProperty: (property: keyof Trick) => (trick: Trick) => void;
  addTrickToHistory: (trick: Trick) => void;
  setTrickDefinitions: (tricks: Trick[]) => void;
}
const reorderTricks = (
  tricks: Trick[],
  startIndex: number,
  endIndex: number
): Trick[] => {
  const result = Array.from(tricks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const AvailableTrickList: React.FC<AvailableTrickListProps> = ({
  tricks,
  toggleProperty,
  addTrickToHistory,
  setTrickDefinitions,
}) => {
  const [searchText, setSearchText] = useState("");
  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const updatedTricks = reorderTricks(
      tricks,
      result.source.index,
      result.destination.index
    );

    setTrickDefinitions(updatedTricks);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Filter tricks based on search text
  const filteredTricks = tricks.filter(
    (trick) => trick.name.toLowerCase().includes(searchText.toLowerCase()) // Adjust this to the appropriate property and comparison
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TextField
        variant="standard"
        placeholder="Search tricks..."
        value={searchText}
        onChange={handleSearchChange}
        sx={{
          marginBottom: "10px",
          fontSize: "16px",
          mt: "10px",
          size: "small",
          width: "100%",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClearSearch}
                edge="end"
                size="small"
                style={{
                  paddingRight: "10px",
                  visibility: searchText ? "visible" : "hidden",
                }} // Hide clear button when no text
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <StrictModeDroppable droppableId="droppable-trick-list">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "5px",
              gap: "2px",
            }}
          >
            {filteredTricks.map((trick, index) => (
              <Draggable
                key={trick.id.toString()}
                draggableId={trick.id.toString()}
                index={index}
              >
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TrickAddition
                      trick={trick}
                      toggleOrientation={toggleProperty("right")}
                      toggleReverse={toggleProperty("reverse")}
                      toggleTwisted={toggleProperty("twisted")}
                      toggleSuccessful={toggleProperty("successful")}
                      addTrickToHistory={addTrickToHistory}
                    />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

const TrickManagement: React.FC = () => {
  const { trickDefinitions, setTrickDefinitions } = useTrickDefinitions();
  const [trickTimeline, setTrickTimeline] = useState<TimelineTrick[]>([]);
  const [addCount, setAddCount] = useState(0);
  const navigate = useNavigate();

  const deleteTrickFromHistory = (timeline_id: string) => {
    setTrickTimeline(
      trickTimeline.filter((trick) => trick.timeline_id !== timeline_id)
    );
  };

  const toggleProperty = (property: keyof Trick) => (trick: Trick) => {
    const updatedTricks = trickDefinitions.map((t) => {
      if (t.id === trick.id) {
        return { ...t, [property]: !t[property] };
      }
      return t;
    });
    setTrickDefinitions(updatedTricks);
  };
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosPrivateInstance = useAxiosPrivate();
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
        setIsSubmitting(true);
        const response = await axiosPrivateInstance.post("api/upload_tricks/", {
          filteredTricks,
        });
        if (response.status === 200 || response.status === 201) {
          console.log("Success", response.data);
          if (response.data.run_id) {
            navigate("/runs/" + response.data.run_id);
          }
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
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          left: "0",
          right: 0,
          bottom: 0,
          height: 60,
          borderRadius: 0,
          width: "100%" /* Full width */,
          zIndex: 1500 /* Ensures it stays on top */,
        }}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    );
  };
  return (
    <>
      <TrickTimeline tricks={trickTimeline} onDelete={deleteTrickFromHistory} />
      <div className="run-container">
        <AvailableTrickList
          tricks={trickDefinitions}
          toggleProperty={toggleProperty}
          addTrickToHistory={addTrickToHistory}
          setTrickDefinitions={setTrickDefinitions}
        />
      </div>
      <SubmitButton tricks={trickTimeline} />
    </>
  );
};

const CreateRun: React.FC = () => {
  return (
    <div>
      <TrickManagement />
    </div>
  );
};

export default CreateRun;
