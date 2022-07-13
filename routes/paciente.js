'use strict'

var express = require('express');
const { model } = require('mongoose');


var PacienteController = require('../controller/paciente');

var router = express.Router();

// RUTAS PARA CLIENTES
router.get('/pacientes', PacienteController.list);
router.get('/pacientes/:id', PacienteController.find);
router.post('/pacientes/save', PacienteController.save);

// EXPORTAR RUTA
module.exports = router;