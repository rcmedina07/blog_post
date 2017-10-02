import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Post from '../components/Post';
import Form from '../components/Form';
import Alert from '../components/Alert';


class PostForm extends Component {
  componentWillUnmount = () => {
    this.props.resetCreate();
    this.props.resetDelete();
  }
  onSubmit = (values) => {
    this.props.createPost(values);
  }
  render() {
    const { post,
      isCreating,
      messageCreate,
      isDeleting,
      messageDelete,
      deletePostById } = this.props;
    return (
      <div className="main container">
        {isCreating || messageCreate ?
          <div>
            <Alert
              style={isCreating && messageCreate ?
                'alert-success' : 'alert-danger'}
              message={messageCreate}
            />
            <Post
              post={post}
              isDeleting={isDeleting}
              deletePostById={deletePostById}
              messageDelete={messageDelete}
            />
          </div> : <Form onSubmit={this.props.createPost} />
        }
      </div>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.object.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
  resetCreate: PropTypes.func.isRequired,
  resetDelete: PropTypes.func.isRequired,
  deletePostById: PropTypes.func.isRequired,
  messageCreate: PropTypes.string.isRequired,
  messageDelete: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  const { post, messageCreate, isCreating, isDeleting, messageDelete } = state.post;
  return {
    post,
    isDeleting,
    isCreating,
    messageDelete,
    messageCreate
  };
};

export default withRouter(connect(mapStateToProps, {
  createPost: actions.createPost,
  resetCreate: actions.resetCreate,
  deletePostById: actions.deletePostById,
  resetDelete: actions.resetDelete
})(PostForm));
