const express = require('express');
const app = express();
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`)
})