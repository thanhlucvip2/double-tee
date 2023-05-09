import 'dotenv/config';
// Server
export const PORT = process.env.PORT || 5000;

// Database
export const MYSQL_DB = process.env.MYSQL_DB;
export const MYSQL_HOST = process.env.MYSQL_HOST;
export const MYSQL_PORT = +process.env.MYSQL_PORT;
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_LOGGING = !!process.env.MYSQL_LOGGING;
export const SECRET = process.env.SECRET;

// Email
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
