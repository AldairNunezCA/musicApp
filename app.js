const express = require('express');
const cors = require('cors');
const dbConnect = require ('./src/config/mongo')
const app = express();
require('dotenv').config();


const port = process.env.PORT || 3000;


app.use(cors());

app.use("/", require("./src/routes"))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

dbConnect()
