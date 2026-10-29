const express = require('express');
const router = express.Router();
const quizController = require('./quizController');
const { uploadValidator } = require('./quizValidator');
const { isAuthenticated } = require('../../middlewares/auth');
const quizMulter = require('../../middlewares/quizMulter');
const asyncHandler = require('../../middlewares/asyncHandler');
const { optionalAuth } = require('../../middlewares/optionalAuth');

router.get('/quizzes/:id', optionalAuth, asyncHandler(quizController.getQuizDetails));

router.post(
    '/quizzes/upload',
    isAuthenticated,
    quizMulter.fields([
        { name: 'image', maxCount: 1 }
    ]),
    uploadValidator,
    asyncHandler(quizController.uploadQuiz)
);

router.get('/my-quizzes', isAuthenticated, asyncHandler(quizController.getMyQuizzes));

router.get('/quizzes/:id/edit', isAuthenticated, asyncHandler(quizController.getQuizForEdit));

router.put(
    '/quizzes/:id',
    isAuthenticated,
    quizMulter.single('image'),
    uploadValidator,
    asyncHandler(quizController.updateQuiz)
);

router.delete('/quizzes/:id', isAuthenticated, asyncHandler(quizController.deleteQuiz));

module.exports = router;