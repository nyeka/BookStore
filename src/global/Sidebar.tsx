import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Bookslist, Data } from "./data";
import { tokens } from "../theme";
import img from "../components/images/tampan.png";
import Divider from "@mui/material/Divider";
import { AppContext } from "../App";
import { useContext } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  to: string;
  selected: string;
  setSelected: (title: string) => void;
  icon: JSX.Element;
}

const Item = ({ title, to, selected, setSelected, icon }: IProps) => {
  const active = selected === title;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      routerLink={<Link to={to} />}
      active={selected === title}
      icon={icon}
      style={{
        color: active ? "#fff" : colors.grey[100],
        cursor: "pointer",
        backgroundColor: active ? colors.primary[600] : "transparent",
      }}
      onClick={() => setSelected(title)}
    >
      <Typography> {title}</Typography>
    </MenuItem>
  );
};

export default function Layout() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isColapsed, setIsColapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState("Dashboard");
  const { collapseSidebar } = useProSidebar();
  const { setAuth } = useContext(AppContext);
  const name: any = auth.currentUser?.displayName;
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    navigate("/");
    localStorage.clear();
    setAuth(false);
  };

  return (
    <Sidebar
      defaultCollapsed={isColapsed}
      backgroundColor={colors.primary[400]}
      style={{
        height: "100vh",
        position: "fixed",
        borderRight: "none",
        zIndex: 1,
      }}
    >
      <Menu>
        <MenuItem
          onClick={() => setIsColapsed(!isColapsed)}
          icon={isColapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
            backgroundColor: colors.primary[400],
          }}
        >
          {!isColapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
              color={colors.grey[100]}
            >
              <Typography variant="h6" color={colors.grey[100]}>
                IQRO
              </Typography>
              <IconButton onClick={() => collapseSidebar(!isColapsed)}>
                <MenuOutlinedIcon
                  style={{
                    color: colors.grey[100],
                  }}
                />
              </IconButton>
            </Box>
          )}
        </MenuItem>
        {!isColapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={auth.currentUser?.photoURL || img}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{
                  m: "10px 0 0 0",
                  fontSize: "18px",
                }}
              >
                Bookstore
              </Typography>
              <Typography
                variant="h6"
                color={colors.greenAccent[500]}
                sx={{
                  fontSize: "16px",
                }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        )}
        {!isColapsed && (
          <Typography
            variant="h6"
            sx={{
              paddingLeft: "30px",
              marginBottom: "13px",
            }}
          >
            Browse
          </Typography>
        )}
        {Data.map((item, index) => {
          return (
            <Item
              key={index}
              {...item}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
        {!isColapsed && (
          <Box
            sx={{
              margin: "23px 0 0",
            }}
          >
            <Divider
              light
              sx={{
                margin: "30px 0",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                paddingLeft: "30px",
                marginBottom: "13px",
              }}
            >
              Your Books
            </Typography>
          </Box>
        )}
        {Bookslist.map((item, index) => {
          return (
            <Item
              key={index}
              {...item}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
        {!isColapsed && (
          <Divider
            light
            sx={{
              margin: "30px 0",
            }}
          />
        )}
        <MenuItem
          icon={<BiLogOut />}
          style={{
            backgroundColor: colors.primary[400],
          }}
          onClick={logout}
        >
          Log out
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
