const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');

const authentication = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }
  if (token) {
    jwt.verify(token, 'BlogPostAppRosy', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticated' });
      }
      fs.readFile(`${__dirname}/app/data/` + 'users.json', 'utf8', (err, data) => {
        if (err) {
          return res.status(500).json({
              message: 'Invalid credential'
            });
        }
        const dataJson = JSON.parse(data);
        const user = dataJson.users.filter(u => u.user === decoded.username);
        if (user[0]) {
          req.currentUser = user[0].user;
          next();
        } else {
          return res.status(401).json({
              message: 'User do not exist'
            });
        }
      });
    });
  } else {
    return res.status(403).json({ message: 'You have to login first.' });
  }
};

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data

app.get('/posts', (req, res) => {
  fs.readFile(`${__dirname}/app/data/` + 'posts.json', 'utf8', (err, data) => {
    res.end(data);
  });
});

app.post('/addPost', authentication, (req, res) => {
  const post = req.body;
  fs.readFile(`${__dirname}/app/data/` + 'posts.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Could not save post.'
      });
    }
    const dataJson = JSON.parse(data);
    post.id = dataJson.posts.length + 1;
    dataJson.posts[dataJson.posts.length] = post;
    res.end(JSON.stringify(dataJson));
  });
});

app.get('/:id', (req, res) => {
  fs.readFile(`${__dirname}/app/data/` + 'posts.json', 'utf8', (err, data) => {
     if (err) {
      return res.status(500).json({
        message: 'Could not optaing the post.'
      });
    }
    const dataJson = JSON.parse(data);
    const id = req.params.id;
    const postResp = dataJson.posts.filter(p => p.id == id);
    res.end(JSON.stringify(postResp));
  });
});

app.delete('/:id', authentication, (req, res) => {
  fs.readFile(`${__dirname}/app/data/` + 'posts.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Could not delete the post.'
      });
    }
    const dataJson = JSON.parse(data);
    const id = req.params.id;
    const posts = dataJson.posts.filter(p => p.id !== id);
    dataJson.posts = posts;
    res.end(JSON.stringify(dataJson));
  });
});

app.post('/signin', (req, res) => {
  const userData = req.body;
  const username = userData.user;
  const password = userData.pass;
  fs.readFile(`${__dirname}/app/data/` + 'users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Could not save login'
      });
    }
    const dataJson = JSON.parse(data);
    const user = dataJson.users.filter(u => u.user === username);
    if (user[0]) {
      if (user[0].pass == password) {
          const token = jwt.sign({ username: user[0].user }, 'BlogPostAppRosy');
          res.json({ token });
        } else {
          return res.status(401).json({
            message: 'Invalid credentials'
          });
        }
    } else {
      return res.status(401).json({
         message: 'Invalid credentials'
      });
    }
  });
});


const api = app.listen(8081, () => {
  const host = api.address().address;
  const port = api.address().address;
  console.log(`runing${host}${port}`);
});
