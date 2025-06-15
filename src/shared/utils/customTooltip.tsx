import React from "react";
import { Tooltip } from "@mui/material";

interface CustomTooltipProps {
  children: any;
  title: React.ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <Tooltip
      title={title}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            fontFamily: '"Inter Variable", sans-serif',
            fontSize: "0.75rem",
            padding: "6px 10px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
          },
        },
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
