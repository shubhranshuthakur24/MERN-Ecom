const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("loadash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.ststus(400).json({
        error: "problem with image"
      });
    }

    //destucture the fields
    const {
      name,
      description,
      price,
      category,
      stock
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !stock
    ) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let products = new Product(fields)

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.stsus(400).json({
          error: "File size too big"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path)
      product.photo.contentType = file.photo.type
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.dtatus(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
};