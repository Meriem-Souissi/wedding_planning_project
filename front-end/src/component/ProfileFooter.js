import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/ProfileFooter.css";
import Comment from "./Comment";
import { Editor, EditorState, getDefaultKeyBinding } from "draft-js";
import { Avatar } from "@material-ui/core";
import { postComment } from "../actions/commentActions";

const ProfileFooter = ({ id, comments }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addCommentInstructions, setAddCommentInstructions] = useState(false);
  const [addCommentEditorState, setAddCommentEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const addComment = useRef();

  const handleCommentKeyCommand = (command) => {
    if (command === "save") {
      dispatch(
        postComment(
          addCommentEditorState.getCurrentContent().getPlainText(),
          id
        )
      );
      setAddCommentInstructions(false);
      setAddCommentEditorState(EditorState.createEmpty());
      return "handled";
    } else {
      if (command === "cancel") {
        setAddCommentEditorState(EditorState.createEmpty());
        setAddCommentInstructions(false);
        return "handled";
      }
    }
    return "not-handled";
  };

  const commentKeyBindingFn = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return "save";
    } else {
      if (e.keyCode === 27) {
        return "cancel";
      }
    }
    return getDefaultKeyBinding(e);
  };

  useEffect(() => {
    if (auth.isAuth && !addCommentInstructions) {
      addComment.current.blur();
    }
  }, [auth, addCommentInstructions]);

  const handleBlur = () => {
    if (!addCommentEditorState.getCurrentContent().getPlainText()) {
      setAddCommentInstructions(false);
    }
  };

  return (
    <div className="profileFooter">
      {comments.map((el, i) => (
        <Comment
          key={i}
          commenterId={el.owner._id}
          commentId={el._id}
          avatarCommenter={el.owner.avatar}
          commenter={el.owner.name}
          commenterAddress={el.owner.address}
          commenterProNumber={el.owner.proNumber}
          comment={el.text}
          commentTime={el.create__at}
          replies={el.replies}
        />
      ))}
      {auth.isAuth && (
        <div className="addComment">
          <div className="addComment__left">
            <Avatar className="addComment__avatar" src={auth.user.avatar} />
          </div>
          <div className="addComment__right">
            <div className="addCommentContent__top">
              <Editor
                ref={addComment}
                onFocus={() => setAddCommentInstructions(true)}
                onBlur={handleBlur}
                className="addComment__body"
                editorState={addCommentEditorState}
                placeholder="Write your comment..."
                onChange={setAddCommentEditorState}
                handleKeyCommand={handleCommentKeyCommand}
                keyBindingFn={commentKeyBindingFn}
              />
            </div>
            {addCommentInstructions && (
              <div className="addCommentContent__bottom">
                Press <span> enter </span> to send or <span> esc </span> to
                cancel
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileFooter;
