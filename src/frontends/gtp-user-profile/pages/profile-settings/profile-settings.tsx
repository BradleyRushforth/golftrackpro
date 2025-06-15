import React, { useState, useEffect } from "react";
import { TextField, Button, Grid2, Typography, Box } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../shared/Auth/services/firebaseConfig";
import DateOfBirthField from "../../utils/dateOfBirthField";

const ProfileSettings = () => {
  const user = auth.currentUser;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: `${user?.email}`,
    mobileNumber: "",
    homeTelephone: "",
    jobTitle: "",
    dateOfBirth: "",
    country: "",
    address: "",
    postcode: "",
  });

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setForm((prev) => ({
            ...prev,
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            username: userData.username || "",
            mobileNumber: userData.mobileNumber || "",
            homeTelephone: userData.homeTelephone || "",
            country: userData.country || "",
            dateOfBirth: userData.dateOfBirth || "",
            jobTitle: userData.jobTitle || "",
            address: userData.address || "",
            postcode: userData.postcode || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const areRequiredFieldsFilled =
      form.firstName.trim() !== "" &&
      form.lastName.trim() !== "" &&
      form.username.trim() !== "" &&
      form.country.trim() !== "" &&
      form.dateOfBirth.trim() !== "";
    setIsSaveDisabled(!areRequiredFieldsFilled);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!user) {
        throw new Error("No authenticated user found");
      }

      const userRef = doc(db, "users", user.uid);
      console.log("User Document Reference:", userRef);

      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist");
      }

      await updateDoc(userRef, {
        firstName: form.firstName || userDoc.data().firstName,
        lastName: form.lastName || userDoc.data().lastName,
        username: form.username || userDoc.data().username,
        mobileNumber: form.mobileNumber || userDoc.data().mobileNumber,
        homeTelephone: form.homeTelephone || userDoc.data().homeTelephone,
        jobTitle: form.jobTitle || userDoc.data().jobTitle,
        dateOfBirth: form.dateOfBirth || userDoc.data().dateOfBirth,
        country: form.country || userDoc.data().country,
        address: form.address || userDoc.data().address,
        postcode: form.postcode || userDoc.data().postcode,
      });
    } catch (error) {
      console.error("Error updating Profile Settings:", error);
      alert("Failed to update profile settings. Please try again.");
    }
  };

  const height = {
    height: "50px",
  };

  const font = {
    fontFamily: "'Spline Sans', sans-serif",
    color: "#183D26",
  };

  const textFieldFontStyles = {
    "& .MuiInputBase-input": {
      fontFamily: "'Spline Sans', sans-serif",
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'Spline Sans', sans-serif",
    },
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        mt: 6,
        display: "grid",
        ml: "18%",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 6,
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        width: "80%",
        p: 5,
        pb: 8,
      }}
    >
      <Grid2 container direction="column" spacing={5}>
        <Grid2>
          <Typography variant="h2" pl={1} mb={2} color={"#183D26"}>
            Profile
          </Typography>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            First Name
          </Typography>
          <TextField
            placeholder="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Last Name
          </Typography>
          <TextField
            placeholder="Last Name *"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Username
          </Typography>
          <TextField
            placeholder="Username *"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Email
          </Typography>
          <TextField
            placeholder={`${user?.email}`}
            name="email"
            value={user?.email}
            fullWidth
            disabled
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="column" spacing={5} mt={"88px"}>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Mobile Number
          </Typography>
          <TextField
            placeholder="Mobile Number"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={handleChange}
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Home Telephone
          </Typography>
          <TextField
            placeholder="Home Telephone"
            name="homeTelephone"
            value={form.homeTelephone}
            onChange={handleChange}
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Job Title
          </Typography>
          <TextField
            placeholder="Job Title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <DateOfBirthField
            value={form.dateOfBirth}
            onChange={(value: any) =>
              setForm((prev) => ({ ...prev, dateOfBirth: value }))
            }
          />
        </Grid2>
      </Grid2>
      <Grid2 container direction="column" spacing={5} mt={"88px"}>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Country
          </Typography>
          <TextField
            placeholder="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Address
          </Typography>
          <TextField
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2>
          <Typography
            variant="body1"
            sx={{ ...font, marginBottom: "8px", pl: 1 }}
          >
            Postcode
          </Typography>
          <TextField
            placeholder="Postcode"
            name="postcode"
            type="Postcode"
            value={form.postcode}
            onChange={handleChange}
            fullWidth
            sx={{
              ...textFieldFontStyles,
              ...height,
            }}
          />
        </Grid2>
        <Grid2
          sx={{
            marginTop: "33px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isSaveDisabled}
            fullWidth
            sx={{
              ...font,
              color: "#FFFFFF",
              backgroundColor: "#183D26",
              height: "55px",
            }}
          >
            Save
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default ProfileSettings;
