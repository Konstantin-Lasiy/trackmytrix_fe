import { useState } from "react";
import Button from "@mui/material/Button";

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      Clicked {count} times
    </Button>
  );
}

export default MyButton;
