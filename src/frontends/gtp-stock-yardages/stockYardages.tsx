import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid2,
  TextField,
  Typography,
  Stack,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../shared/Auth/services/firebaseConfig";
import { useSortClubs } from "../../shared/utils/sortClubs";
import { getClubAbbreviation } from "./components/getClubAbbreviation";
import SaveIcon from "@mui/icons-material/Save";

export interface IClub {
  clubType: string;
  clubModel: string;
  brand: string;
  setConfiguration?: {
    clubNumber: string;
    carryDistance?: number;
    totalDistance?: number;
  }[];
  id?: string;
}

export function StockYardages() {
  const user = auth.currentUser;
  const [clubs, setClubs] = useState<IClub[]>([]);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchClubs = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const clubsRef = collection(userRef, "golfClubs");
      const clubsSnapshot = await getDocs(clubsRef);

      if (!clubsSnapshot.empty) {
        const fetchedClubs: IClub[] = [];

        clubsSnapshot.forEach((doc) => {
          const clubData = doc.data();

          if (clubData && clubData.setConfiguration) {
            clubData.setConfiguration.forEach((config: any) => {
              fetchedClubs.push({
                clubType: clubData.type,
                clubModel: clubData.name,
                brand: clubData.brand,
                setConfiguration: [config],
                id: `${clubData.type}-${config.clubNumber}`,
              });
            });
          } else {
            fetchedClubs.push({
              clubType: clubData.type,
              clubModel: clubData.name,
              brand: clubData.brand,
              setConfiguration: [],
              id: `${clubData.type}-${clubData.name}`,
            });
          }
        });

        setClubs(fetchedClubs);
      }
    };

    fetchClubs();
  }, [user]);

  const handleDistanceChange = (
    id: string,
    field: "carryDistance" | "totalDistance",
    value: string
  ) => {
    const parsedValue = value === "" ? null : parseFloat(value) || 0;

    setClubs((prevClubs) =>
      prevClubs.map((club) => {
        if (club.id === id && club.setConfiguration) {
          return {
            ...club,
            setConfiguration: club.setConfiguration.map((config) => ({
              ...config,
              [field]: parsedValue,
            })),
          };
        }
        return club;
      })
    );
  };

  const handleSaveForClub = async (clubId: string) => {
    const clubToSave = clubs.find((club) => club.id === clubId);
    if (!user || !clubToSave) return;

    const userRef = doc(db, "users", user.uid);
    const clubsRef = collection(userRef, "golfClubs");
    const clubDocRef = doc(clubsRef, clubToSave.clubType.toLowerCase());
    const clubSnapshot = await getDoc(clubDocRef);

    if (clubSnapshot.exists()) {
      const clubData = clubSnapshot.data();

      await updateDoc(clubDocRef, {
        setConfiguration: clubData.setConfiguration.map((config: any) => {
          const updatedConfig = clubToSave.setConfiguration?.find(
            (c) => c.clubNumber === config.clubNumber
          );
          return updatedConfig
            ? {
                ...config,
                ...updatedConfig,
                lastUpdated: new Date().toISOString(),
              }
            : config;
        }),
      });
    }
  };

  const handleSaveAll = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    try {
      const clubsRef = collection(userRef, "golfClubs");

      for (const club of clubs) {
        const clubDocRef = doc(clubsRef, club.clubType.toLowerCase());
        const clubSnapshot = await getDoc(clubDocRef);

        if (clubSnapshot.exists()) {
          const clubData = clubSnapshot.data();

          await updateDoc(clubDocRef, {
            setConfiguration: clubData.setConfiguration.map((config: any) => {
              const updatedConfig = club.setConfiguration?.find(
                (c) => c.clubNumber === config.clubNumber
              );
              return updatedConfig
                ? {
                    ...config,
                    ...updatedConfig,
                    lastUpdated: new Date().toISOString(),
                  }
                : config;
            }),
          });
        }
      }
    } catch (error) {
      console.error("Error updating all yardages:", error);
    }
  };

  const sortedClubs = useSortClubs(clubs);

  return (
    <Grid2 container spacing={2} sx={{ px: "4%", pt: "1%" }}>
      <Grid2
        container
        alignItems="center"
        justifyContent="space-between"
        size={12}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "row",
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
          Stock Yardages
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
            zIndex: -1,
          }}
          onClick={handleSaveAll}
        >
          <SaveIcon sx={{ fontSize: "30px", color: "#FFFFFF" }} />
        </IconButton>
      </Grid2>

      {sortedClubs.map((club) => (
        <Grid2 size={{ xs: 12, md: 6, lg: 3, xxxl: 2 }} key={club.id}>
          <Card
            sx={{
              padding: 2,
              backgroundColor: "#132122",
              borderRadius: 8,
              border: "0.5px solid #2a3a3b",
              height: "360px",
              width: "90%",
            }}
          >
            <Tooltip title={"Save"}>
              <IconButton
                sx={{
                  position: "absolute",
                }}
                onClick={() => handleSaveForClub(club.id!)}
              >
                <SaveIcon sx={{ color: "#FFFFFF" }} />
              </IconButton>
            </Tooltip>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {club.setConfiguration?.map((config: any) => (
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    display={"flex"}
                    sx={{
                      backgroundColor: "#192729",
                      fontFamily: "Staatliches, Arial, sans-serif",
                      marginBottom: 1,
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "2px solid #4CAF50",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: '"Inter Variable", sans-serif',
                        fontWeight: 550,
                        color: "#FFFFFF",
                      }}
                    >
                      {getClubAbbreviation(config.clubNumber)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {club.setConfiguration?.map((config: any, idx: any) => (
                <Grid2 container key={idx} direction={"column"}>
                  <Grid2 size={12}>
                    <TextField
                      placeholder="Enter Distance"
                      variant="standard"
                      fullWidth
                      type="number"
                      value={config.carryDistance ?? ""}
                      onChange={(e) =>
                        handleDistanceChange(
                          club.id!,
                          "carryDistance",
                          e.target.value
                        )
                      }
                      sx={{
                        "& .MuiInputBase-root": {
                          borderBottom: "none",
                          fontSize: "60px",
                          color: "#FFFFFF",
                          ml: isMobile ? 0 : 1,
                        },
                        "& .MuiInput-underline:before": {
                          borderBottom: "none",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottom: "none",
                        },
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "20px",
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#778486",
                        fontSize: "20px",
                      }}
                    >
                      Carry Distance
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      placeholder="Enter Distance"
                      variant="standard"
                      fullWidth
                      type="number"
                      value={config.totalDistance ?? ""}
                      onChange={(e) =>
                        handleDistanceChange(
                          club.id!,
                          "totalDistance",
                          e.target.value
                        )
                      }
                      sx={{
                        "& .MuiInputBase-root": {
                          borderBottom: "none",
                          fontSize: "60px",
                          color: "#FFFFFF",
                          ml: isMobile ? 0 : 1,
                        },
                        "& .MuiInput-underline:before": {
                          borderBottom: "none",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottom: "none",
                        },
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "20px",
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#778486",
                        fontSize: "20px",
                      }}
                    >
                      Total Distance
                    </Typography>
                  </Grid2>
                </Grid2>
              ))}
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
