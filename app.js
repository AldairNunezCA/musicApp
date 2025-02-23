const express = require('express');
const cors = require('cors');
const dbConnect = require ('./src/config/mongo')
const app = express();
const path = require ('path')
require('dotenv').config();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", require("./src/routes"))

app.use('/public', express.static(path.join(__dirname, 'src/storage')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);

dbConnect()
