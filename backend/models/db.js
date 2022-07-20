const sqlite3 = require('sqlite3');

// open the database
let db = new sqlite3.Database('../backend/Delivery_app_database.sqlite', sqlite3.OPEN_READWRITE, (err) => {
   if (err) {
      console.error(err.message);
   }
   console.log('Успішно підключено до бази даних.');
});

module.exports = db;
