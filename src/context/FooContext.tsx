import React, { ReactNode, createContext, useContext } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

interface FooProviderProps {
  children: ReactNode;
}

const FooContext = createContext<null>(null);

export function FooProvider({ children }: FooProviderProps): JSX.Element {
  console.log("SnackbarProvider rendered");

  return (
    <FooContext.Provider value={null}>
      <Typography>Hey THere</Typography>
      {children}
    </FooContext.Provider>
  );
}

export function useSnackbarContext() {
  const context = useContext(FooContext);
  if (context === null) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider"
    );
  }
  return context;
}
