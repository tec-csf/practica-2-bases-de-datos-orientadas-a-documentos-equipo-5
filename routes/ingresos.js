const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Ingreso = require('../models/ingreso');

// Register a Ingreso
router.post('/register', (req, res, next) => {
  // Create a new user with the information that they subscribed
  let newIngreso = new Ingreso({
    userId: req.body.userId,
    concepto: req.body.concepto,
    cantidad: req.body.cantidad,
    fecha: req.body.fecha
  });

  // Add the user to the db
  Ingreso.addIngreso(newIngreso, (err, user) => {
    // Return the success state as false if it couldn't be registered
    if (err) {
      res.json({
        success: false,
        msg: 'No se pudo generar el ingreso'
      });
      // Return the success state as true if it could be registered
    } else {
      res.json({
        success: true,
        msg: 'Ingreso generado'
      });
    }
  });
});

// Register a Ingreso
router.post('/getAll', (req, res, next) => {
  let userId = req.body.userId;

  Ingreso.getAllIngresos(userId, (err, ingresos) => {
    if (err) {
      res.json({
        success: false,
        msg: 'No hay ingresos generados por ese usuario'
      });
    } else {
      res.json({
        success: true,
        data: ingresos
      });
    }
  });
});

// Get sum of ingresos
router.post('/getSumIngresos', (req, res, next) => {
  let userId = req.body.userId;

  Ingreso.getSumIngresosByUser(userId, (err, totalIngresos) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Error no hubo un monto de este usuario'
      });
    } else {
      res.json({
        success: true,
        data: totalIngresos
      });
    }
  });
});

// Router module for make the petitions
module.exports = router;
