module.exports = app => {
    const shops = require("../controllers/shops.controller");

    let router = require("express").Router();

    router.get("/findAll", shops.findAll);

    app.use('/api/shops', router);
};