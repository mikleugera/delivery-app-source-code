const shopping_card = require("../models/shopping_card");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "error!"
        });
    }

    const card = new shopping_card({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        adress: req.body.adress,
        name_product: req.body.name_product,
        count_product: req.body.count_product,
        shop_product: req.body.shop_product,
    });

    shopping_card.create(card, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message
            });
        else res.send(data);
    });
};