import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#a000ff",
      main: "#a000ff",
      dark: "#a000ff"
    },
    secondary: {
      light: "#69696a",
      main: "#28282a",
      dark: "#1e1e1f"
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700]
    }
  },
  typography: {
    fontFamily: "'Roboto Condensed','Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700
  }
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: rawTheme.typography.fontFamily
  // textTransform: "uppercase"
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200]
    }
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightMedium
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 14
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14
    }
  }
};

export default theme;
