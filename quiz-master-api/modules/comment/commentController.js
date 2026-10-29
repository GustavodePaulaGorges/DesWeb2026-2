const commentService = require('./commentService');
const { success } = require('../../middlewares/apiResponse');

exports.addComment = async (req, res) => {
    const quizId = req.params.quizId;
    const userId = req.user.id;
    const { content } = req.body;

    const comment = await commentService.addComment(userId, quizId, content);

    return success(res, comment, 'Comentário adicionado com sucesso!', 201);
};


exports.getComments = async (req, res) => {
    const quizId = req.params.quizId;

    const comments = await commentService.getCommentsByQuizId(quizId);

    return success(res, comments);
};