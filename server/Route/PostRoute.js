var express = require('express');
var router = express.Router();
var Post = require('../Model/Post');
var mongoose = require('mongoose');

router.get('/post/getList', function (req, res, next) {
  Post.find({
    userId: req.query.email
  }).select('caption image').sort({ updated: 'desc' }).exec(function (err, posts) {
    if (err) {
      return next(err);
    }
    console.log(posts);
    res.send(posts);
    return next(posts);
  })
});

router.get('/post/getPosts', function (req, res, next) {
  Post.find().select('caption image userId').sort({ updated: 'desc' }).exec(function (err, posts) {
    if (err) {
      return next(err);
    }
    console.log(posts);
    res.send(posts);
    return next(posts);
  })
});

router.post('/post/sendComment', (req, res, next) => {
  if (req.query.comment === undefined) {
    res.send(null);
    return next();
  }

  if (req.query.userId === undefined) {
    res.send(null);
    return next();
  }

  if (req.query.postId === undefined) {
    res.send(null);
    return next();
  }

  if (req.query.userName === undefined) {
    console.log('userName not found');
    res.send(null);
    return next();
  }

  let userId = req.query.userId;
  let comment = req.query.comment;
  let postId = req.query.postId;
  let userName = req.query.userName;
  if (mongoose.Types.ObjectId.isValid(postId)) {
    console.log(postId);
    Post.findByIdAndUpdate(postId, { $push: { comments: { authur: userName, userId: userId, comment: comment } } })
      .then((docs) => {
        if (docs) {
          console.log('DONE');
        } else {
          console.log('ERROR');
          return next();
        }
      }).catch((err) => {
        console.log('exception');
        return next(err);
      })
  } else {
    console.log("provide correct key");
  }

  next();

})

router.post('/post/like', (req, res, next) => {
  if (req.query.like === undefined) {
    res.send(null);
    return next();
  }

  if (req.query.userId === undefined) {
    res.send(null);
    return next();
  }

  if (req.query.postId === undefined) {
    res.send(null);
    return next();
  }


  let userId = req.query.userId;
  let like = req.query.like;
  let postId = req.query.postId;

  Post.updateOne({ '_id': postId, 'like.userId': { $ne: userId } }, { $addToSet: { like: { liked: like, userId: userId } } }).
    then((result) => {
      console.log(result);
      console.log('like done');
      res.send(result);
      if (result.nModified === 0) {
        Post.updateOne({ '_id': postId, 'like.userId': userId }, { $set: { 'like.$.liked': like } }).
          then((response) => {
            console.log(response);
            console.log('like done 01');
          })
      }
    }).
    catch((err) => {
      console.log(err);
      res.send(err);
      next(err);
    });
})

router.get('/post/getLikes', (req, res, next) => {

  if (req.query.postId === undefined) {
    res.send(null);
    return next();
  }



  let postId = req.query.postId;
  var response = { count: 0, like: false };
  console.log('start get likes');
  Post.find({ '_id': postId, 'like.liked': true }, { like: { $elemMatch: { liked: true } } })
    .then((result) => {
      if (req.query.userId != undefined) {
        let userId = req.query.userId;
        Post.find({ '_id': postId, 'like.userId': userId }, { like: { $elemMatch: { userId: userId } } })
          .then((doc) => {
            if (doc.length > 0) {
              if (doc[0].like[0].liked === true) {
                response.like = true;
              }
            }
            if (result.length > 0) {
              response.count = result[0].like.length;
            }
            res.send(JSON.stringify(response));
            next(result);
          }).catch((err) => {
            console.log(err);
            next(err);
          });
      } else {
        if (result.length > 0) {
          console.log('find likes ', result[0].like.length);
          response.count = result[0].like.length;
        }
        res.send(JSON.stringify(response));
        next(result);
      }
    }).
    catch((err) => {
      console.log(err);
      next(err);
    })
})

router.get('/post/getComments', (req, res, next) => {
  let postId = req.query.postId;
  Post.findById(postId).select('comments').
    then((result) => {
      console.log('DONE');
      res.send(result);
      return next(result);
    }).
    catch((err) => {
      console.log(err);
      next(err);
    })
})

router.post('/post/uploadImage', (req, res, next) => {
  if (req.query.userId === undefined) {
    res.send(null);
    return next();
  }

  if (req.query.caption === undefined) {
    res.send(null);
    return next();
  }

  if (req.files.file === undefined) {
    res.send(null);
    return next();
  }

  let uploadFile = req.files.file;
  let userId = req.query.userId;
  let caption = req.query.caption;

  const name = uuidv4() + uploadFile.name;
  uploadFile.mv(`${__dirname}/../public/files/temp/${name}`, function (err) {
    if (err) {
      return next(err);
    }
    console.log('image uploded!')
    var post = new Post();
    post.caption = caption;
    post.image = `${name}`;
    post.userId = userId;
    post.save();
    console.log('post send!');
    next();
  });
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = router;