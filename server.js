import express from "express";
import knex from "knex";
import knexfile from "./knexfile.js";
import usersRoute from "./src/routes/users.js";
import postsRoute from "./src/routes/posts.js";
import commentsRoute from "./src/routes/comments.js";
import { Model } from "objection";
import cors from "cors";
// import methodOverride from "method-override";

const app = express();
const db = knex(knexfile);

Model.knex(db);

app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
);
app.use(express.json());

// app.use(methodOverride("_method"));

usersRoute({ app });
postsRoute({ app });
commentsRoute({ app });

const port = 3001;
app.listen(port, () => console.log(`Listening on :${port}`));
