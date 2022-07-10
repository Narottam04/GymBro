const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,        
        }
    }
});

// const checkConn = async() => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.'.bgGreen.white.bold);
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         process.exit(1)
//     }
// }

// checkConn()


module.exports = sequelize