const db = require('./db');

const shopping_card_table = function (shopping_card) {
    this.name = shopping_card.name;
    this.email = shopping_card.email;
    this.phone = shopping_card.phone;
    this.adress = shopping_card.adress;
    this.name_product = shopping_card.name_product;
    this.count_product = shopping_card.count_product;
    this.shop_product = shopping_card.shop_product;
};

shopping_card_table.create = (shopping_card, result) => {
    db.run("insert into shopping_cart_table(name, email, phone, adress, name_product, count_product, shop_product) values (?, ?, ?, ?, ?, ?, ?)",
        [shopping_card.name, shopping_card.email, shopping_card.phone, shopping_card.adress, 
            shopping_card.name_product, shopping_card.count_product, shopping_card.shop_product], (err) =>{
       if(err) {
           console.log("error: ", err);
           result(err, null);
           return;
       }

       console.log("created row: ", {...shopping_card});
       result(null, {...shopping_card});
    });
};

module.exports = shopping_card_table;


