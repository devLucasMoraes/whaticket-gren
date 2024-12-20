import { ptBR as MaterialLocale } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { ptBR as DataGridLocale } from "@mui/x-data-grid/locales";

const baselightTheme = createTheme(
  {
    direction: "ltr",
    palette: {
      primary: {
        main: "#25D366", // Cor principal do WhatsApp
        light: "#DCF8C6", // Cor de fundo das mensagens enviadas
        dark: "#128C7E", // Versão mais escura do verde WhatsApp
      },
      secondary: {
        main: "#34B7F1", // Cor azul do WhatsApp (usado em links e elementos secundários)
        light: "#E8F7FF",
        dark: "#0C95D4",
      },
      success: {
        main: "#25D366", // Mesmo verde do WhatsApp para consistência
        light: "#E7F7ED",
        dark: "#128C7E",
        contrastText: "#ffffff",
      },
      info: {
        main: "#34B7F1", // Azul do WhatsApp
        light: "#EBF3FE",
        dark: "#0C95D4",
        contrastText: "#ffffff",
      },
      error: {
        main: "#FF4B4B", // Vermelho para erros e alertas críticos
        light: "#FFE5E5",
        dark: "#E03E3E",
        contrastText: "#ffffff",
      },
      warning: {
        main: "#FFA200", // Laranja para avisos
        light: "#FFF3E0",
        dark: "#E67E00",
        contrastText: "#ffffff",
      },
      grey: {
        100: "#F7F7F7", // Cor de fundo do WhatsApp Web
        200: "#ECECEC",
        300: "#E1E1E1",
        400: "#8596A0", // Cor do texto secundário do WhatsApp
        500: "#667781", // Cor de subtítulos do WhatsApp
        600: "#3B4A54", // Cor principal para textos
      },
      text: {
        primary: "#3B4A54", // Cor principal dos textos no WhatsApp
        secondary: "#667781", // Cor secundária dos textos
      },
      action: {
        disabledBackground: "rgba(73,82,88,0.12)",
        hoverOpacity: 0.04,
        hover: "#F5F6F6", // Cor de hover do WhatsApp
      },
      divider: "#E9EDEF", // Cor dos divisores no WhatsApp
    },
    typography: {
      h1: {
        fontWeight: 600,
        fontSize: "2.25rem",
        lineHeight: "2.75rem",
      },
      h2: {
        fontWeight: 600,
        fontSize: "1.875rem",
        lineHeight: "2.25rem",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: "1.75rem",
      },
      h4: {
        fontWeight: 600,
        fontSize: "1.3125rem",
        lineHeight: "1.6rem",
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: "1.6rem",
      },
      h6: {
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: "1.2rem",
      },
      button: {
        textTransform: "capitalize",
        fontWeight: 400,
      },
      body1: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: "1.334rem",
      },
      body2: {
        fontSize: "0.75rem",
        letterSpacing: "0rem",
        fontWeight: 400,
        lineHeight: "1rem",
      },
      subtitle1: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 400,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
            boxShadow:
              "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "7px",
          },
        },
      },
    },
  },
  DataGridLocale,
  MaterialLocale
);

export { baselightTheme };
