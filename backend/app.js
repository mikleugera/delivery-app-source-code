const express = require('express');
const bodyParser = require("body-parser");
const config = require('config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("../backend/routes/shops.routes")(app);
require("../backend/routes/shopping_card.routes")(app);

const PORT = config.get('port') || 5000;

async function start(){
            app.listen(PORT, () => console.log(`App has been started, port -  ${PORT}`));
}

start();



