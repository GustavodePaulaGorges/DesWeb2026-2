const Quiz = require('./quizModel');
const Answer = require('../answer/answerModel');
const User = require('../user/userModel');
const Like = require('../like/likeModel');
const Comment = require('../comment/commentModel');
const sequelize = require('../../config/database');
const fs = require('fs');
const path = require('path');

async function uploadQuiz(title, description, question, answers, image, userId) {
    const newQuiz = await Quiz.create({
        title,
        description,
        question,
        imagePath: image.filename,
        userId
    });

    let newAnswers = [];

    for (const answer of answers) {
        let newAnswer = await Answer.create({
            quizId: newQuiz.id,
            answer: answer.answer,
            isCorrect: answer.isCorrect
        });

        newAnswers.push(newAnswer);
    }

    await User.increment('quizzesCount', { where: { id: userId } });

    return { newQuiz, answers: newAnswers };
}

async function getQuizDetails(quizId, currentUserId = null) {
    const quiz = await Quiz.findByPk(quizId, {
        include: [
            {
                model: User,
                attributes: ['id', 'username', 'fullName', 'profilePicture']
            },
            {
                model: Answer,
                as: 'answers',
                attributes: ['id', 'answer', 'isCorrect']
            }
        ]
    });

    if (!quiz) {
        const error = new Error('Quiz não encontrado.');
        error.status = 404;
        throw error;
    }

    await quiz.increment('views');
    await quiz.reload();

    let isLiked = false;

    if (currentUserId) {
        const existingLike = await Like.findOne({ where: { userId: currentUserId, quizId: quiz.id } });
        isLiked = !!existingLike;
    }

    return { quiz, isLiked };
}

async function getFeedQuizzes(page = 1, limit = 12) {
    const offset = (page - 1) * limit;

    const quizzes = await Quiz.findAll({
        include: [{
            model: User,
            attributes: ['id', 'username', 'fullName', 'profilePicture']
        }],
        order: [['createdAt', 'DESC']],
        offset,
        limit
    });

    return quizzes;
}

async function getQuizzesByUser(userId) {
    return await Quiz.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
    });
}


async function getQuizForEdit(quizId, userId) {
    const quiz = await Quiz.findByPk(quizId, {
        include: [{
            model: Answer,
            as: 'answers',
            attributes: ['id', 'answer', 'isCorrect']
        }]
    });

    if (!quiz) {
        const error = new Error('Quiz não encontrado.');
        error.status = 404;
        throw error;
    }

    if (quiz.userId !== userId) {
        const error = new Error('Você não tem permissão para editar este quiz.');
        error.status = 403;
        throw error;
    }

    return quiz;
}

async function updateQuiz(quizId, userId, title, description, question, answers, newImage) {
    const quiz = await getQuizForEdit(quizId, userId);
    const oldImage = newImage ? quiz.imagePath : null;

    quiz.title = title;
    quiz.description = description;
    quiz.question = question;

    if (newImage) {
        quiz.imagePath = newImage.filename;
    }

    await quiz.save();

    if (answers !== undefined) {
        await Answer.destroy({ where: { quizId: quiz.id } });

        for (const answer of answers) {
            await Answer.create({
                quizId: quiz.id,
                answer: answer.answer,
                isCorrect: !!answer.isCorrect,
            });
        }
    }

    if (oldImage) {
        const oldImagePath = path.join(__dirname, '../../public/uploads/images', oldImage);
        fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Erro ao apagar imagem antiga:', err);
        });
    }

    return await Quiz.findByPk(quiz.id, {
        include: [{
            model: Answer,
            as: 'answers',
            attributes: ['id', 'answer', 'isCorrect']
        }]
    });
}


async function deleteQuiz(quizId, requestingUserId, isAdmin = false) {
    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
        const error = new Error('Quiz não encontrado.');
        error.status = 404;
        throw error;
    }

    if (!isAdmin && quiz.userId !== requestingUserId) {
        const error = new Error('Você não tem permissão para excluir este quiz.');
        error.status = 403;
        throw error;
    }

    await quiz.destroy();

    await sequelize.transaction(async (t) => {
        await Like.destroy({ where: { quizId: quiz.id }, transaction: t });
        await Comment.destroy({ where: { quizId: quiz.id }, transaction: t });
        await quiz.destroy({ transaction: t });
        await User.decrement('quizzesCount', { where: { id: quiz.userId }, transaction: t });
    });

    const imageFilePath = path.join(__dirname, '../../public/uploads/images', quiz.imagePath);

    [imageFilePath].forEach((filePath) => {
        fs.unlink(filePath, (err) => {
            if (err) console.error('Erro ao apagar arquivo do quiz excluído:', err);
        });
    });
}

module.exports = { uploadQuiz, getQuizDetails, getFeedQuizzes, getQuizzesByUser, getQuizForEdit, updateQuiz, deleteQuiz };