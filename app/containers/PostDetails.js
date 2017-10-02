import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Post from '../components/Post';
import Alert from '../components/Alert';


class PostDetails extends Component {
  componentDidMount = () => {
    const id = queryString.parse(this.props.location.search);
    this.props.getPost(id.post);
  }
  componentWillUnmount = () => {
    this.props.resetDelete();
  }
  render() {
    const { post,
      isFetchingPost,
      message,
      isDeleting,
      messageDelete,
      deletePostById } = this.props;
    return (
      <div>
        {isFetchingPost ?
          <Alert
            style={isFetchingPost && message ?
              'alert-success' : 'alert-danger'}
            message={message}
          />
          : <Post
            post={post}
            isDeleting={isDeleting}
            deletePostById={deletePostById}
            messageDelete={messageDelete}
          />}
      </div>
    );
  }
}

PostDetails.propTypes = {
  message: PropTypes.string.isRequired,
  isFetchingPost: PropTypes.bool.isRequired,
  getPost: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  messageDelete: PropTypes.string.isRequired,
  resetDelete: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { post, isFetchingPost, message, isDeleting, messageDelete } = state.post;
  return {
    post,
    isFetchingPost,
    message,
    isDeleting,
    messageDelete
  };
};

export default withRouter(connect(mapStateToProps, {
  getPost: actions.getPost,
  deletePostById: actions.deletePostById,
  resetDelete: actions.resetDelete
})(PostDetails));
