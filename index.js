'use strict'

// REQUIRES
var mongoose = require('mongoose');
var app = require('./app')

// PUERTO SERVIDOR
var port = process.env.port || 3999;

// PRUEBA DE CONEXION A LA BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Eduardo103:Tepienso103@clustercertus.u0ycl.mongodb.net/?retryWrites=true&w=majority'
                ,{ useNewUrlParser: true})
                .then(
                    ()=>{
                        console.log('La conexion a la bd es correcta VAMOS PERU RUMBO AL MUNDIAL');
                        // CREAR EL SERVIDOR
                        app.listen(port, ()=>{
                            console.log('El servidor http://localhost:3999 esta funcionando.');
                        })
                    }
                )
                .catch(error => console.log(error));