const quizService = require('./quizService');
const { success } = require('../../middlewares/apiResponse');

exports.uploadQuiz = async (req, res) => {
    const { title, description, question } = req.body;
    const userId = req.user.id;

    const imageFile = req.files && req.files.image ? req.files.image[0] : null;

    if (!imageFile) {
        const error = new Error('Envie a imagem do quiz');
        error.status = 400;
        throw error;
    }

    let answers;
    try {
        answers = JSON.parse(req.body.answers);
    } catch {
        const error = new Error('As respostas estão em um formato inválido.');
        error.status = 400;
        throw error;
    }

    if (!Array.isArray(answers)) {
        const error = new Error('As respostas estão em um formato inválido.');
        error.status = 400;
        throw error;
    }

    const newQuiz = await quizService.uploadQuiz(title, description, question, answers, imageFile, userId);

    return success(res, newQuiz, 'Quiz enviado com sucesso!', 201);
};

exports.getQuizDetails = async (req, res) => {
    const quizId = req.params.id;
    const currentUserId = req.user ? req.user.id : null;

    const { quiz, isLiked } = await quizService.getQuizDetails(quizId, currentUserId);
    const isOwner = currentUserId === quiz.userId;

    return success(res, { ...quiz.toJSON(), isOwner, isLiked });
};

exports.getMyQuizzes = async (req, res) => {
    const userId = req.user.id;

    const quizzes = await quizService.getQuizzesByUser(userId);

    return success(res, quizzes);
};


exports.getQuizForEdit = async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.id;

    const quiz = await quizService.getQuizForEdit(quizId, userId);

    return success(res, quiz);
};


exports.updateQuiz = async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.id;
    const { title, description, question } = req.body;
    const newImage = req.file || null;

    let answers;
    if (req.body.answers !== undefined) {
        try {
            answers = JSON.parse(req.body.answers);
        } catch {
            const error = new Error('As respostas estão em um formato inválido.');
            error.status = 400;
            throw error;
        }

        if (!Array.isArray(answers)) {
            const error = new Error('As respostas estão em um formato inválido.');
            error.status = 400;
            throw error;
        }
    }

    const updatedQuiz = await quizService.updateQuiz(quizId, userId, title, description, question, answers, newImage);

    return success(res, updatedQuiz, 'Quiz atualizado com sucesso!');
};


exports.deleteQuiz = async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.id;

    await quizService.deleteQuiz(quizId, userId, false);

    return success(res, null, 'Quiz excluído com sucesso.');
};