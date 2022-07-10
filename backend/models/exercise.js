const { Sequelize, DataTypes } = require('sequelize');
// database pool
const sequelize = require('../config/database')

const Exercise = sequelize.define('exercise',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bodyPart: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gifUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    target: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    timestamps: false
});

module.exports = Exercise;