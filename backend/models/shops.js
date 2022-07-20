const db = require('./db');

const shops_table = function (shops_table) {
    this.name = shops_table.name;   
    this.img = shops_table.img;
    this.price = shops_table.price;
    this.shop = shops_table.shop;
};

shops_table.getAll = (result) => {
    db.all(`select * from shops_table`, (err, res) => {
       if(err){
           console.log("error: ", err);
           result(null, err);
           return;
       }
           console.log("row: ", res);
           result(err, res)
    });
};

module.exports = shops_table;


