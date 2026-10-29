const User = require('../modules/user/userModel');
const Quiz = require('../modules/quiz/quizModel');
const Answer = require('../modules/answer/answerModel');
const Like = require('../modules/like/likeModel');
const Comment = require('../modules/comment/commentModel'); 

User.hasMany(Quiz, { foreignKey: 'userId' });
Quiz.belongsTo(User, { foreignKey: 'userId' });
Quiz.hasMany(Answer, { foreignKey: 'quizId', as: 'answers' });
Answer.belongsTo(Quiz, { foreignKey: 'quizId' });

User.hasMany(Like, { foreignKey: 'userId' })
Like.belongsTo(User, { foreignKey: 'userId' });
Quiz.hasMany(Like, { foreignKey: 'quizId' });
Like.belongsTo(Quiz, { foreignKey: 'quizId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
Quiz.hasMany(Comment, { foreignKey: 'quizId' });
Comment.belongsTo(Quiz, { foreignKey: 'quizId' });