const createPool = require("../config/db");

const findEmail = (email, result) => {
  return createPool.query(
    `SELECT * FROM user WHERE email='${email}'`,
    function (err, res) {
      if (err) {
        console.log("error a = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};

const create = (id, name, email, passwordHash, result) => {
  //   const { id, email, passwordHash } = data;
  return createPool.query(
    `INSERT INTO user(id,name,email,passwordHash) VALUES('${id}','${name}','${email}','${passwordHash}')`,
    function (err, res) {
      if (err) {
        console.log("error C = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = {
  findEmail,
  create,
};
