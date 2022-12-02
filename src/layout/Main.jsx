import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "../global/Sidebar";
import Dashboard from "../components/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Discover from "../components/discover/discover";

const Main = () => {
  const [mode, setMode] = useMode();
  const queryClient = new QueryClient();

  return (
    <ColorModeContext.Provider value={setMode}>
      <ThemeProvider theme={mode}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
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
                    <Route path="/discover" element={<Discover />} />
                  </Routes>
                </Box>
              </Router>
            </ProSidebarProvider>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Main;
