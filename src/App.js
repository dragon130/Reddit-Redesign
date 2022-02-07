import Page from "./app";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./themes/default";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
