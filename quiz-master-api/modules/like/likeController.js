const likeService = require('./likeService');
const { success } = require('../../middlewares/apiResponse');

exports.toggleLike = async (req, res) => {
    const quizId = req.params.quizId;
    const userId = req.user.id;

    const result = await likeService.toggleLike(userId, quizId);

    if (result.liked) {
        return success(res, result, 'Quiz curtido.', 201);
    }
    return success(res, result, 'Curtida removida.');
};


exports.checkLikeStatus = async (req, res) => {
    const quizId = req.params.quizId;
    const userId = req.user.id;

    const liked = await likeService.checkLikeStatus(userId, quizId);

    return success(res, { liked });
};


exports.getLikedQuizzes = async (req, res) => {
    const userId = req.user.id;

    const quizzes = await likeService.getLikedQuizzes(userId);

    return success(res, quizzes);
};