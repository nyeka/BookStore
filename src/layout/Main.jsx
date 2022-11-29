import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "../global/Sidebar";
import Dashboard from "../components/dashboard/Dashboard";

const Main = () => {
  const [mode, setMode] = useMode();

  return (
    <ColorModeContext.Provider value={setMode}>
      <ThemeProvider theme={mode}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            gap: "20px",
            position: "relative",
          }}
        >
          <ProSidebarProvider>
            <Router>
              <Layout />
              <Box
                sx={{
                  width: "100%",
                  marginLeft: "260px",
                }}
              >
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </Box>
            </Router>
          </ProSidebarProvider>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Main;
