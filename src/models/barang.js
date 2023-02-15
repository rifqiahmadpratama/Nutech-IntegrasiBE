const createPool = require("../config/db");

const insert = (id, photo, nama, harga_beli, harga_jual, stok, result) => {
  return createPool.query(
    `INSERT INTO barang(id, photo, nama, harga_beli, harga_jual, stok ) VALUES('${id}','${photo}','${nama}','${harga_beli}','${harga_jual}','${stok}')`,
    function (err, res) {
      if (err) {
        console.log("error = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};

const updatephoto = (id, photo, result) => {
  return createPool.query(
    `UPDATE barang SET photo = '${photo}' WHERE id = ${id}`,
    function (err, res) {
      if (err) {
        console.log("error = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};
const updatename = (id, nama, result) => {
  return createPool.query(
    `UPDATE barang SET nama = '${nama}' WHERE id = ${id}`,
    function (err, res) {
      if (err) {
        console.log("error = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};
const updatebeli = (id, harga_beli, result) => {
  return createPool.query(
    `UPDATE barang SET harga_beli = '${harga_beli}' WHERE id = ${id}`,
    function (err, res) {
      if (err) {
        console.log("error = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};
const updatejual = (id, harga_jual, result) => {
  return createPool.query(
    `UPDATE barang SET harga_jual = '${harga_jual}' WHERE id = ${id}`,
    function (err, res) {
      if (err) {
        console.log("error = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};
const updatestok = (id, stok, result) => {
  return createPool.query(
    `UPDATE barang SET stok = '${stok}' WHERE id = ${id}`,
    function (err, res) {
      if (err) {
        console.log("error = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};

const deletebarang = (id, result) => {
  return createPool.query(
    `DELETE FROM barang WHERE id = ${id}`,
    function (err, res) {
      if (err) {
        console.log("error = ", err);
        result(err);
      } else {
        result(null, res);
      }
    }
  );
};

const selectkolom = (result) => {
  return createPool.query(`SELECT * from barang`, function (err, res) {
    if (err) {
      console.log("error = ", err);
      result(err);
    } else {
      result(null, res);
    }
  });
};

module.exports = {
  insert,
  updatephoto,
  updatename,
  updatebeli,
  updatejual,
  updatestok,
  deletebarang,
  selectkolom,
};
