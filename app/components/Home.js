import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="jumbotron">
    <div className="container">
      <h1>Blog post</h1>
      <p>Hi welcome to the Blog Post!</p>
      <Link to="/posts" className="btn btn-primary btn-lg">Start Posting</Link>
    </div>
  </div>
);

export default Home;
