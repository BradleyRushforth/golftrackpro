import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid2,
  Box,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

interface CourseData {
  name: string;
  yardage: string;
  slopeRating: number;
  total: number;
  statRows: {
    leftLabel: string;
    leftValue: string;
    rightLabel: string;
    rightValue: string;
  }[];
}

const GolfCourseCard = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://api.golfcourseapi.com/v1/search?search_query=west bradford",
        {
          headers: {
            Authorization: "Key C4R4UF2N5PELS4N4KFC3YGEHMM",
          },
        }
      )
      .then((response) => {
        const course = response.data.courses[0];
        const mensWhiteTees = course.tees.male[0];
        const slopeRating = mensWhiteTees.slope_rating;
        const total = mensWhiteTees.par_total;

        console.log("Course Tees:", course.tees.male[0]);

        if (mensWhiteTees) {
          setCourseData({
            name: course.course_name,
            yardage: mensWhiteTees.total_yards,
            statRows: course.stats || [],
            slopeRating: slopeRating,
            total: total,
          });
        } else {
          console.error("Men's White Tees not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const leftLabels = ["SR", "HC", "Total"];
  const leftValues = [
    courseData.slopeRating,
    "118",
    `${"94/"}${courseData.total}`,
  ];

  const rightLabels = ["Par", "FH", "GIR"];
  const rightValues = ["4", "3", "14"];

  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        bosizehadow:
          "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 2px 6px rgba(95, 189, 123, 0.1)",
        height: "220px",
      }}
    >
      <CardContent>
        <Grid2 container>
          <Grid2 size={9} display={"flex"} justifyContent={"flex-start"}>
            <Typography variant="h4" sx={{ maxWidth: "20ch" }}>
              {courseData.name}
            </Typography>
          </Grid2>
          <Grid2
            size={3}
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ textAlign: "right" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                width="15px"
                height="15px"
                sx={{
                  backgroundColor: "red",
                  border: "1px solid #000",
                  mb: "1px",
                }}
              />
              <Typography variant="h5">{courseData.yardage}</Typography>
            </Stack>
          </Grid2>
        </Grid2>
        <Divider sx={{ mt: 1 }} />
        <Grid2 container>
          <Grid2 size={6}>
            <Box sx={{ borderRight: "1px solid #ccc", pr: 2, height: "100%" }}>
              {leftLabels.map((label, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 1 }}
                >
                  <Typography variant="h6">{label}</Typography>
                  <Typography
                    variant="body1"
                    fontWeight={400}
                    fontFamily={"Montserrat, sans-serif"}
                  >
                    {leftValues[index]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{ pl: 2 }}>
              {rightLabels.map((label, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ py: 1 }}
                >
                  <Typography variant="h6">{label}</Typography>
                  <Typography
                    variant="body1"
                    fontWeight={400}
                    fontFamily={"Montserrat, sans-serif"}
                  >
                    {rightValues[index]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default GolfCourseCard;
