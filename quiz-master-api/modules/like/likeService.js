const sequelize = require('../../config/database');
const Like = require('./likeModel');
const Quiz = require('../quiz/quizModel');
const User = require('../user/userModel');

async function toggleLike(userId, quizId) {
    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
        const error = new Error('Quiz não encontrado.');
        error.status = 404;
        throw error;
    }

    const liked = await sequelize.transaction(async (t) => {
        const [like, created] = await Like.findOrCreate({
            where: { userId, quizId: quiz.id },
            defaults: { userId, quizId: quiz.id },
            transaction: t
        });

        if (created) {
            await quiz.increment('likesCount', { transaction: t });
            return true;
        }

        await like.destroy({ transaction: t });
        await quiz.decrement('likesCount', { transaction: t });
        return false;
    });

    await quiz.reload();

    return { liked, likesCount: quiz.likesCount };
}


async function checkLikeStatus(userId, quizId) {
    const like = await Like.findOne({ where: { userId, quizId } });
    return !!like;
}


async function getLikedQuizzes(userId) {
    const likes = await Like.findAll({
        where: { userId },
        include: [{
            model: Quiz,
            include: [{
                model: User,
                attributes: ['id', 'username', 'fullName', 'profilePicture']
            }]
        }],
        order: [['createdAt', 'DESC']]
    });

    return likes.map((like) => like.Quiz);
}


module.exports = { toggleLike, checkLikeStatus, getLikedQuizzes };