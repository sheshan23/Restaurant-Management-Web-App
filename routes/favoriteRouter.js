const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req,res,next) => {
    Favorites.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if(!favorite) { 
            Favorites.create({user: req.user._id})
            .then((favorite) => {
                for(var i=0;i<req.body.length;i++) {
                    favorite.dishes.push(req.body[i]._id);
                }
                favorite.save()
                .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .then((favorite) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    }, (err) => next(err))
                }, (err) => next(err))
            },(err) => next(err))                
        }
        else {
            for(var i=0;i<req.body.length;i++) {
                if(favorite.dishes.indexOf(req.body[i]._id) == -1) {
                    favorite.dishes.push(req.body[i]._id);
                }
            }
            favorite.save()
            .then((favorite) => {
                Favorites.findById(favorite._id)
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err))
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req, res, next) => {
    Favorites.findOneAndRemove({user: req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/'+req.params.dishId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        if(!favorite) { 
            Favorites.create({user: req.user._id})
            .then((favorite) => {
                favorite.dishes.push({'_id' : req.params.dishId});
                favorite.save()
                .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .then((favorite) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    }, (err) => next(err))
                }, (err) => next(err))
            },(err) => next(err))                
        }
        else {
            if(favorite.dishes.indexOf(req.params.dishId) !== -1) {
                var err = new Error("Dish is already added to the favorite list!");
                err.status = 409;
                return next(err);    
            }
            else {
                favorite.dishes.push({'_id' : req.params.dishId});
                favorite.save()
                .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .then((favorite) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    }, (err) => next(err))
                }, (err) => next(err))
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/'+req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyUser_NotAdmin, (req, res, next) => {
    Favorites.findOne({user: req.user._id})
    .then((favorite) => {
        var index = favorite.dishes.indexOf(req.params.dishId);
        favorite.dishes.splice(index,1);
        favorite.save()
        .then((favorite) => {
            Favorites.findById(favorite._id)
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err))
        }, (err) => next(err))
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favoriteRouter;