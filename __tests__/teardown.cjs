module.exports = async function () {
    if (process.env.JEST_ENV === 'api') {
        await global.__SERVER__.stop();
    }

    await global.__MONGOD__.stop();
    process.exit(0);
};
