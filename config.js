import "dotenv/config";

export default {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
  security: {
    session: {
      secret: "secret",
      expiresIn: "5h",
    },
  },
};
