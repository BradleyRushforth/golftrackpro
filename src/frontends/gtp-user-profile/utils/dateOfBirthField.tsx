import React from "react";
import { TextField, Typography } from "@mui/material";

interface DateOfBirthFieldProps {
  value: string;
  onChange: any;
}

const DateOfBirthField: React.FC<DateOfBirthFieldProps> = ({
  value,
  onChange,
}) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;

    val = val.replace(/[^0-9/]/g, "");

    if (val.length === 2 && value.length < 2) val += "/";
    if (val.length === 5 && value.length < 5) val += "/";

    onChange(val);
  };

  const isValidDate = (date: string) => {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return datePattern.test(date);
  };

  const font = {
    fontFamily: "'Spline Sans', sans-serif",
  };

  return (
    <>
      <Typography
        variant="body1"
        sx={{ ...font, color: "#183D26", marginBottom: "8px", pl: 1 }}
      >
        Date of Birth
      </Typography>
      <TextField
        placeholder="DD/MM/YYYY"
        name="dateOfBirth"
        value={value}
        onChange={handleDateChange}
        fullWidth
        error={value.length > 0 && !isValidDate(value)}
        helperText={
          value.length > 0 && !isValidDate(value)
            ? "Enter a valid date (DD/MM/YYYY)"
            : ""
        }
        sx={{
          "& .MuiInputBase-input": { fontFamily: "'Spline Sans', sans-serif" },
          "& .MuiInputLabel-root": { fontFamily: "'Spline Sans', sans-serif" },
        }}
      />
    </>
  );
};

export default DateOfBirthField;
