import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

export interface ComponentState {
  open: Record<string, boolean>;
  loading: Record<string, boolean>;
  disabled: Record<string, boolean>;
  focused: Record<string, boolean>;
  transitioning: boolean;
  zIndex: number;
  temp: Record<string, any>;
  bag: Record<string, any>;
}

export type Action =
  | { type: "RESET" }
  | { type: "CLOSE_COMPONENT"; payload: string }
  | { type: "OPEN_COMPONENT"; payload: string }
  | { type: "SET_LOADING"; payload: { id: string; loading: boolean } }
  | { type: "SET_DISABLED"; payload: { id: string; disabled: boolean } }
  | { type: "SET_TRANSITIONING"; payload: boolean }
  | { type: "SET_Z_INDEX"; payload: number }
  | { type: "TOGGLE_OPEN"; payload: { id: string } }
  | { type: "SET_FOCUSED"; payload: { id: string; focused: boolean } }
  | { type: "SET_TEMP"; payload: { id: string; temp: any } }
  | { type: "ADD_TO_TEMP"; payload: { id: string; temp: any } }
  | { type: "SET_BAG"; payload: { id: string; bag: any } }
  | { type: "ADD_TO_BAG"; payload: { id: string; bag: any } };

export interface ComponentStateContextProps {
  reset: () => void;
  setClose: (id: string) => () => void;
  setOpen: (id: string) => () => void;
  setLoading: (id: string) => (loading: boolean) => void;
  setDisabled: (id: string) => (disabled: boolean) => void;
  setTransitioning: (transitioning: boolean) => void;
  setZIndex: (zIndex: number) => void;
  toggleOpen: (id: string) => () => void;
  setFocused: (id: string) => (focused: boolean) => void;
  addToTemp: (id: string) => (temp: any) => void;
  setTemp: (id: string) => (temp: any) => void;
  addToBag: (id: string) => (bag: any) => void;
  setBag: (id: string) => (bag: any) => void;
  open: Record<string, boolean>;
  loading: Record<string, boolean>;
  disabled: Record<string, boolean>;
  focused: Record<string, boolean>;
  transitioning: boolean;
  zIndex: number;
  temp: Record<string, any>;
  bag: Record<string, any>;
}

export const ComponentStateContext = createContext<
  ComponentStateContextProps | undefined
>(undefined);

export function useComponentStateContext() {
  return useContext(ComponentStateContext);
}

const initialState: ComponentState = {
  open: {},
  loading: {},
  disabled: {},
  focused: {},
  transitioning: false,
  zIndex: 1003,
  temp: {},
  bag: {},
};

const reducer = (state: ComponentState, action: Action): ComponentState => {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        open: {},
        loading: {},
        disabled: {},
        focused: {},
        temp: {},
        bag: {},
      };
    case "CLOSE_COMPONENT":
      return {
        ...state,
        open: {
          ...state.open,
          [action.payload]: false,
        },
        loading: {
          ...state.loading,
          [action.payload]: false,
        },
        disabled: {
          ...state.disabled,
          [action.payload]: false,
        },
      };
    case "OPEN_COMPONENT":
      return {
        ...state,
        open: {
          ...state.open,
          [action.payload]: true,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.id]: action.payload.loading,
        },
      };
    case "SET_DISABLED":
      return {
        ...state,
        disabled: {
          ...state.disabled,
          [action.payload.id]: action.payload.disabled,
        },
      };
    case "SET_TRANSITIONING":
      return {
        ...state,
        transitioning: action.payload,
      };
    case "SET_Z_INDEX":
      return {
        ...state,
        zIndex: action.payload,
      };
    case "TOGGLE_OPEN":
      return {
        ...state,
        open: {
          ...state.open,
          [action.payload.id]: !state.open[action.payload.id],
        },
      };
    case "SET_FOCUSED":
      return {
        ...state,
        focused: {
          ...state.focused,
          [action.payload.id]: action.payload.focused,
        },
      };
    case "SET_TEMP":
      return {
        ...state,
        temp: {
          ...state.temp,
          [action.payload.id]: action.payload.temp,
        },
      };
    case "ADD_TO_TEMP":
      return {
        ...state,
        temp: {
          ...state.temp,
          [action.payload.id]: {
            ...state.temp[action.payload.id],
            ...action.payload.temp,
          },
        },
      };
    case "SET_BAG":
      return {
        ...state,
        bag: {
          ...state.bag,
          [action.payload.id]: action.payload.bag,
        },
      };
    case "ADD_TO_BAG":
      return {
        ...state,
        bag: {
          ...state.bag,
          [action.payload.id]: {
            ...state.bag[action.payload.id],
            ...action.payload.bag,
          },
        },
      };
    default:
      return state;
  }
};

export interface ComponentStateProviderProps {
  children: ReactNode;
}

export function ComponentStateProvider({
  children,
}: ComponentStateProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const setClose = (id: string) => () => {
    dispatch({ type: "CLOSE_COMPONENT", payload: id });
  };

  const setOpen = (id: string) => () => {
    dispatch({ type: "OPEN_COMPONENT", payload: id });
  };

  const setLoading = (id: string) => (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: { id, loading } });
  };

  const setDisabled = (id: string) => (disabled: boolean) => {
    dispatch({ type: "SET_DISABLED", payload: { id, disabled } });
  };

  const setTransitioning = (transitioning: boolean) => {
    dispatch({ type: "SET_TRANSITIONING", payload: transitioning });
  };

  const setZIndex = (zIndex: number) => {
    dispatch({ type: "SET_Z_INDEX", payload: zIndex });
  };

  const toggleOpen = (id: string) => () => {
    dispatch({ type: "TOGGLE_OPEN", payload: { id } });
  };

  const setFocused = (id: string) => (focused: boolean) => {
    dispatch({ type: "SET_FOCUSED", payload: { id, focused } });
  };

  const setTemp = (id: string) => (temp: Record<string, any>) => {
    dispatch({ type: "SET_TEMP", payload: { id, temp } });
  };

  const setBag = (id: string) => (bag: Record<string, any>) => {
    dispatch({ type: "SET_BAG", payload: { id, bag } });
  };

  const addToBag = (id: string) => (bag: Record<string, any>) => {
    dispatch({ type: "ADD_TO_BAG", payload: { id, bag } });
  };
  const addToTemp = (id: string) => (temp: Record<string, any>) => {
    dispatch({ type: "ADD_TO_TEMP", payload: { id, temp } });
  };

  const value = useMemo(
    () => ({
      reset,
      setClose,
      setOpen,
      setLoading,
      setDisabled,
      setTransitioning,
      setZIndex,
      setFocused,
      toggleOpen,
      addToTemp,
      setTemp,
      addToBag,
      setBag,
      ...state,
    }),
    [state]
  );

  return (
    <ComponentStateContext.Provider value={value}>
      {children}
    </ComponentStateContext.Provider>
  );
}
