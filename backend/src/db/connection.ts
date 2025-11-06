'use strict';

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { initializeHolidayModel } from '../models/Holiday'; 

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'food_holiday_menu';
const config = {
    dialect: 'postgres' as const,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
    logging: false,
};

let sequelize: Sequelize | null = null;

const createDatabaseIfNotExist = async () => {
    const tempSequelize = new Sequelize('postgres', config.username, config.password, {
        ...config,
        database: 'postgres',
        logging: false,
    });

    try {
        await tempSequelize.authenticate();
        console.log(`[INFO] Connected to PostgreSQL admin database: 'postgres'.`);

        const [results] = await tempSequelize.query(
            `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`
        );

        if (results.length === 0) {
            console.log(`[INFO] Database '${DB_NAME}' not found. Creating it now...`);
            await tempSequelize.query(`CREATE DATABASE "${DB_NAME}"`);
            console.log(`✅ Database '${DB_NAME}' created successfully.`);
        } else {
            console.log(`[INFO] Database '${DB_NAME}' already exists.`);
        }
    } catch (error) {
        console.error('❌ Failed to create or check database:', error);
        throw error;
    } finally {
        await tempSequelize.close();
    }
};


/**
 * @description Establishes the database connection and syncs models.
 */
export const connectDB = async (): Promise<Sequelize> => {
    if (!sequelize) {
        await createDatabaseIfNotExist();
        
        sequelize = new Sequelize(DB_NAME, config.username, config.password, {
            ...config,
            database: DB_NAME, 
        });
    }

    try {
        await sequelize!.authenticate(); 
        console.log('✅ Main application connection established successfully.');

        initializeHolidayModel(sequelize!); 

        await sequelize!.sync({ alter: true });
        console.log('✅ Database synchronized with models.');
        
        return sequelize!;
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        process.exit(1); 
    }
};

/**
 * @description Gracefully closes the Sequelize connection pool.
 */
export const disconnectDB = async (): Promise<void> => {
    if (sequelize) {
        try {
            await sequelize.close();
            console.log('✅ Sequelize connection pool closed.🚪'); 
        } catch (error) {
            console.error('❌ Error during Sequelize disconnect:', error); 
            throw error;
        }
    }
};


if (require.main === module) {
    console.log('[INFO] Running connection setup script...');
    connectDB()
        .then(() => {
            console.log('Setup finished. Process exiting.');
            process.exit(0);
        })
        .catch((err) => {
            console.error('FATAL ERROR during DB setup:', err);
            process.exit(1);
        });
}

export default sequelize;
