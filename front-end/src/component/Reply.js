import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  ContentState,
  Editor,
  EditorState,
  getDefaultKeyBinding,
} from "draft-js";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Moment from "react-moment";
import "../styles/Reply.css";
import "../../node_modules/draft-js/dist/Draft.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import { useDispatch, useSelector } from "react-redux";
import { updateReply, deleteReply } from "../actions/commentActions";

const Reply = ({
  replyId,
  commentId,
  replierId,
  avatarReplier,
  replierProNumber,
  replierAddress,
  replier,
  reply,
  replyTime,
  setShowAddReply,
  setAddReplyEditorState,
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(reply))
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(reply))
    );
  }, [reply]);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleOptionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const replyOptions = ["Edit", "Remove"];

  const [chosenOption, setChosenOption] = useState(null);

  const handleOnclickOption = (e) => {
    setChosenOption(e);
    if (e === "Edit") {
      setEditorState(
        EditorState.moveFocusToEnd(
          EditorState.createWithContent(ContentState.createFromText(reply))
        )
      );
    } else {
      if (e === "Remove") {
        console.log(replyId);
        dispatch(deleteReply(replyId, commentId));
      }
    }
  };

  const myKeyBindingFn = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return "save";
    } else {
      if (e.keyCode === 27) {
        return "cancel";
      }
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command) => {
    if (command === "save") {
      dispatch(
        updateReply(editorState.getCurrentContent().getPlainText(), replyId)
      );
      setChosenOption(null);
      return "handled";
    } else {
      if (command === "cancel") {
        setEditorState(
          EditorState.createWithContent(ContentState.createFromText(reply))
        );
        setChosenOption(null);
        return "handled";
      }
    }
    return "not-handled";
  };

  return (
    <div className="replyContainer">
      <div className="reply">
        <div className="reply__left">
          <Avatar className="reply__avatar" src={avatarReplier} />
        </div>
        <div className="reply__right">
          <div className="replyContent__top">
            <div className="replyContent">
              <h4 className="reply__name">
                <div className="replierPreview">
                  <div className="replierPreview__left">
                    <Avatar
                      className="reply__avatar"
                      style={{ width: 100, height: 100 }}
                      src={avatarReplier}
                    />
                  </div>
                  <div className="replierPreview__right">
                    <h4 className="replierPreview__name">{replier}</h4>
                    <div className="replierPreview__address">
                      <LocationOnIcon />
                      <p>{replierAddress}</p>
                    </div>
                    <div className="replierPreview__phone">
                      <LocalPhoneIcon />
                      <p>{replierProNumber}</p>
                    </div>
                  </div>
                </div>
                {replier}
              </h4>
              <Editor
                readOnly={chosenOption === "Edit" ? false : true}
                className="reply__body"
                editorState={editorState}
                placeholder="Write a reply..."
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={myKeyBindingFn}
              />
            </div>
            {chosenOption !== "Edit" && (
              <div className="replyOption">
                {auth.user._id === replierId && (
                  <IconButton onClick={handleOptionClick}>
                    <MoreHorizIcon />
                  </IconButton>
                )}

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleOptionClose}
                >
                  {replyOptions.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={() => {
                        handleOptionClose();
                        handleOnclickOption(option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}
          </div>
          {chosenOption === "Edit" && (
            <div className="onEditReply">
              Press <span> enter </span> to send or <span> esc </span> to cancel
            </div>
          )}
          {chosenOption !== "Edit" && (
            <div className="replyContent__bottom">
              {auth.isAuth && (
                <h6
                  onClick={() => {
                    setShowAddReply(true);
                    setAddReplyEditorState(
                      EditorState.moveFocusToEnd(EditorState.createEmpty())
                    );
                  }}
                >
                  Reply
                </h6>
              )}
              <Moment className="replyTime" fromNow>
                {replyTime}
              </Moment>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
