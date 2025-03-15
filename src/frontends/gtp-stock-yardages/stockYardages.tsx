import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid2, TextField, Typography, Button, Stack, Box, IconButton, Tooltip } from "@mui/material";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../shared/Auth/services/firebaseConfig";
import { useSortClubs } from "../../shared/utils/sortClubs";
import { getClubAbbreviation } from "./components/getClubAbbreviation";
import SaveIcon from '@mui/icons-material/Save';

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

  const handleDistanceChange = (id: string, field: "carryDistance" | "totalDistance", value: string) => {
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
    const clubToSave = clubs.find(club => club.id === clubId);
    if (!user || !clubToSave) return;

    const userRef = doc(db, "users", user.uid);
    const clubsRef = collection(userRef, "golfClubs");
    const clubDocRef = doc(clubsRef, clubToSave.clubType.toLowerCase());
    const clubSnapshot = await getDoc(clubDocRef);

    if (clubSnapshot.exists()) {
      const clubData = clubSnapshot.data();

      await updateDoc(clubDocRef, {
        setConfiguration: clubData.setConfiguration.map((config: any) => {
          const updatedConfig = clubToSave.setConfiguration?.find((c) => c.clubNumber === config.clubNumber);
          return updatedConfig
            ? { ...config, ...updatedConfig, lastUpdated: new Date().toISOString() }
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
              const updatedConfig = club.setConfiguration?.find((c) => c.clubNumber === config.clubNumber);
              return updatedConfig
                ? { ...config, ...updatedConfig, lastUpdated: new Date().toISOString() }
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
    <Grid2 container spacing={2} sx={{ padding: 3 }}>
      <Grid2 container alignItems="center" justifyContent="space-between" size={12}>
        <Typography color="#000000" variant="h3">
          Stock Yardages
        </Typography>
        <Button
          variant="contained"
          sx={{ 
            backgroundColor: "#1F5132",
            fontSize: '15px'
          }}
          onClick={handleSaveAll}
        >
          Save All Yardages
        </Button>
      </Grid2>

      {sortedClubs.map((club) => (
        <Grid2 size={3} key={club.id}>
          <Card 
            sx={{ 
              padding: 2, 
              backgroundColor: "#FFFFFF", 
              borderRadius: 8,
              boxShadow: '0px 0px 20px #C8E6C9',
              height: '220px'
            }}>
              <Tooltip title={'Save'}>
                <IconButton
                  sx={{
                    position: 'absolute'
                  }}
                  onClick={() => handleSaveForClub(club.id!)}>
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                {club.setConfiguration?.map((config: any) => (
                  <IconButton
                    sx={{
                      backgroundColor: "#1F5132",
                      fontFamily: 'Staatliches, Arial, sans-serif',
                      marginBottom: 2,
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        backgroundColor: '#1F5132',
                        opacity: 1,
                      },
                      '&:active': {
                        backgroundColor: '#1F5132',
                      },
                      '&:focus': {
                        outline: 'none',
                      },
                    }}
                  >
                    <Stack
                      style={{
                        background: 'linear-gradient(0deg, #FFD700 0%, #FFC700 25%, #FFE08A 50%, #B8860B 100%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontSize: '45px',
                        textTransform: 'none',
                        padding: '0',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {getClubAbbreviation(config.clubNumber)}
                    </Stack>
                  </IconButton>
                ))}
              </Box>
              {club.setConfiguration?.map((config: any, idx: any) => (
                <Grid2 container spacing={1} key={idx}>
                  <Grid2 size={6}>
                    <TextField
                      placeholder="Enter Distance"
                      variant="standard"
                      fullWidth
                      type="number"
                      value={config.carryDistance ?? ""}
                      onChange={(e) => handleDistanceChange(club.id!, "carryDistance", e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderBottom: "none",
                          fontSize: '40px'
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
                        '& .MuiInputBase-input::placeholder': {
                          fontSize: '20px',
                        }
                      }}
                    />
                    <Typography sx={{ textAlign: 'center', pr: 1.5 }}>Carry Distance</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <TextField
                      placeholder="Enter Distance"
                      variant="standard"
                      fullWidth
                      type="number"
                      value={config.totalDistance ?? ""}
                      onChange={(e) => handleDistanceChange(club.id!, "totalDistance", e.target.value)}
                      sx={{
                        "& .MuiInputBase-root": {
                          borderBottom: "none",
                          fontSize: '40px'
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
                        '& .MuiInputBase-input::placeholder': {
                          fontSize: '20px',
                        }
                      }}
                    />
                    <Typography sx={{ textAlign: 'center', pr: 1.5 }}>Total Distance</Typography>
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
