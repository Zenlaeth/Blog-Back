import jsonwebtoken from "jsonwebtoken";
import config from "../../config.js";
import UsersModel from "../db/models/Users.js";
import auth from "../middlewares/auth.js";
import hashPassword from "../password/crypto.js";

const usersRoute = ({ app }) => {
  // LOGIN
  app.post("/login", async (req, res) => {
    const {
      body: { email, password },
    } = req;

    const user = await UsersModel.query().findOne({ email });

    if (!user) {
      res.status(401).send("Invalid e-mail or password.");

      return;
    }

    const [passwordHash] = hashPassword(password, user.passwordSalt);

    if (passwordHash !== user.passwordHash) {
      res.status(401).send("Invalid e-mail or password.");

      return;
    }

    const jwt = jsonwebtoken.sign(
      { payload: { userId: user.id, email } },
      config.security.session.secret,
      { expiresIn: config.security.session.expiresIn }
    );

    const success = " Successful connection!";

    res.status(200).send({ jwt, success });
  });

  // REGISTER
  app.post("/register", async (req, res) => {
    const {
      body: { email, firstName, lastName, password, activated, role_id },
    } = req;

    const [passwordHash, passwordSalt] = hashPassword(password);

    const user = await UsersModel.query().insertAndFetch({
      email,
      firstName,
      lastName,
      passwordHash,
      passwordSalt,
      activated: true,
      role_id: 1,
    });
    res.send(user);
  });

  // POST
  app.post("/users", async (req, res) => {
    const {
      body: { email, password },
    } = req;

    const [userId] = await UsersModel.query()
      .insert({
        email,
        passwordHash: password,
        passwordSalt: password,
      })
      .returning("*");

    const [user] = await UsersModel.query().findById(userId);
    res.send(user);
  });

  // GET
  app.get("/users", auth, async (req, res) => {
    res.send(await UsersModel.query());
  });

  // GET ONE
  app.get("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req;

    const user = await UsersModel.query().findById(userId);
    res.send(user);
  });

  // GET ONE
  app.get("/public/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req;

    const user = await UsersModel.query()
      .select("firstName", "lastName")
      .findById(userId);
    res.send(user);
  });

  // PUT
  app.put("/users/:userId", async (req, res) => {
    const {
      params: { userId },
      body: { email, firstName, lastName, password },
    } = req;

    const user = await UsersModel.query().findById(userId);

    if (!user) {
      res.status(404).send("User not found");

      return;
    }

    const [passwordHash, passwordSalt] = hashPassword(password);

    await UsersModel.query()
      .update({
        email: email,
        firstName: firstName,
        lastName: lastName,
        passwordHash,
        passwordSalt,
      })
      .where("id", userId);
    res.send("User updated n °" + userId);
  });

  // DELETE
  app.delete("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req;

    const findUser = await UsersModel.query().findById(userId);

    if (!findUser) {
      res.status(404).send("User not found");

      return;
    }
    await UsersModel.query().deleteById(userId);

    res.send("Deleted post " + userId);
  });
};

export default usersRoute;
