const development = {
        database: 'rds_psql_db',
        username: 'peers_db',
        password: '4LiP##12sDB123',
        host: 'rm-d9jn88w055g679jx9.mysql.ap-southeast-5.rds.aliyuncs.com',
        dialect: 'mysql',
};

const testing = {
        database: 'rds_psql_db',
        username: 'peers_db',
        password: '4LiP##12sDB123',
        host: 'rm-d9jn88w055g679jx9.mysql.ap-southeast-5.rds.aliyuncs.com',
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
