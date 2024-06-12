import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";

function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();
    console.log("Phone Number Submitted: ", phoneNumber);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/login/issue_otp?user_number=${phoneNumber}`,
        {
          method: "GET",
        }
      );
      console.log("OTP Request Response: ", response);

      const data = await response.json();
      console.log("OTP Request Response: ", data);

      // TODO: Optionally handle the UI change here if needed
      enqueueSnackbar("OTP Sent", { variant: "success" });
    } catch (error) {
      console.error("Error requesting OTP:", error);
      enqueueSnackbar("Failed to send OTP", { variant: "error" });
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    console.log("OTP Submitted: ", otp);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/login/verify_otp?user_number=${phoneNumber}&otp=${otp}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("OTP Verification Response: ", data);

      const token = data.token;
      if (token === undefined) {
        throw new Error("Token not found in response");
      }

      // Store the token in local storage
      localStorage.setItem("razzler_login_token", token);

      enqueueSnackbar("Login successful!", { variant: "success" });

      // Redirect to the preferences page after 1 second
      setTimeout(() => {
        window.location.href = "/preferences";
      }, 1000);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      enqueueSnackbar("Incorrect OTP.", { variant: "error" });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Razzler Web Portal Login
      </Typography>
      <form onSubmit={handlePhoneSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone-number"
          label="Phone Number"
          name="phone-number"
          autoComplete="phone-number"
          autoFocus
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Request OTP
        </Button>
      </form>
      <form onSubmit={handleOtpSubmit} style={{ marginTop: 20 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="otp"
          label="OTP"
          name="otp"
          autoComplete="one-time-code"
          inputMode="numeric"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit OTP
        </Button>
      </form>
    </Container>
  );
}

export default LoginPage;
