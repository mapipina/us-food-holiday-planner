import { connectDB, disconnectDB } from '../db/connection';

beforeAll(async () => {
    try {
        await connectDB(); 
        console.log('\nTest database connection successful.');
    } catch (error) {
        console.error(`Failed to connect to database for testing: ${error}`);
        process.exit(1);
    }
});

afterAll(async () => {
    await disconnectDB();
    console.log('\nTest database connection closed.');
});
