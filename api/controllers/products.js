const Product = require('../models/product');
const mongoose = require('mongoose');

exports.product_get_all = (req, res, next) => {
    console.log('dfghjk');

    Product.find()
        .select('name price _id productImage')
        // .count()
        .exec()
        .then(docs => {

            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id1: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    };
                })
            }

            res.status(200).json(response);
            return res.json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err

            });
        });

};

exports.product_creat_product = (req, res, next) => {
    // console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: parseFloat(req.body.price),
        productImage: req.file.path

    });
    product
        .save()
        .then(result => {
            console.log(result);

            const data = {
                message: 'create product sucessfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    productImage: result.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            }

            res.status(200).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.product_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price_id productImage')
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http//localhost/products'

                    }
                });
            } else {
                res.status(400).json({ message: 'no valid entry found for provided Id' });
            }


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
exports.product_uodte_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;

    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                message: 'poduct updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost/products/' + Id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.product_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

