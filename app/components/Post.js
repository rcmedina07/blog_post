import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from './Alert';

const Post = ({ post, isDeleting, deletePostById, messageDelete }) => (
  <div className="main container">
    {isDeleting || messageDelete ? <Alert style={isDeleting && messageDelete ? 'alert-success' : 'alert-danger'} message={messageDelete} />
      : <article className="post clearfix">
        <h2 className="post-title">{post.title}</h2>
        <p>
          <span className="post-fecha">Category: </span> <span
            className="post-author"
          >{post.category}</span>
        </p>
        <p className="post-content text-justified">{post.content}</p>
        <div className="btn-group pull-right">
          <Link
            className="btn btn-primary"
            to="/posts"
          ><span className="glyphicon glyphicon-chevron-left" />Back</Link>
          <button
            className="btn btn-danger"
            onClick={() => deletePostById(post.id)}
          >Delete <span className="glyphicon glyphicon-trash" /></button>
        </div>
      </article>
    }
  </div>
);

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  deletePostById: PropTypes.func.isRequired,
  messageDelete: PropTypes.string.isRequired
};

export default Post;
