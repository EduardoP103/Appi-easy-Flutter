'use strict'

const { reset } = require("nodemon");
var client = require("../database/db");
var db = client.db("pruebasbd");

var controller = {
    //LISTAR
    list: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION LISTAR");
        db.collection("pacientes").find().toArray(
            (error, dataPacientes) => {
                if (error || !dataPacientes) {
                    return res.status(404).send({
                        message: "No se encontraron los pacientes"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        pacientes: dataPacientes
                    });
                }
            }

        );
    },
    // BUSCAR
    find: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION FIND");
        console.log("id:" + req.params.id);
        db.collection("pacientes").find({ pacienteId: parseInt(req.params.id) }).toArray(
            (error, dataPacientes) => {
                if (error || !dataPacientes) {
                    return res.status(404).send({
                        message: "No se encontro el paciente"
                    });
                } else {
                    return res.status(200).send({
                        status: "success",
                        paciente: dataPacientes[0]
                    });
                }
            }
        );
    },
    // GUARDAR
    save: function (req, res) {
        console.log("----------------");
        console.log("ENTRANDO A LA FUNCION SAVE");
        console.log(req.body);
        if (req.body.pacienteId == "0") {// SI ES NUEVO
            console.log("ENTRANDO A NUEVO");
            db.collection("pacientes").count().then(
                countPacientes => {
                    var paciente = {}
                    paciente.pacienteId = countPacientes + 1;
                    paciente.nomCompleto = req.body.nomCompleto;
                    paciente.direccion = req.body.direccion;
                    paciente.dni = req.body.dni;
                    db.collection('pacientes').insertOne(paciente,
                        (error, result) => {
                            if (error) {
                                return res.status(404).send({
                                    message: "No se pudo registrar el paciente"
                                });
                            } else {
                                return res.status(200).send({
                                    message: "success",
                                    paciente: result
                                });
                            }
                        }
                    );
                }
            );
        } else {
            console.log("ENTRANDO A EDITAR");
            var paciente = {}
            paciente.pacienteId = parseInt(req.body.pacienteId);
            paciente.nombApellido = req.body.nombApellido;
            paciente.dni = req.body.dni;
            console.log(paciente);
            db.collection("pacientes").updateOne({ pacienteId: { $eq: parseInt(req.body.pacienteId) } },
                { $set: paciente },
                (error, result) => {
                    if (error) {
                        return res.status(404).send({
                            message: "No se pudo editar el paciente"
                        });
                    } else {
                        return res.status(200).send({
                            message: "success",
                            paciente: result
                        });
                    }
                }
            )


        }
    }
}

// EXPORTAR MODULO
module.exports = controller;