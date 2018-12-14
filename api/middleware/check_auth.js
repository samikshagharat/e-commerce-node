//import { verify } from '';

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {

        const token_arr = req.headers.authorization.split(" ");
        const token = token_arr[1];
        const decoded = jwt.verify(token, '123123');
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};