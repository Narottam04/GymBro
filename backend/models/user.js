const { Sequelize, DataTypes } = require('sequelize');
// database pool
const sequelize = require('../config/database')


const User = sequelize.define('user',{
    id: {
        type: DataTypes.UUID,   
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },  
})

module.exports = User;
