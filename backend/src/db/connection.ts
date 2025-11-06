import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// Import your Holiday and Recipe models here once created
// import { Holiday } from '../models/Holiday'; 
// import { Recipe } from '../models/Recipe'; 

dotenv.config();

// Create the single Sequelize instance
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
});

// Function to initialize models (Crucial step)
// You would call MyModel.init(attributes, { sequelize }) in your model files.
const initializeModels = () => {
    // Example: Holiday.init(..., { sequelize });
    // Example: Recipe.init(..., { sequelize });

    // After all models are initialized, set up associations:
    // Example: Holiday.hasMany(Recipe);
    // Example: Recipe.belongsTo(Holiday);
};


/**
 * @description Establishes the database connection and syncs models.
 */
export const connectDB = async (): Promise<void> => {
    try {
        // 1. Authenticate connection
        await sequelize.authenticate();
        console.log('✅ PostgreSQL connection established successfully.');

        // 2. Initialize and Sync Models
        initializeModels(); 
        
        // This command checks the current state of the database and performs necessary changes
        // to make the schema match the models. Use `alter: true` for development.
        await sequelize.sync({ alter: true }); 
        console.log('✅ Database synchronized with models.');

    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        // Fail fast if the database is critical
        process.exit(1); 
    }
};

/**
 * @description Gracefully closes the Sequelize connection pool.
 */
export const disconnectDB = async (): Promise<void> => {
    try {
        await sequelize.close();
        console.log('❌ Sequelize connection pool closed.');
    } catch (error) {
        console.error('❌ Error during Sequelize disconnect:', error);
        throw error; // Re-throw for server.ts to handle the fatal exit
    }
};

// Export the sequelize instance for use in models and controllers
export default sequelize;