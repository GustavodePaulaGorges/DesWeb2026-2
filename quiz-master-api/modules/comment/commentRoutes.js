const express = require('express');
const router = express.Router();
const commentController = require('./commentController');
const { commentValidator } = require('./commentValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/quizzes/:quizId/comments', isAuthenticated, commentValidator, asyncHandler(commentController.addComment));
router.get('/quizzes/:quizId/comments', asyncHandler(commentController.getComments));

module.exports = router;