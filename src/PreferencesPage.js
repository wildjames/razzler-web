import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";

function PreferencesPage() {
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchPreferences = async () => {
      const token = localStorage.getItem("razzler_login_token");
      if (!token) {
        console.log("No token found, user is not logged in");
        window.location.href = "/";
      }
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/preferences`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch preferences");
        }
        const data = await response.json();

        // The response includes the user_id, which we don't need. Remove it from the preferences object
        delete data.user_id;

        setPreferences(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const handleInputChange = (key) => (event) => {
    setPreferences({
      ...preferences,
      [key]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("razzler_login_token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/preferences`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferences),
        }
      );
      const data = await response.json();
      console.log("Preferences Update Response: ", data);
      if (!response.ok) {
        console.error("Failed to update preferences:", response);
        throw new Error("Failed to update preferences");
      }
      enqueueSnackbar("Preferences updated successfully!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      enqueueSnackbar("Failed to update preferences", { variant: "error" });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Edit Preferences
      </Typography>
      {loading ? (
        <Typography component="p">Loading...</Typography>
      ) : (
        Object.keys(preferences).map((key) => (
          <TextField
            key={key}
            fullWidth
            margin="normal"
            label={key}
            variant="outlined"
            value={preferences[key]}
            onChange={handleInputChange(key)}
          />
        ))
      )}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
      >
        Save Changes
      </Button>
    </Container>
  );
}

export default PreferencesPage;
