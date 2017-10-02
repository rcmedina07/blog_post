import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as actions from '../actions/actions';

const posts = (state = {
  posts: [],
  isFetchingPosts: true,
  message: ''
}, action) => {
  switch (action.type) {
  case actions.FETCH_POSTS:
    return {
      ...state,
      message: 'Loading',
      isFetchingPosts: true
    };
  case actions.FETCH_POSTS_SUCCESS:
    return {
      ...state,
      posts: action.posts,
      isFetchingPosts: !action.posts
    };
  case actions.FETCH_POSTS_FAILURE:
    return {
      ...state,
      message: action.message,
      isFetchingPosts: !action.message
    };
  default:
    return state;
  }
};

const post = (state = {
  post: {},
  isFetchingPost: true,
  message: '',
  messageCreate: '',
  isCreating: false,
  messageDelete: '',
  isDeleting: false
}, action) => {
  switch (action.type) {
  case actions.FETCH_POST:
    return {
      ...state,
      message: 'Loading',
      isFetchingPost: true
    };
  case actions.FETCH_POST_SUCCESS:
    return {
      ...state,
      post: action.post,
      isFetchingPost: !action.post
    };
  case actions.FETCH_POST_FAILURE:
    return {
      ...state,
      message: action.message,
      isFetchingPost: action.message
    };
  case actions.CREATE_POST_SUCCESS:
    return {
      ...state,
      post: action.post,
      messageCreate: action.messageCreate,
      isCreating: true
    };
  case actions.CREATE_POST_FAILURE:
    return {
      ...state,
      messageCreate: action.message,
      isCreating: true
    };
  case actions.RESET_POST_CREATE:
    return {
      ...state,
      isCreating: false,
      messageCreate: ''
    };
  case actions.DELETE_POST_SUCCESS:
    return {
      ...state,
      messageDelete: action.message,
      isDeleting: true
    };
  case actions.DELETE_POST_FAILURE:
    return {
      ...state,
      messageDelete: action.message,
      isDeleting: false
    };
  case actions.RESET_POST_DELETE:
    return {
      ...state,
      isDeleting: false,
      messageDelete: ''
    };
  default:
    return state;
  }
};

const categories = (state = {
  category: 'All'
}, action) => {
  switch (action.type) {
  case actions.CHANGE_CATEGORY:
    return {
      ...state,
      category: action.category
    };
  case actions.RESETE_CATEGORY:
    return {
      ...state,
      category: 'All'
    };
  default:
    return state;
  }
};
const user = (state = {
  user: {},
  isLogin: false,
  messageLogin: ''
}, action) => {
  switch (action.type) {
  case actions.LOGIN_SUCCESS:
    return {
      ...state,
      user: action.user,
      isLogin: true
    };
  case actions.LOGIN_FAILURE:
    return {
      ...state,
      messageLogin: action.message,
      isLogin: false
    };
  case actions.LOGOUT:
    return {
      ...state,
      user: {},
      messageLogin: '',
      isLogin: false
    };
  case actions.RESET_LOGUIN:
    return {
      ...state,
      messageLogin: ''
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  posts, post, user, categories, form: formReducer, routing: routerReducer
});

export default rootReducer;
