const mysql = require('mysql2');

const dbconfig = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'gamedb_user',
	database: process.env.DB_DATABASE || 'gamedb',
	password: process.env.DB_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
};

const pool = mysql.createPool(dbconfig);

console.log(
	`Connected to:\nDatabase: ${dbconfig.database}\nOn: ${dbconfig.host}\nWith user: ${dbconfig.user}`
);

module.exports = pool;