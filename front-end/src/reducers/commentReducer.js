import {
  COMMENT_SUCCESS,
  COMMENT_FAIL,
  GET_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  REPLY_SUCCESS,
  REPLY_FAIL,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_SUCCESS,
  REMOVE,
} from "../actions/types";

let initState = {
  comments: [],
  error: [],
};

const CommentReducer = (state = initState, action) => {
  switch (action.type) {
    case COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        error: [],
      };

    case COMMENT_FAIL:
      return {
        ...state,
        isComment: false,
        error: action.payload,
      };

    case REPLY_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.reply_to) {
            return {
              ...el,
              replies: [...el.replies, action.payload],
            };
          }
          return el;
        }),
        error: [],
      };

    case REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.id) {
            return {
              ...el,
              text: action.payload.text,
            };
          }
          return el;
        }),
        error: [],
      };

    case UPDATE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_REPLY_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.reply_to) {
            return {
              ...el,
              replies: el.replies.map((r) => {
                if (r._id === action.payload.id) {
                  return {
                    ...r,
                    text: action.payload.text,
                  };
                }
                return r;
              }),
            };
          }
          return el;
        }),
        error: [],
      };

    case UPDATE_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((el) => el._id !== action.payload.id),
        error: [],
      };

    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REPLY_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.comment) {
            return {
              ...el,
              replies: el.replies.filter((r) => r._id !== action.payload.id),
            };
          }
          return el;
        }),
        error: [],
      };

    case DELETE_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: [],
      };

    case GET_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case REMOVE:
      return {
        comments: [],
        error: [],
      };

    default:
      return state;
  }
};

export default CommentReducer;
