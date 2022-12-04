import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import Topbar from "../global/Topbar";
import { ColorModeContext, useMode } from "../theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "../global/Sidebar";
import Dashboard from "../components/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Discover from "../components/discover/discover";
import Detail from "../components/details/Detail";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/checkout/Checkout";
import Purchase from "../components/purchased/Purchase";
import Categories from "../components/categories/Categories";

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
                    <Route path="/details/:title" element={<Detail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout/:id" element={<Checkout />} />
                    <Route path="/purchased" element={<Purchase />} />
                    <Route path="/category" element={<Categories />} />
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
