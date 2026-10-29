const sequelize = require('../../config/database');
const Comment = require('./commentModel');
const Quiz = require('../quiz/quizModel');
const User = require('../user/userModel');

const AUTHOR_ATTRIBUTES = ['id', 'username', 'fullName', 'profilePicture'];

async function findQuizOrFail(quizId) {
    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
        const error = new Error('Quiz não encontrado.');
        error.status = 404;
        throw error;
    }

    return quiz;
}


async function addComment(userId, quizId, content) {
    const quiz = await findQuizOrFail(quizId);

    const comment = await sequelize.transaction(async (t) => {
        const created = await Comment.create({ userId, quizId: quiz.id, content }, { transaction: t });
        await quiz.increment('commentsCount', { transaction: t });
        return created;
    });

    return await Comment.findByPk(comment.id, {
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }]
    });
}


async function getCommentsByQuizId(quizId) {
    const quiz = await findQuizOrFail(quizId);

    return await Comment.findAll({
        where: { quizId: quiz.id },
        include: [{ model: User, attributes: AUTHOR_ATTRIBUTES }],
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
    });
}


module.exports = { addComment, getCommentsByQuizId };