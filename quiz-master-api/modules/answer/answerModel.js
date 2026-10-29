const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Answer = sequelize.define('Answer',
    {
        id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        quizId:        { type: DataTypes.INTEGER, allowNull: false, references: { model: 'quizzes', key: 'id' } },
        answer:        { type: DataTypes.STRING(100), allowNull: false },
        isCorrect:     { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
        timestamps: true,
        tableName: 'answers',
        indexes: [
            { fields: ['quiz_id'], name: 'idx_quizzes_quiz_id' }
        ]
    }
);

module.exports = Answer;