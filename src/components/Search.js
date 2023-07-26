import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import LiveTvIcon from "@mui/icons-material/LiveTv";

import { useGlobalContext } from "./context";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const pages = [
  { title: "Now Playing", url: "/nowplaying" },
  { title: "Top Rated", url: "/toprated" },
  { title: "Popular", url: "/popular" },
  { title: "Upcoming", url: "/upcoming" },
];

function Search() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();
  const { query, setQuery, isError, options } = useGlobalContext();
  const handleChange = (e, val) => {
    console.log("eeee", val);
    navigate(`/movie/${val?.id}`);
  };
  return (
    <div>
      <AppBar position="static" className="color">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" className="active">
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <LiveTvIcon /> Home Page
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.url}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="style" to={page.url}>
                    {page.title}
                  </Link>
                </Button>
              ))}
            </Box>

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
                  <MenuItem key={page.url} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={page.url}>{page.title}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <LiveTvIcon />
              Home Page
            </Typography>
            <div className="center">
              <div>
                <Autocomplete
                  className="radius"
                  disablePortal
                  id="combo-box-demo"
                  options={options}
                  onChange={handleChange}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Movies"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  )}
                />
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Search;
