import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';

const PostList = ({ posts }) => (
  <section className="main container">
    <SelectCategory />
    <div className="row">
      {posts.map(post => (
        <article key={post.id} className="post clearfix">
          <h2 className="post-title">{post.title}</h2>
          <p>
            <span className="post-fecha">Category: </span> <span
              className="post-author"
            >{post.category}</span>
          </p>
          <div className="pull-right">
            <Link
              className="btn btn-primary"
              to={{
                pathname: '/post',
                search: `?post=${post.id}`
              }}
            >Read more...</Link>
          </div>
        </article>
            ))}
    </div>
  </section>);

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;
