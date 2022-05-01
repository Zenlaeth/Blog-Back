import randomBytes from "randombytes";
import crypto from "crypto";

const hashPassword = (password, salt = randomBytes(128).toString("hex")) => [
  crypto.pbkdf2Sync(password, salt, 100000, 512, "sha512").toString("hex"),
  salt,
];

export default hashPassword;
