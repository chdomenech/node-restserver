require('./config/config')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//Configuracion Global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, resp) => {
        if (err) throw err;
        console.log("Base de datos ONLINE");
    });

app.listen(process.env.PORT, () => { console.log(`Escuchango en el puerto ${process.env.PORT}`) })