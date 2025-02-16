import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { hasValue, isEmpty, isFunction, isNil } from "utils/safety";

// // I see Snackbar deinfed here and currentSnackbar is defined as Snackbar | null
// // So why was currentSnackbar on line 172 needed to be declared again as such?
export interface Snackbar {
  id: string;
  anchor?: SnackbarOrigin;
  duration?: number;
  message?: string;
  severity?: "error" | "warning" | "info" | "success";
  sx?: Record<string, any>;
  title?: string;
  onRemove?: () => void;
}

export interface SnackbarState {
  snackbars: Snackbar[];
}

export interface SnackbarContextType {
  removeSnackbar: (id: string) => () => void;
  currentSnackbar: Snackbar | null | undefined;
}

const SnackbarContext = createContext<
  ((snackbar: Snackbar) => void) | undefined
>(undefined);

const PrivateSnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

function usePrivateSnackbarContext(): SnackbarContextType {
  const context = useContext(PrivateSnackbarContext);
  if (!context) {
    throw new Error(
      "usePrivateSnackbarContext must be used within SnackbarProvider"
    );
  }
  return context;
}

export function useSetSnackbarContext(): (snackbar: Snackbar) => void {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSetSnackbarContext must be used within SnackbarProvider"
    );
  }
  return context;
}

export const initialState: SnackbarState = {
  snackbars: [],
};

function reducer(state: SnackbarState, action: any): SnackbarState {
  switch (action.type) {
    case "SET_SNACKBAR":
      if (
        state.snackbars.find((snackbar) => snackbar.id === action.payload.id)
      ) {
        return state;
      }
      return {
        ...state,
        snackbars: [...state.snackbars, action.payload],
      };
    case "REMOVE_SNACKBAR": {
      const filtered = state.snackbars.filter(
        (s) => s.id !== action.payload.id
      );
      if (filtered.length === state.snackbars.length) {
        return state;
      }
      return {
        ...state,
        snackbars: filtered,
      };
    }
    default:
      return state;
  }
}

export interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSnackbar = useCallback((snackbar: Snackbar) => {
    if (!hasValue(snackbar?.id)) {
      console.error("Snackbar must have an id");
      return;
    }

    dispatch({ type: "SET_SNACKBAR", payload: snackbar });
  }, []);

  const removeSnackbar = useCallback(
    (id: string) => () => {
      const currentSnackbar = state.snackbars.find((s) => s.id === id);
      if (isFunction(currentSnackbar?.onRemove)) {
        currentSnackbar.onRemove();
      }

      dispatch({ type: "REMOVE_SNACKBAR", payload: { id } });
    },
    [state]
  );

  const privateValue = useMemo(
    () => ({
      removeSnackbar,
      currentSnackbar: getCurrentSnackbar(state.snackbars),
    }),
    [state]
  );

  return (
    <SnackbarContext.Provider value={setSnackbar}>
      {/* <PrivateSnackbarContext.Provider value={privateValue}> */}
      {children}
      {/* <SnackbarNode /> */}
      {/* </PrivateSnackbarContext.Provider> */}
    </SnackbarContext.Provider>
  );
}

export function getCurrentSnackbar(snackbars: Snackbar[]): Snackbar | null {
  if (isNil(snackbars) || isEmpty(snackbars)) {
    return null;
  }

  const queue = [...snackbars];
  const snackbar = queue.shift();
  return snackbar as Snackbar;
}

export function SnackbarNode() {
  const { currentSnackbar, removeSnackbar } = usePrivateSnackbarContext();

  if (!hasValue(currentSnackbar)) {
    return null;
  }

  const {
    anchor: customerAnchor,
    duration,
    id,
    message,
    severity,
    sx,
    title,
  } = currentSnackbar as Snackbar;

  const anchor = customerAnchor ?? { vertical: "top", horizontal: "left" };
  const hideDuration = duration ?? 6000;

  return (
    <Snackbar
      anchorOrigin={anchor} // { vertical: "top", horizontal: "left" } .. Type '{ vertical: string; horizontal: string; }' is not assignable to type 'SnackbarOrigin'.
      autoHideDuration={hideDuration}
      disableWindowBlurListener
      key={id}
      onClose={removeSnackbar(id)} // Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
      open
      sx={{
        minWidth: { sm: "480px", md: "512px" },
        ...sx,
      }}
    >
      <Alert
        elevation={6}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={removeSnackbar(id)}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        }
      >
        {title && (
          <AlertTitle
            sx={{
              fontWeight: "fontWeightBold",
              mt: {
                xs: "-3px",
                sm: "-3px",
                md: "-3px",
                lg: "-5px",
              },
            }}
          >
            {title}
          </AlertTitle>
        )}
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
}
