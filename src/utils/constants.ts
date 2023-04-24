export const regExp = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;
export const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET = 'secret123',
} = process.env;
