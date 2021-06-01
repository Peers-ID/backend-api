const development = {
        database: 'peers_db_v2',
        username: 'root',
        password: '',
        host: 'localhost',
        dialect: 'mysql',
};

const testing = {
        database: 'peers_db_v2',
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
