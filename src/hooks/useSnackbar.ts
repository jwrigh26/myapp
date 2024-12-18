import { SnackbarOrigin } from "@mui/material/Snackbar";
import { useSetSnackbarContext } from "context/SnackbarContext";
import { useCallback } from "react";

export interface SnackbarOptions {
  anchor?: SnackbarOrigin;
  duration?: number;
  title?: string;
}

const defaultAnchor: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};
const defaultDuration = 6000;

/**
 * Custom hook to display an informational snackbar.
 *
 * @returns {Function} A function to display an informational snackbar with a message and optional settings.
 *
 * @example
 * const showInfoSnackbar = useInfoSnackbar();
 * showInfoSnackbar("This is an info message", { duration: 3000 });
 *
 * @param {string} message - The message to display in the snackbar.
 * @param {SnackbarOptions} [options] - Optional settings for the snackbar.
 * @param {SnackbarOrigin} [options.anchor] - The position of the snackbar on the screen.
 * @param {number} [options.duration] - The duration the snackbar is displayed, in milliseconds.
 * @param {string} [options.title] - The title of the snackbar.
 */
export function useInfoSnackbar() {
  const setSnackbar = useSetSnackbarContext();

  return useCallback(
    (message: string, options: SnackbarOptions = {}) => {
      const {
        anchor = defaultAnchor,
        duration = defaultDuration,
        title = "Info",
      } = options;

      setSnackbar({
        id: `info-${message}-${Date.now()}`,
        anchor,
        title,
        duration,
        message,
        severity: "info",
      });
    },
    [setSnackbar]
  );
}

/**
 * Custom hook to display a success snackbar.
 *
 * @returns {Function} A function to display a success snackbar with a message and optional settings.
 *
 * @example
 * const showSuccessSnackbar = useSuccessSnackbar();
 * showSuccessSnackbar("This is a success message", { duration: 3000 });
 *
 * @param {string} message - The message to display in the snackbar.
 * @param {SnackbarOptions} [options] - Optional settings for the snackbar.
 * @param {SnackbarOrigin} [options.anchor] - The position of the snackbar on the screen.
 * @param {number} [options.duration] - The duration the snackbar is displayed, in milliseconds.
 * @param {string} [options.title] - The title of the snackbar.
 */
export function useSuccessSnackbar() {
  const setSnackbar = useSetSnackbarContext();

  return useCallback(
    (message: string, options: SnackbarOptions = {}) => {
      const {
        anchor = defaultAnchor,
        duration = defaultDuration,
        title = "Success",
      } = options;

      setSnackbar({
        id: `success-${message}-${Date.now()}`,
        anchor,
        title,
        duration,
        message,
        severity: "success",
      });
    },
    [setSnackbar]
  );
}

/**
 * Custom hook to display an error snackbar.
 *
 * @returns {Function} A function to display an error snackbar with a message and optional settings.
 *
 * @example
 * const showErrorSnackbar = useErrorSnackbar();
 * showErrorSnackbar("This is an error message", { duration: 3000 });
 *
 * @param {string} message - The message to display in the snackbar.
 * @param {SnackbarOptions} [options] - Optional settings for the snackbar.
 * @param {SnackbarOrigin} [options.anchor] - The position of the snackbar on the screen.
 * @param {number} [options.duration] - The duration the snackbar is displayed, in milliseconds.
 * @param {string} [options.title] - The title of the snackbar.
 */
export function useErrorSnackbar() {
  const setSnackbar = useSetSnackbarContext();

  return useCallback(
    (message: string, options: SnackbarOptions = {}) => {
      const {
        anchor = defaultAnchor,
        duration = defaultDuration,
        title = "Error",
      } = options;

      setSnackbar({
        id: `error-${message}-${Date.now()}`,
        anchor,
        title,
        duration,
        message,
        severity: "error",
      });
    },
    [setSnackbar]
  );
}

/**
 * Custom hook to display a warning snackbar.
 *
 * @returns {Function} A function to display a warning snackbar with a message and optional settings.
 *
 * @example
 * const showWarningSnackbar = useWarningSnackbar();
 * showWarningSnackbar("This is a warning message", { duration: 3000 });
 *
 * @param {string} message - The message to display in the snackbar.
 * @param {SnackbarOptions} [options] - Optional settings for the snackbar.
 * @param {SnackbarOrigin} [options.anchor] - The position of the snackbar on the screen.
 * @param {number} [options.duration] - The duration the snackbar is displayed, in milliseconds.
 * @param {string} [options.title] - The title of the snackbar.
 */
export function useWarningSnackbar() {
  const setSnackbar = useSetSnackbarContext();

  return useCallback(
    (message: string, options: SnackbarOptions = {}) => {
      const {
        anchor = defaultAnchor,
        duration = defaultDuration,
        title = "Warning",
      } = options;

      setSnackbar({
        id: `warning-${message}-${Date.now()}`,
        anchor,
        title,
        duration,
        message,
        severity: "warning",
      });
    },
    [setSnackbar]
  );
}
