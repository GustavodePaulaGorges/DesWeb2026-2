const express = require('express');
const router = express.Router();
const likeController = require('./likeController');
const { isAuthenticated } = require('../../middlewares/auth');
const asyncHandler = require('../../middlewares/asyncHandler');

router.post('/quizzes/:quizId/toggle-like', isAuthenticated, asyncHandler(likeController.toggleLike));
router.get('/quizzes/:quizId/like-status', isAuthenticated, asyncHandler(likeController.checkLikeStatus));
router.get('/liked-quizzes', isAuthenticated, asyncHandler(likeController.getLikedQuizzes));

module.exports = router;