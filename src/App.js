import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import LoginPage from "./LoginPage";
import PreferencesPage from "./PreferencesPage";

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      maxSnack={3}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  margin: 0,
                }}
              >
                <LoginPage />
              </div>
            }
          />
          <Route
            path="/preferences"
            element={
              <div className="preferencesContainer">
                <PreferencesPage />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
