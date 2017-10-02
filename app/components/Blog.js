import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import LoginForm from '../containers/LoginForm';
import HomePosts from '../containers/HomePosts';
import PostDetails from '../containers/PostDetails';
import PostForm from '../containers/PostForm';

const Blog = () => (
  <Router>
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/posts" component={HomePosts} />
          <Route path="/post" component={PostDetails} />
          <Route path="/newPost" component={PostForm} />
          <Route render={() => <p>Not Found</p>} />
        </Switch>
      </div>
    </div>
  </Router>
  );

export default Blog;
