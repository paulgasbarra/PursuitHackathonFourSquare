const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT

app.listent("PORT", () => {
    console.log(`Server is listening on ${PORT}`);
})