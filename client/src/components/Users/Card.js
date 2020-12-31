import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { AccountCircle, Edit, Delete } from "@material-ui/icons";

import useUsersStore from "../../stores/users.store";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
  },
});

const Show = ({ user }) => {
  const { name, email, _id, createdAt } = user;
  const { deleteUser } = useUsersStore();
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <Link to={`/users/${name}`}>
            <AccountCircle /> {name}
          </Link>
        </Typography>
        <Typography variant="body2" component="p">
          Joined {createdAt}
        </Typography>
        <Typography variant="body2" component="p">
          {email}
        </Typography>
      </CardContent>
      <CardActions classes={classes.actions}>
        <Link to={`/users_edit/${name}`}>
          <Edit /> Edit
        </Link>

        <Link
          to="/#"
          onClick={() =>
            window.confirm("Are you sure you want to delete this user?") &&
            deleteUser(_id)
          }
        >
          <Delete /> Delete
        </Link>
      </CardActions>
    </Card>
  );
};

Show.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Show;
