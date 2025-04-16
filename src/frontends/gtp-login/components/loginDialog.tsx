import React from "react";
import {
  Alert,
  Button,
  Card,
  Grid,
  Grid2,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

interface ILoginDialog {
  email: string;
  password: string;
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  error?: string;
  openSnackbar: boolean;
  setOpenSnackbar: (open: boolean) => void;
  snackbarMessage: string;
  snackbarSeverity: "success" | "error";
}

export const LoginDialog: React.FC<ILoginDialog> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  error,
  openSnackbar,
  setOpenSnackbar,
  snackbarMessage,
  snackbarSeverity,
}) => {
  const font = {
    fontFamily: "'Spline Sans', sans-serif",
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
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"80vh"}
    >
      <Card
        sx={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          height: "650px",
          mt: 4,
          width: "60%",
          borderRadius: 5,
        }}
      >
        <Grid2
          size={12}
          sx={{
            backgroundImage: "url(/images/login-image.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
          }}
        />
        <Grid2
          size={12}
          sx={{
            padding: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Grid2 size={12} sx={{ textAlign: "left" }}>
            <Typography variant="h4" sx={font}>
              Welcome Back!
            </Typography>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="body2" sx={{ ...font, fontSize: "14px" }}>
              Don't have an account?{" "}
              <Link
                href="/register"
                sx={{
                  ...font,
                  textDecoration: "underline",
                  color: "#183D26",
                  "&:hover": {
                    color: "#3D9F6A",
                  },
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Grid2>
          <Grid2
            container
            size={12}
            gap={2}
            mt={3}
            direction="column"
            alignItems="center"
          >
            {error && (
              <Alert
                severity="error"
                sx={{ width: "320px", boxSizing: "border-box" }}
              >
                {error}
              </Alert>
            )}
            <Grid2 size={12}>
              <Typography
                variant="body1"
                sx={{ ...font, color: "#183D26", marginBottom: "8px" }}
              >
                Email Address
              </Typography>
              <TextField
                placeholder="Email Address"
                sx={{
                  ...textFieldFontStyles,
                  width: "320px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#183D26",
                    },
                  },
                }}
                value={email}
                variant="outlined"
                onChange={setEmail}
              />
            </Grid2>
            <Grid2 size={12}>
              <Typography
                variant="body1"
                sx={{ ...font, color: "#183D26", marginBottom: "8px" }}
              >
                Password
              </Typography>
              <TextField
                name="password"
                placeholder="Password"
                sx={{
                  ...textFieldFontStyles,
                  width: "320px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#183D26",
                    },
                  },
                }}
                value={password}
                type="password"
                variant="outlined"
                onChange={setPassword}
              />
            </Grid2>
          </Grid2>
          <Grid2 size={12} my={2}>
            <Button
              variant="contained"
              sx={{
                width: "320px",
                height: "50px",
                borderRadius: 8,
                backgroundColor: "#183D26",
              }}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert
                onClose={() => setOpenSnackbar(false)}
                severity={snackbarSeverity}
                sx={{ width: "100%" }}
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </Grid2>
        </Grid2>
      </Card>
    </Grid2>
  );
};
