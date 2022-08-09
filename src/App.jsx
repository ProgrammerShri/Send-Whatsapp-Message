import Dashboard from "./pages/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff4081",
    },
  },

  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },

});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <div>
          <Dashboard />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
