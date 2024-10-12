import { BrowserRouter as Router } from "react-router-dom";
import { AppBar, Container } from "@mui/material";

import AppHeader from "../common/components/AppHeader";
import Routes from "./Routes";

function App() {
  return (
    <>
      <Router>
        <AppBar position="static">
          <Container maxWidth="md">
            <AppHeader />
          </Container>
        </AppBar>
        <Container maxWidth="md">
          <Routes />
        </Container>
      </Router>
    </>
  );
}

export default App;
