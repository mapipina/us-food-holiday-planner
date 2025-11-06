import app from './app';
import { AddressInfo } from 'net';
import { disconnectDB } from './db/connection'; 

const PORT = process.env.PORT || 3000;
const SHUTDOWN_TIMEOUT = 10000; 

const server = app.listen(PORT, () => {
    const address = server.address() as AddressInfo;
    console.log(`
        \n-------------------------------------
        🚀 Server running on http://localhost:${address.port}
        -------------------------------------
    `);
});

const gracefulShutdown = (signal: NodeJS.Signals) => {
    console.log(`\n\n[INFO] Received signal ${signal}. Starting graceful shutdown...`);

    server.close(async (err: Error | undefined) => {
        if (err) {
            console.error('[ERROR] HTTP server failed to close gracefully:', err);
            process.exit(1);
        }

        try {
            console.log('[INFO] Closing database connection...');
            await disconnectDB(); 
            
            console.log('[INFO] Cleanup complete. Shutting down process.');
            process.exit(0); 
        } catch (dbError) {
            console.error('[FATAL] Error during database disconnection:', dbError);
            process.exit(1); 
        }
    });

    setTimeout(() => {
        console.error(`[FATAL] Graceful shutdown timed out after ${SHUTDOWN_TIMEOUT / 1000}s. Forcing exit.`);
        process.exit(1);
    }, SHUTDOWN_TIMEOUT).unref();
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
