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
import Reply from "./Reply";
import "../styles/Comment.css";
import "../../node_modules/draft-js/dist/Draft.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  postReply,
  updateComment,
} from "../actions/commentActions";

const Comment = ({
  commenterId,
  commentId,
  avatarCommenter,
  commenter,
  commenterProNumber,
  commenterAddress,
  comment,
  commentTime,
  replies,
}) => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(comment))
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(comment))
    );
  }, [comment]);

  const auth = useSelector((state) => state.auth);

  const [addReplyEditorState, setAddReplyEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [showAddReply, setShowAddReply] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleOptionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const commentOptions = ["Edit", "Remove"];

  const [chosenOption, setChosenOption] = useState(null);

  const handleOnclickOption = (e) => {
    setChosenOption(e);
    if (e === "Edit") {
      setEditorState(
        EditorState.moveFocusToEnd(
          EditorState.createWithContent(ContentState.createFromText(comment))
        )
      );
    } else {
      if (e === "Remove") {
        console.log(commentId);
        dispatch(deleteComment(commentId));
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
        updateComment(editorState.getCurrentContent().getPlainText(), commentId)
      );
      setChosenOption(null);
      return "handled";
    } else {
      if (command === "cancel") {
        setEditorState(
          EditorState.createWithContent(ContentState.createFromText(comment))
        );
        setChosenOption(null);
        return "handled";
      }
    }
    return "not-handled";
  };

  const replyKeyBindingFn = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return "save";
    } else {
      if (e.keyCode === 27) {
        return "cancel";
      }
    }
    return getDefaultKeyBinding(e);
  };

  const handleReplyKeyCommand = (command) => {
    if (command === "save") {
      dispatch(
        postReply(
          addReplyEditorState.getCurrentContent().getPlainText(),
          commentId
        )
      );
      setShowAddReply(false);
      setAddReplyEditorState(EditorState.createEmpty());
      return "handled";
    } else {
      if (command === "cancel") {
        setAddReplyEditorState(EditorState.createEmpty());
        setShowAddReply(false);
        return "handled";
      }
    }
    return "not-handled";
  };

  return (
    <div className="commentContainer">
      <div className="comment">
        <div className="comment__left">
          <Avatar className="comment__avatar" src={avatarCommenter} />
        </div>
        <div className="comment__right">
          <div className="commentContent__top">
            <div className="commentContent">
              <h4 className="comment__name">
                <div className="commenterPreview">
                  <div className="commenterPreview__left">
                    <Avatar
                      className="comment__avatar"
                      style={{ width: 100, height: 100 }}
                      src={avatarCommenter}
                    />
                  </div>
                  <div className="commenterPreview__right">
                    <h4 className="commenterPreview__name">{commenter}</h4>
                    <div className="commenterPreview__address">
                      <LocationOnIcon />
                      <p>{commenterAddress}</p>
                    </div>
                    <div className="commenterPreview__phone">
                      <LocalPhoneIcon />
                      <p>{commenterProNumber}</p>
                    </div>
                  </div>
                </div>
                {commenter}
              </h4>
              <Editor
                readOnly={chosenOption === "Edit" ? false : true}
                className="comment__body"
                editorState={editorState}
                placeholder="Write a comment..."
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={myKeyBindingFn}
              />
            </div>
            {chosenOption !== "Edit" && (
              <div className="commentOption">
                {auth.user._id === commenterId && (
                  <IconButton onClick={handleOptionClick}>
                    <MoreHorizIcon />
                  </IconButton>
                )}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleOptionClose}
                >
                  {commentOptions.map((option) => (
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
            <div className="onEditComment">
              Press <span> enter </span> to send or <span> esc </span> to cancel
            </div>
          )}
          {chosenOption !== "Edit" && (
            <div className="commentContent__bottom">
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
              <Moment className="commentTime" fromNow>
                {commentTime}
              </Moment>
            </div>
          )}
        </div>
      </div>
      {replies &&
        replies.map((el, i) => (
          <Reply
            key={i}
            commentId={commentId}
            replyId={el._id}
            replierId={el.owner._id}
            avatarReplier={el.owner.avatar}
            replier={el.owner.name}
            replierAddress={el.owner.address}
            replierProNumber={el.owner.proNumber}
            reply={el.text}
            replyTime={el.create__at}
            setShowAddReply={setShowAddReply}
            setAddReplyEditorState={setAddReplyEditorState}
          />
        ))}
      {showAddReply && (
        <div className="addReply">
          <div className="addReply__left">
            <Avatar className="addReply__avatar" src={auth.user.avatar} />
          </div>
          <div className="addReply__right">
            <div className="addReplyContent__top">
              <Editor
                className="addReply__body"
                editorState={addReplyEditorState}
                placeholder="Write your reply..."
                onChange={setAddReplyEditorState}
                handleKeyCommand={handleReplyKeyCommand}
                keyBindingFn={replyKeyBindingFn}
              />
            </div>

            <div className="addReplyContent__bottom">
              Press <span> enter </span> to send or <span> esc </span> to cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
