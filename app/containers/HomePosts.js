import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import PostList from '../components/PostList';

class HomePosts extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  }
  componentWillUnmount = () => {
    this.props.reseteCategory();
  }
  render() {
    const { posts, isFetchingPosts, message } = this.props;
    return (
      <div>
        {isFetchingPosts && message ? <div className="alert alert-success" role="alert">{message}</div> : <PostList posts={posts} />}
      </div>
    );
  }
}

HomePosts.propTypes = {
  posts: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  isFetchingPosts: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  reseteCategory: PropTypes.func.isRequired
};

const getPosts = (posts, category) => {
  if (category === 'All') { return posts; }
  return posts.filter(post => post.category === category);
};

const mapStateToProps = (state) => {
  const { posts, isFetchingPosts, message } = state.posts;
  const { category } = state.categories;
  return {
    posts: getPosts(posts, category),
    isFetchingPosts,
    message
  };
};

export default withRouter(connect(mapStateToProps,
  { getPosts: actions.getPosts,
    reseteCategory:
  actions.reseteCategory })(HomePosts));
