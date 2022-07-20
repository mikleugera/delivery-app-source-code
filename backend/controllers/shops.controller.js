const shops = require("../models/shops");

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    shops.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            });
        else res.send(data);
    });
};
