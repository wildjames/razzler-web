import React from "react";
import { SnackbarProvider } from "notistack";
import LoginPage from "./LoginPage";

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      maxSnack={3}
    >
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
    </SnackbarProvider>
  );
}

export default App;
