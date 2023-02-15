const barangModel = require("../models/barang");
const commonHelper = require("../helper/common");
const { Storage } = require("@google-cloud/storage");
const bucketName = "nutech_integrasi";
const storage = new Storage({
  projectId: "tes-nutech-integrasi-377823",
  keyFilename: "../config/tes-nutech-integrasi-377823-974af4a5a06f.json",
});
const barangController = {
  addbarang: async (req, res) => {
    try {
      const PORT = process.env.PORT || 3200;
      const DB_HOST = process.env.DB_HOST || "localhost";

      const originalname = req.file;
      //  console.log("photo = ", photo);
      // const { filename } = req.file;

      const bucket = storage.bucket(bucketName).file(originalname);

      const blobStream = bucket.createWriteStream({
        resumable: false,
        gzip: true,
      });
      // const fileObject = bucket.file;

      console.log("cek foto = ", bucket);

      if (!originalname) {
        return commonHelper.response(res, null, 404, "Photo has not found");
      } else {
        const { id, nama, harga_beli, harga_jual, stok } = req.body;

        console.log("nama dar react = ", nama);
        // await barangModel.insert(
        //   id,
        //   `http://${DB_HOST}:${PORT}/img/${photo}`,
        //   nama,
        //   harga_beli,
        //   harga_jual,
        //   stok,
        //   function (err, barang) {
        //     if (err) res.send(err);
        //     res.json("barang created");
        //   }
        // );

        await barangModel.insert(
          id,
          `https://storage.googleapis.com/${bucketName}/${bucket.name.filename}`,
          nama,
          harga_beli,
          harga_jual,
          stok,
          function (err, barang) {
            if (err) res.send(err);
            res.json("barang created");
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  updatebarangphoto: (req, res) => {
    const id = Number(req.params.id);
    const PORT = process.env.PORT || 3200;
    const DB_HOST = process.env.DB_HOST || "localhost";

    const photo = req.file.filename;
    const data = `http://${DB_HOST}:${PORT}/img/${photo}`;
    barangModel.updatephoto(id, data, function (err, barang) {
      if (err) res.send(err);
      res.json("barang updatephoto");
    });
  },
  updatebarangname: (req, res) => {
    const id = Number(req.params.id);

    const { nama } = req.body;
    console.log("nama = ", nama);
    barangModel.updatename(id, nama, function (err, barang) {
      if (err) res.send(err);
      res.json("barang updatename");
    });
  },
  updatebarangbeli: (req, res) => {
    const id = Number(req.params.id);

    const { harga_beli } = req.body;
    console.log("harga_beli = ", harga_beli);
    barangModel.updatebeli(id, harga_beli, function (err, barang) {
      if (err) res.send(err);
      res.json("barang update harga beli");
    });
  },
  updatebarangjual: (req, res) => {
    const id = Number(req.params.id);

    const { harga_jual } = req.body;
    console.log("harga_jual = ", harga_jual);
    barangModel.updatejual(id, harga_jual, function (err, barang) {
      if (err) res.send(err);
      res.json("barang update harga jual");
    });
  },
  updatebarangstok: (req, res) => {
    const id = Number(req.params.id);

    const { stok } = req.body;
    console.log("stok = ", stok);
    barangModel.updatestok(id, stok, function (err, barang) {
      if (err) res.send(err);
      res.json("barang update stok");
    });
  },
  deletebarang: (req, res) => {
    const id = Number(req.params.id);
    barangModel.deletebarang(id, function (err, barang) {
      if (err) res.send(err);
      res.json("barang delete");
    });
  },
  getbarang: (req, res) => {
    barangModel.selectkolom(function (err, barang) {
      if (err) res.send(err);
      res.send(barang);
    });
  },
};

module.exports = barangController;
