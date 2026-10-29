const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Quiz = sequelize.define('Quiz',
    {
        id:            { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title:         { type: DataTypes.STRING(100), allowNull: false },
        description:   { type: DataTypes.TEXT, allowNull: true },
        question:      { type: DataTypes.TEXT, allowNull: false },
        imagePath:     { type: DataTypes.STRING, allowNull: false },
        views:         { type: DataTypes.INTEGER, defaultValue: 0 },
        likesCount:    { type: DataTypes.INTEGER, defaultValue: 0 },
        commentsCount: { type: DataTypes.INTEGER, defaultValue: 0 },
        userId:        { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } }
    },
    {
        timestamps: true,
        tableName: 'quizzes',
        indexes: [
            { fields: ['user_id'], name: 'idx_quizzes_user_id' }
        ]
    }
);

module.exports = Quiz;