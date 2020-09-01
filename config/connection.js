const development = {
        database: 'peers_db',
        username: 'root',
        password: 'root123',
        host: 'localhost',
        dialect: 'mysql',
};

const testing = {
        database: 'peers_db',
        username: 'developer',
        password: '4LiP##12sDBDev123',
        host: '10.128.0.3',
        dialect: 'mysql',
};

const production = {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'sqlite' || 'mysql' || 'postgres',
};

module.exports = {
        development,
        testing,
        production,
};
