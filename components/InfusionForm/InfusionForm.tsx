import React, { useContext, useState } from "react";
import InfusionButton from "../ui/InfusionButton/InfusionButton";
import {
  MusicNoteTwoTone,
  PersonPinCircleOutlined,
  MoreHoriz,
  ImageOutlined,
  OndemandVideoOutlined
} from "@material-ui/icons";
import styled from "styled-components";
import { Paper, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const ActionBar = styled.div`
  padding: 0px 30px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  .buttons {
    color: #c1c1c1;
    font-size: 20px;
    svg {
      cursor: pointer;
      margin-right: 20px;
    }
  }
`;

const Container = styled.div`
  box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-bottom: 50px;
  background-color: white;
  width: 500px;

  .input-area {
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    border-bottom: solid 1px #e8e8e8;

    .profile-picture {
      margin-right: 30px;
    }
  }
`;

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
    flexGrow: 1
  },
  input: {
    width: "100%"
  }
});

const InfusionForm = ({ updateText, sendPost, value, isSending }) => {
  const classes = useStyles({});

  return (
    <Container>
      <div>
        <div className="input-area">
          <Paper elevation={1} className={classes.inputBox}>
            <InputBase
              className={classes.input}
              placeholder="What's on your mind...?"
              value={value}
              onChange={updateText}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  sendPost();
                }
              }}
            />
          </Paper>
        </div>

        <ActionBar>
          <div className="buttons">
            <ImageOutlined />
            <OndemandVideoOutlined />
            <MusicNoteTwoTone />
            <PersonPinCircleOutlined />
            <MoreHoriz />
          </div>
          <InfusionButton
            onClick={sendPost}
            buttonStyle="intense"
            color="green"
          >
            {isSending ? "Posting..." : "Post"}
          </InfusionButton>
        </ActionBar>
      </div>
    </Container>
  );
};

export default React.memo(InfusionForm);
