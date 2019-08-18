import React, { Fragment } from "react";
import {
  Avatar,
  Paper,
  InputBase,
  IconButton,
  Divider
} from "@material-ui/core";
import { getIntials } from "../../lib/utils";
import { makeStyles } from "@material-ui/styles";
import { Send, CameraAltOutlined, AttachFile } from "@material-ui/icons";

const placeholder = "https://i.pravatar.cc/300";

const useStyles = makeStyles({
  divider: {
    marginTop: 16,
    marginBottom: 16
  },
  dividerVertical: {
    width: 1,
    height: 24
  },
  row: {
    display: "flex",
    alignItems: "center"
  },

  inputBox: {
    padding: "4px 16px",
    flexGrow: 1,
    marginLeft: 16
  },
  input: {
    width: "100%"
  }
});

const CommentForm = ({ inputValue, onInputChange, sendComment }) => {
  const currentUser = { name: "Robert Rapiteanu" };
  const classes = useStyles({});

  return (
    <Fragment>
      <Divider className={classes.divider} />
      <div className={classes.row}>
        <Avatar aria-label="recipe"> {getIntials(currentUser.name)}</Avatar>
        <Paper elevation={1} className={classes.inputBox}>
          <InputBase
            className={classes.input}
            placeholder="Write a comment..."
            value={inputValue}
            onChange={onInputChange}
            onKeyPress={event => {
              if (event.key === "Enter") {
                sendComment();
              }
            }}
          />
        </Paper>
        <IconButton aria-label="send" onClick={sendComment}>
          <Send />
        </IconButton>
        {/* <Divider className={classes.dividerVertical} />
        <IconButton edge="end" aria-label="send">
          <CameraAltOutlined />
        </IconButton>
        <IconButton edge="end" aria-label="send">
          <AttachFile />
        </IconButton> */}
      </div>
    </Fragment>
  );
};
export default React.memo(CommentForm);
