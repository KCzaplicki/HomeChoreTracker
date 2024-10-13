import { BrowserRouter as Router } from "react-router-dom";
import { AppBar, Container } from "@mui/material";

import Routes from "./Routes";
import AppHeader from "../common/components/AppHeader";
import { AuthProvider } from "../features/auth/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppBar position="static">
          <Container maxWidth="lg">
            <AppHeader />
          </Container>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Routes />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
