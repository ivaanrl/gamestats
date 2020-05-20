import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#37464f",
      light: "#62717b",
      dark: "#101f27",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
    secondary: {
      main: "#9ccc64",
      light: "#cfff94",
      dark: "#6b9b36",
      contrastText: "#000000",
    },
    info: {
      main: "#ffffff",
    },
    warning: yellow,
    error: red,
    background: {
      paper: "#101f27",
      default: "#37464f",
    },
  },
});

export default Theme;
