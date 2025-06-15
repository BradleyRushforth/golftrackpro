import {
  TextField,
  Typography,
  Box,
  useMediaQuery,
  IconButton,
  useTheme,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React from "react";

interface IDateInputWithPlaceholderProps {
  value: string;
  onChange: any;
  name: string;
}

export const DateInputWithPlaceholder: React.FC<
  IDateInputWithPlaceholderProps
> = ({ value, onChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box position="relative" width="100%">
      <TextField
        type="date"
        value={value}
        onChange={onChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{
          input: {
            color: value ? "#fff" : "transparent",
            WebkitTextFillColor: value ? "#fff" : "transparent",
            caretColor: value ? "#fff" : "transparent", // Hide cursor if no value
            "&:hover": {
              color: value ? "#fff" : "transparent",
              WebkitTextFillColor: value ? "#fff" : "transparent",
            },
            "&:focus": {
              color: value ? "#fff" : "transparent",
              WebkitTextFillColor: value ? "#fff" : "transparent",
            },
          },
          "& .MuiInputBase-input": {
            fontFamily: '"Inter Variable", sans-serif',
          },
          "& .MuiInputLabel-root": {
            fontFamily: '"Inter Variable", sans-serif',
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: isMobile ? "#ffffff" : "",
          },
        }}
      />
      {isMobile ? (
        <IconButton
          sx={{
            position: "absolute",
            left: 0,
            top: 4,
            pointerEvents: "none",
            color: "#777",
            fontSize: "0.875rem",
            userSelect: "none",
            "& .MuiInputBase-input": {
              fontFamily: '"Inter Variable", sans-serif',
            },
            "& .MuiInputLabel-root": {
              fontFamily: '"Inter Variable", sans-serif',
            },
          }}
        >
          <DateRangeIcon />
        </IconButton>
      ) : (
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            left: 14,
            top: 20,
            pointerEvents: "none",
            color: "#777",
            fontSize: "0.875rem",
            userSelect: "none",
          }}
        >
          dd/mm/yyyy
        </Typography>
      )}
    </Box>
  );
};
