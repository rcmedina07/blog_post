import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/auth';

// Post list
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Create new post
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const RESET_POST_CREATE = 'RESET_POST_CREATE';

// Fetch Post
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';


// Delete post
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const RESET_POST_DELETE = 'RESET_POST_DELETE';

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const RESETE_CATEGORY = 'RESETE_CATEGORY';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const RESET_LOGUIN = 'RESET_LOGUIN';


const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

const fetchPosts = makeActionCreator(FETCH_POSTS);
const fetchPostsSuccess = makeActionCreator(FETCH_POSTS_SUCCESS, 'posts');
const fetchPostsFailure = makeActionCreator(FETCH_POSTS_FAILURE, 'message');


const fetchPost = makeActionCreator(FETCH_POST);
const fetchPostSuccess = makeActionCreator(FETCH_POST_SUCCESS, 'post');
const fetchPostFailure = makeActionCreator(FETCH_POST_FAILURE, 'message');

const deletePostSuccess = makeActionCreator(DELETE_POST_SUCCESS, 'message');
const deletePostFailure = makeActionCreator(DELETE_POST_FAILURE, 'message');


const createPostSuccess = makeActionCreator(CREATE_POST_SUCCESS, 'post', 'messageCreate');
const createPostFailure = makeActionCreator(CREATE_POST_FAILURE, 'messageCreate');

export const changeCategory = makeActionCreator(CHANGE_CATEGORY, 'category');
export const reseteCategory = makeActionCreator(RESETE_CATEGORY);

export const resetCreate = makeActionCreator(RESET_POST_CREATE);
export const resetDelete = makeActionCreator(RESET_POST_DELETE);
export const resetLogin = makeActionCreator(RESET_LOGUIN);

export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'user');
const loginFailure = makeActionCreator(LOGIN_FAILURE, 'message');
const logout = makeActionCreator(LOGOUT);

const url = 'http://127.0.0.1:8081/';

export const getPosts = () => (dispatch) => {
  dispatch(fetchPosts);
  return axios.get('http://127.0.0.1:8081/posts')
    .then((response) => {
      dispatch(fetchPostsSuccess(response.data.posts));
    },
    err => dispatch(fetchPostsFailure, err.response.data.message)
    );
};

export const getPost = id => (dispatch) => {
  dispatch(fetchPost());
  return axios.get(url + id)
    .then(response => dispatch(fetchPostSuccess(response.data[0])),
    err => dispatch(fetchPostFailure(err.response.data.message))
    );
};

export const createPost = post => dispatch => axios.post('http://127.0.0.1:8081/addPost', post).then((response) => {
  dispatch(createPostSuccess(response.data.posts[response.data.posts.length - 1], 'Create has succeeded.'));
},
  err => dispatch(createPostFailure(err.response.data.message)));

export const deletePostById = id => dispatch => axios.delete(url + id)
  .then(dispatch(deletePostSuccess('Delete has succeeded')),
  err => dispatch(deletePostFailure(err.response.data.message)));

export const loginUser = user => dispatch => axios.post('http://127.0.0.1:8081/signin', user).then((response) => {
  localStorage.setItem('jwtToken', response.data.token);
  setAuthorizationToken(response.data.token);
  const userResponse = jwtDecode(response.data.token);
  userResponse.username = userResponse.username.charAt(0).toUpperCase() + userResponse.username.slice(1);
  dispatch(loginSuccess(userResponse, 'Login has succeeded.'));
},
  err => dispatch(loginFailure(err.response.data.message)));

export const logOut = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(logout());
};
