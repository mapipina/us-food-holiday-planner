require('dotenv').config({ path: '../.env' }); 

module.exports = {

  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', 
    
    migrationsPath: './src/db/migrations',
    seedersPath: './src/db/seeders',
  },

  // Note on SSL: Not including since this is for localhost environment and development
};