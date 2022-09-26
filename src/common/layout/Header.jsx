import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.css";
import "../../App.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/store/userSlice";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        navigate(`/search/${e.target.value}`);
      } else {
        alert("Campo vacío");
      }
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        LIVERPOOL
      </Typography>
      <Divider />
      <List>
        <div>
          {user ? (
            <Button color="inherit" component={Link} to="/products">
              Home
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/">
              Iniciar sesión
            </Button>
          )}
        </div>
        <div>
          {user ? (
            <p>{String(user.name).split("@")[0]}</p>
          ) : (
            <Button color="inherit" component={Link} to="/">
              Iniciar sesión
            </Button>
          )}
        </div>
        <div>
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/register">
              Registrase
            </Button>
          )}
        </div>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" className="bg_color">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className="logo__left"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            LIVERPOOL2
          </Typography>
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            variant="filled"
            className="search"
            onKeyDown={handleKeyDown}
          />
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {user ? (
              <span>{String(user.name).split("@")[0]}</span>
            ) : (
              <Button color="inherit" component={Link} to="/">
                Iniciar sesión
              </Button>
            )}
            {user ? (
              <Button color="inherit" component={Link} to="/products">
                Home
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/">
                Iniciar sesión
              </Button>
            )}
            {user ? (
              <Button color="inherit" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/register">
                Registrase
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
