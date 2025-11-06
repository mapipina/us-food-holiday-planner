require('dotenv').config({ path: '../.env' }); 

module.exports = {

  development: {
    use_env_variable: 'DATABASE_URL', 
    dialect: 'postgres', 
    migrationsPath: './src/db/migrations',
    seedersPath: './src/db/seeders',
  },

  // Note on SSL: Not including since this is for localhost environment and development
};
