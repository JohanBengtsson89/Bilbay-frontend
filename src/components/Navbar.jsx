import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { CssBaseline } from "@mui/material";

/* const isLoggedIn = false; */
const pages = [
  { name: "Home", page: "/" },
  { name: "Auctions", page: "/auctions" },
  { name: "Submit auction", page: "/submit" },
  { name: "About us", page: "/about" },
];

const colorStyleLogo = {
  backgroundColor: "#D88D8D",
  color: "white",
  borderRadius:"5px",
  padding:"4px"
};

// pages.map((page) => console.log(page.name, page.page));

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const settings = ["Profile", "Logout"];

  const {
    state: { user },
    logout,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const colorStyle = {
    backgroundColor: "#506081",
  };

  const handleSettingsClick = (setting) => {
    if (setting === "Logout") {
      logout();
      setTimeout(() => {
        navigate("loginpage");
      }, 1000);

      setIsLoggedIn(false);
    } else if (setting === "Login") {
      setIsLoggedIn(true);
    } else if (setting === "Profile") {
      navigate("userpage");
    }
    handleCloseUserMenu();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="sticky" style={{ margin: 0 }}>
        <Container maxWidth="xxl" style={colorStyle}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                ...colorStyleLogo,
                fontSize: "1.5rem",
              }}
            >
              <DirectionsCarIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1, mt: 0.5, fontSize: "2rem", }}
              />
              Bilbay
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link to={page.page}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                ...colorStyleLogo,
              }}
            >
              Bilbay
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  key={page.name}
                  to={page.page}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    onClick={handleCloseNavMenu}
                    variant="h8"
                    component="div"
                    sx={{
                      color: "white",
                      mr: 2,
                      transition: "text-decoration 0.1s ease-in-out, color 0.1s ease-in-out",
                      transitionDelay: "0.1s",
                      "&:hover": {
                        color: "#A3B8CB",
                      },
                    }}
                  >
                    {page.name}
                  </Typography>
                </Link>
              ))}
            </Box>

            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.username}
                      src="/static/images/avatar/2.jpg"
                      sx={{
                        backgroundColor: "#CAD7E3",
                        color: "#506081",
                        padding: "5px",
                      }}
                    >
                      {user.username && user.username.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleSettingsClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <div className="flex gap-5">
                <div>
                  <a
                    href="/loginpage"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "black",
                      backgroundColor: "#A3B8CB",
                      transition: "background-color 0.3s",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#7F98B7")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#A3B8CB")
                    }
                  >
                    Login
                  </a>
                </div>
                <div>
                  <a
                    href="/register"
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      color: "black",
                      backgroundColor: "#A3B8CB",
                      transition: "background-color 0.3s",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#7F98B7")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#A3B8CB")
                    }
                  >
                    Register
                  </a>
                </div>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default NavBar;
