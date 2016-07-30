var express = require('express');
var router = express.Router();
//create model 
var Post = require('../models/post');

module.exports = function (app) {
//get / 首頁 find all
  app.get('/', function (req, res) {
    Post.find(function (err, post) {
      if (err) return console.error(err);
      res.render('index', { title: 'KennyBlog', postcontent: post });
    });

  });
  // get /post:id 搜尋文章 by id
  app.get('/post/:id', function (req, res) {
    Post.find({ _id: req.params.id }, function (err, post) {
      if (err) return console.error(err);
      console.log(post);
      res.render('post', { title: '文章', postcontent: post });
    });
  });
  // get /create 搜尋文章 
  app.get('/create', function (req, res) {
    res.render('create', { title: '新增文章' });
  });

  // post /create 新增一筆文章 
  app.post('/create', function (req, res) {
    var postmodel = new Post ();
    postmodel.addPost({
      Title: req.body.postTitle,
      Author: req.body.postAuthor,
      body: req.body.postBody
    },function(err){
       if (err) return console.error(err);
         res.redirect('/');//必須放在callback
    });
    
  });

  // get /delete:id 刪除文章 by id
  app.get('/delete/:id', function (req, res) {
    Post.remove({ _id: req.params.id 
      },function(err){
       if (err) return console.error(err);
      res.redirect('/');
    });
  });

  // get /edit:id 編輯文章 by id
  app.get('/edit/:id', function (req, res) {
    Post.find({ _id: req.params.id }, function (err, post) {
      if (err) return console.error(err);
      res.render('edit', { title: 'KennyBlog', postcontent: post });
    });

  });
  //post /edit:id 儲存編輯後文章 by id 
  app.post('/edit/:id', function (req, res) {
    var condition = { _id: req.params.id },
		      update = {$set: {body: req.body.postBody,Author :req.body.postAuthor,Title: req.body.postTitle}},
		      options = {multi: true};
          console.log(update);
    Post.update(condition,update,options, function (err, post) {
      res.redirect('/post/'+req.params.id);
    });
  });

};
