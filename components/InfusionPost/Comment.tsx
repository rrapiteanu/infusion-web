import React from "react";
import { makeStyles, Avatar, Typography, Link } from "@material-ui/core";
import { getIntials } from "../../lib/utils";
import Timeago from "react-timeago";

const useStyles = makeStyles({
  divider: {
    marginTop: 16,
    marginBottom: 16
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  commentContainer: {
    display: "flex",
    marginBottom: 16
  },
  commentBody: {
    marginTop: 8
  },
  commentContent: {
    padding: 8,
    flexGrow: 1,
    marginLeft: 16,
    borderRadius: 4,
    backgroundColor: "#F4F6F8"
  },
  commentDate: {
    marginLeft: "auto"
  }
});

const Comment = ({ user, body, insertedAt }) => {
  const classes = useStyles({});
  return (
    <div className={classes.commentContainer}>
      <Avatar aria-label="recipe">{getIntials(user.name)}</Avatar>
      <div className={classes.commentContent}>
        <div className={classes.row}>
          <Typography>
            <Link href={`/user/${user.id}`} variant="h6" color="textPrimary">
              {user.name}
            </Link>
          </Typography>
          <Typography variant="body2" className={classes.commentDate}>
            <Timeago date={`${insertedAt}Z`} />
          </Typography>
        </div>
        <Typography variant="body1" className={classes.commentBody}>
          {body}
        </Typography>
      </div>
    </div>
  );
};

export default React.memo(Comment);
