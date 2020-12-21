import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Tabs,
  Tab,
  makeStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import useUsersStore from "../stores/users.store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "50px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  noTextTransform: {
    textTransform: "none",
  },
}));

const Navbar = () => {
  const isAuthenticated = useUsersStore((state) => state.isAuthenticated);
  const user = useUsersStore((state) => state.user);
  const { logoutUser } = useUsersStore();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="default" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            hidden
          >
            <Menu />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Shop
          </Typography>

          <Tabs aria-label="simple tabs example">
            <Tab label="Products" className={classes.noTextTransform} />
            <Tab label="Users" className={classes.noTextTransform} />
          </Tabs>

          {isAuthenticated ? (
            <>
              <Button color="inherit" className={classes.noTextTransform}>
                {user.name}
              </Button>
              <Button
                onClick={() =>
                  window.confirm("Are you sure you want to log out?") &&
                  logoutUser()
                }
                color="inherit"
                className={classes.noTextTransform}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" className={classes.noTextTransform}>
                Log in
              </Button>
              <Button color="inherit" className={classes.noTextTransform}>
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
