import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  // eslint-disable-next-line react/prop-types
  const { value } = props;
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} size={140} color="success" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic(props) {
  const [progress, setProgress] = React.useState(10);
  const { handleComplated } = props;

  CircularStatic.propTypes = {
    handleComplated: PropTypes.func.isRequired,
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          handleComplated();
          return 100;
        }
        return prevProgress + 10;
      });
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}
