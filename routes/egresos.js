const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Egreso = require('../models/egreso');

// Register a Egreso
router.post('/register', (req, res, next) => {
  // Create a new user with the information that they subscribed
  let newEgreso = new Egreso({
    userId: req.body.userId,
    concepto: req.body.concepto,
    cantidad: req.body.cantidad,
    fecha: req.body.fecha
  });

  // Add the user to the db
  Egreso.addEgreso(newEgreso, (err, egreso) => {
    // Return the success state as false if it couldn't be registered
    if (err) {
      res.json({
        success: false,
        msg: 'No se pudo generar el egreso'
      });
      // Return the success state as true if it could be registered
    } else {
      res.json({
        success: true,
        msg: 'Egreso generado'
      });
    }
  });
});

// Register a Ingreso
router.post('/getAll', (req, res, next) => {
  let userId = req.body.userId;

  Egreso.getAllEgresos(userId, (err, egresos) => {
    if (err) {
      res.json({
        success: false,
        msg: 'No hay ingresos generados por ese usuario'
      });
    } else {
      res.json({
        success: true,
        data: egresos
      });
    }
  });
});

// Get sum of egresis
router.post('/getSumEgresos', (req, res, next) => {
  let userId = req.body.userId;

  Egreso.getSumEgresosByUser(userId, (err, totalEgresos) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Error no hubo un monto de este usuario'
      });
    } else {
      res.json({
        success: true,
        data: totalEgresos
      });
    }
  });
});

// Router module for make the petitions
module.exports = router;
