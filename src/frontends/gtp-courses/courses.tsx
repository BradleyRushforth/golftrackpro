import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid2,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AddNewCourseDialog } from "./AddNewCourse/AddNewCourseDialog";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { query, collection, getDocs } from "@firebase/firestore";
import { db } from "../../shared/Auth/services/firebaseConfig";
import "@fontsource-variable/inter";

const Courses = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const q = query(collection(db, "users", user.uid, "golfCourses"));
      const querySnapshot = await getDocs(q);

      const fetchedCourses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCourses(fetchedCourses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching golf courses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }

      console.log("User authenticated, fetching courses...");
      await fetchCourses();
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Typography>Loading courses...</Typography>;

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  return (
    <Grid2 container spacing={2} sx={{ px: "4%", pt: "1%", mb: "5%" }}>
      <Grid2
        container
        alignItems="center"
        justifyContent="space-between"
        size={12}
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            flex: 1,
            color: "#FFFFFF",
            fontFamily: '"Inter Variable", sans-serif',
            fontWeight: 500,
            letterSpacing: "0px",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          Courses
        </Typography>

        <IconButton
          sx={{
            backgroundColor: "#243536",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            height: "50px",
            width: "50px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#2f4849",
              boxShadow: "0 0 10px rgba(36, 53, 54, 0.6)",
              transform: "translateY(-2px)",
            },
          }}
          onClick={handleOpen}
        >
          <AddIcon sx={{ fontSize: "35px", color: "#FFFFFF" }} />
        </IconButton>

        <AddNewCourseDialog
          open={openDialog}
          onClose={handleClose}
          onAddedCourse={fetchCourses}
        />
      </Grid2>

      {courses.map((course) => {
        const rows = [
          {
            label: "Pars Made",
            value: course?.parsMade ?? "N/A",
          },
          {
            label: "Fairways Hit",
            value: course?.fairwaysHit ?? "N/A",
          },
          {
            label: "Greens in Reg",
            value: course?.greensInReg ?? "N/A",
          },
        ];

        return (
          <Grid2 size={{ xs: 12, md: 6, mLg: 4, xl: 3 }} key={course.id}>
            <Card
              sx={{
                padding: 2,
                backgroundColor: "#132122",
                borderRadius: 8,
                border: "0.5px solid #2a3a3b",
                height: "380px",
              }}
            >
              <CardContent>
                <Grid2 container alignItems={"center"}>
                  <Grid2
                    size={9}
                    display={"flex"}
                    justifyContent={"flex-start"}
                  >
                    <Typography
                      sx={{
                        fontSize: "25px",
                        maxWidth: "20ch",
                        color: "#FFFFFF",
                        fontFamily: '"Inter Variable", sans-serif',
                        fontWeight: 550,
                        textTransform: "uppercase",
                      }}
                    >
                      {course.name}
                    </Typography>
                  </Grid2>
                  <Grid2 size={3} display={"flex"} justifyContent={"flex-end"}>
                    <Tooltip sx={{ fontFamily: "Inter" }} title="Total Score">
                      <Box
                        width="60px"
                        height="60px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          backgroundColor: "#192729",
                          border: "2px solid #2a3c3c",
                          borderRadius: "50%",
                        }}
                        mb={1}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 550,
                            color: "#FFFFFF",
                          }}
                        >
                          {course.total}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Grid2>
                </Grid2>
                <Grid2 container>
                  <Grid2 size={5}>
                    <Typography
                      sx={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontWeight: 550,
                        color: "#778486",
                        textTransform: "uppercase",
                      }}
                    >
                      Slope Rating
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontWeight: 550,
                        color: "#FFFFFF",
                        textTransform: "uppercase",
                      }}
                    >
                      {course.slopeRating}
                    </Typography>
                  </Grid2>
                  <Grid2 size={1}>
                    <Box
                      height={"80px"}
                      borderRight={"1px solid #2a3c3c"}
                      sx={{ mr: 2 }}
                    />
                  </Grid2>
                  <Grid2 size={5}>
                    <Typography
                      sx={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontWeight: 550,
                        color: "#778486",
                        textTransform: "uppercase",
                      }}
                    >
                      Handicap
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontWeight: 550,
                        color: "#FFFFFF",
                        textTransform: "uppercase",
                      }}
                    >
                      {course.handicap}
                    </Typography>
                  </Grid2>
                </Grid2>
                <Grid2 container>
                  <Grid2 size={12}>
                    <Divider sx={{ backgroundColor: "#2a3c3c", my: 2 }} />
                  </Grid2>
                  <Grid2 size={12}>
                    <Typography
                      sx={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontWeight: 550,
                        color: "#778486",
                        textTransform: "uppercase",
                      }}
                    >
                      Performance
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    {rows.map((row, index) => (
                      <Box
                        key={index}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ py: 1 }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Inter Variable", sans-serif',
                            fontWeight: 550,
                            color: "#FFFFFF",
                            textTransform: "uppercase",
                          }}
                        >
                          {row.label}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={300}
                          fontFamily={"Montserrat, sans-serif"}
                          sx={{ color: "#FFFFFF" }}
                        >
                          {row.value}
                        </Typography>
                      </Box>
                    ))}
                  </Grid2>
                </Grid2>
                {/* <Grid2 container>
                  <Grid2 size={6}>
                    <Box
                      sx={{
                        borderRight: "1px solid #ccc",
                        pr: 2,
                        height: "100%",
                      }}
                    >
                      {rows.map((row, index) => (
                        <Box
                          key={index}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ py: 1 }}
                        >
                          <Typography variant={"h6"} sx={{ color: "#FFFFFF" }}>
                            {row.leftLabel}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={300}
                            fontFamily={"Montserrat, sans-serif"}
                            sx={{ color: "#FFFFFF" }}
                          >
                            {row.leftValue}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid2>

                  <Grid2 size={6}>
                    <Box sx={{ pl: 2 }}>
                      {rows.map((row, index) => (
                        <Box
                          key={index}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ py: 1 }}
                        >
                          <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                            {row.rightLabel}
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={300}
                            fontFamily={"Montserrat, sans-serif"}
                            sx={{ color: "#FFFFFF" }}
                          >
                            {row.rightValue}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid2>
                </Grid2> */}
              </CardContent>
            </Card>
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default Courses;
