const MongodbMemoryServer = require('mongodb-memory-server');
const mongod = new MongodbMemoryServer.default();

module.exports = async function () {
    const uri = await mongod.getUri();
    process.env.FINANCEFY_DB_URL = uri;

    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = mongod;

    if (process.env.JEST_ENV === 'api') {
        const Server = await import('../dist/startup/server.js');
        const serverInstance = new Server.default();
        await serverInstance.startup();
        global.__SERVER__ = serverInstance;
    }
};
