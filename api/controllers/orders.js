const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select("product quantity _id")
        .populate('product', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost3000/orders/ ' + doc._id
                        }
                    }

                })
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });

        });
}

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });

            return order.save();
        })

        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost3000/orders/ ' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        });

}



exports.orders_get_order = (req, res, next) => {
    console.log("Result Inside", req.params.orderId)
    if (!req.params.orderId) return
    try {

        Order.findById(req.params.orderId)
            .populate('product')
            .exec()
            .then(order => {
                // console.log("Result", order)
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders'
                    }
                });
            })
            .catch(err => {
                console.log("Error", err)
                res.status(500).json({
                    error: err

                });
            });
    } catch (err) {

        console.log("herere>>", err)

    };
};

exports.orders_delete_order = (req, res, next) => {
    console.log("")
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            console.log("Result>>>", result)
            // result.remove()
            res.status(200).json({
                message: 'order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: { productId: 'Id', quantity: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log("Result>>>", result)

            res.status(500).json({
                error: err

            });
        });
};
