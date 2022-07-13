'use strict'

// REQUIRES 
var express = require('express')
var bodyParser = require('body-parser')

// USANDO LA DEPENDENCIA EXPRESS
var app = express();

// CARGA DE ARCHIVOS DE RUTA
var producto_routes = require('./routes/producto');
var cliente_routes = require('./routes/cliente');
var paciente_routes = require('./routes/paciente');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURACION DE CABECERAS Y CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type, Accept, Access-Control-Allow-Request-Method');
    req.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// REESCRIBIR RUTAS
app.use('/api/',producto_routes);
app.use('/api/',cliente_routes);
app.use('/api/',paciente_routes);

// EXPORTAR MODULO
module.exports = app;