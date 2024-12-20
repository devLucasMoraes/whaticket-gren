import { Alert } from "@mui/material";
import {
  OptionsObject,
  SnackbarKey,
  useSnackbar,
  VariantType,
} from "notistack";
import { i18n } from "../../translate/i18n";

type AlertOptions = {
  translate?: boolean;
  translatePath?: string;
  duration?: number;
  preventDuplicate?: boolean;
};

export const useAlert = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const createAlert = (
    message: string,
    variant: VariantType = "default",
    options: AlertOptions = {}
  ) => {
    const {
      translate = true,
      translatePath,
      duration = 6000,
      preventDuplicate = true,
    } = options;

    let displayMessage = message;

    if (translate) {
      const translationKey = translatePath
        ? `${translatePath}.${message}`
        : message;

      if (i18n.exists(translationKey)) {
        displayMessage = i18n.t(translationKey);
      }
    }

    const snackbarOptions: OptionsObject = {
      variant,
      autoHideDuration: duration,
      preventDuplicate,
      anchorOrigin: {
        vertical: "top" as const,
        horizontal: "right" as const,
      },
      content: (key: SnackbarKey) => (
        <Alert
          severity={variant === "default" ? "info" : variant}
          onClose={() => closeSnackbar(key)}
          sx={{ width: "100%" }}
        >
          {displayMessage}
        </Alert>
      ),
    };

    enqueueSnackbar(null, {
      ...snackbarOptions,
      key: message,
    });
  };

  const alert = {
    success: (message: string, options?: AlertOptions) =>
      createAlert(message, "success", options),

    error: (err: any, options?: AlertOptions) => {
      const errorMsg =
        err.response?.data?.message || err.response?.data?.error || err.message;
      createAlert(errorMsg || "An error occurred!", "error", {
        translatePath: "backendErrors",
        ...options,
      });
    },

    info: (message: string, options?: AlertOptions) =>
      createAlert(message, "info", options),

    warning: (message: string, options?: AlertOptions) =>
      createAlert(message, "warning", options),
  };

  return alert;
};
