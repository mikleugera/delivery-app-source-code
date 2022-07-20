module.exports = app => {
    const shopping_card = require("../controllers/shopping_card.controller");

    let router = require("express").Router();

    router.post("/create", shopping_card.create);

    app.use('/api/shopping_card', router);
};