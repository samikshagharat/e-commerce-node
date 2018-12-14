const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://abcd:abcd1234@ds225624.mlab.com:25624/my_data')
    .then(() => {
        console.log('connected to db')
    })
    .catch(err => {
        console.log(err.message)
    })

// mongoose.Promise = global.promise;


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Headers",
        "origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH,DELETE, GET');
        return res.status(200).jspn({});

    }
    next();
});

//  route which should handle some request
app.use("/product", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    Error.status = 404;
    next(error);
})



app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app;